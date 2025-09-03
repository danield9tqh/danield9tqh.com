import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { SpatialHashGrid } from './SpatialHashGrid';

function GridDots({ isLeftMouseDown, isRightMouseDown }: { isLeftMouseDown: boolean; isRightMouseDown: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [paintedIndexes] = useState<Set<number>>(() => new Set());
  const prevMousePos = useRef<THREE.Vector3 | null>(null);
  
  // Create positions and spatial grid
  const { positions, count, spatialGrid } = useMemo(() => {
    const gridWidth = 30;
    const gridHeight = 15;
    const spacing = 1;
    const points: [number, number, number][] = [];
    
    for (let x = -gridWidth; x <= gridWidth; x++) {
      for (let z = -gridHeight; z <= gridHeight; z++) {
        points.push([x * spacing, 0, z * spacing]);
      }
    }
    
    // Build spatial hash grid with cell size equal to spacing
    const grid = new SpatialHashGrid(spacing);
    grid.buildFromPositions(points);
    
    return { positions: points, count: points.length, spatialGrid: grid };
  }, []);

  // Initialize instance matrices after mount
  useFrame(() => {
    if (!meshRef.current || meshRef.current.userData.initialized) return;
    
    const matrix = new THREE.Matrix4();
    
    positions.forEach((pos, i) => {
      matrix.setPosition(pos[0], pos[1], pos[2]);
      meshRef.current!.setMatrixAt(i, matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.userData.initialized = true;
  });

  // Handle hover with raycasting and spatial grid optimization
  useFrame(({ raycaster, pointer, camera }) => {
    if (!meshRef.current) return;
    
    // Cast ray to ground plane to get mouse world position
    raycaster.setFromCamera(pointer, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const mousePoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, mousePoint);
    
    if (!mousePoint) return;
    
    const paintThreshold = 0.5; // Distance for painting (left click)
    const eraseThreshold = 1.5; // Larger distance for erasing (right click)
    const hoverThreshold = 0.5; // Distance for hover effect
    
    // Left mouse: paint dots with interpolation
    if (isLeftMouseDown) {
      // If we have a previous position, interpolate between points
      if (prevMousePos.current) {
        const distance = mousePoint.distanceTo(prevMousePos.current);
        const steps = Math.max(1, Math.ceil(distance / 0.1)); // Check every 0.1 units
        
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const checkPoint = new THREE.Vector3().lerpVectors(
            prevMousePos.current,
            mousePoint,
            t
          );
          
          const closest = spatialGrid.findClosestPoint(checkPoint.x, checkPoint.z, paintThreshold);
          if (closest && !paintedIndexes.has(closest.index)) {
            paintedIndexes.add(closest.index);
            // Scale up the painted dot
            const pos = positions[closest.index];
            const matrix = new THREE.Matrix4();
            matrix.compose(
              new THREE.Vector3(pos[0], pos[1], pos[2]),
              new THREE.Quaternion(),
              new THREE.Vector3(3, 3, 3)
            );
            meshRef.current.setMatrixAt(closest.index, matrix);
            meshRef.current.instanceMatrix.needsUpdate = true;
          }
        }
      } else {
        // First click - just paint the single dot
        const closest = spatialGrid.findClosestPoint(mousePoint.x, mousePoint.z, paintThreshold);
        if (closest && !paintedIndexes.has(closest.index)) {
          paintedIndexes.add(closest.index);
          const pos = positions[closest.index];
          const matrix = new THREE.Matrix4();
          matrix.compose(
            new THREE.Vector3(pos[0], pos[1], pos[2]),
            new THREE.Quaternion(),
            new THREE.Vector3(3, 3, 3)
          );
          meshRef.current.setMatrixAt(closest.index, matrix);
          meshRef.current.instanceMatrix.needsUpdate = true;
        }
      }
    }
    
    // Store current mouse position for next frame
    if (isLeftMouseDown || isRightMouseDown) {
      if (!prevMousePos.current) {
        prevMousePos.current = new THREE.Vector3();
      }
      prevMousePos.current.copy(mousePoint);
    } else {
      prevMousePos.current = null; // Reset when mouse is released
    }
    
    // Right mouse: erase dots (return them to normal size)
    if (isRightMouseDown) {
      const nearbyPoints = spatialGrid.findPointsWithinRadius(mousePoint.x, mousePoint.z, eraseThreshold);
      let needsUpdate = false;
      
      nearbyPoints.forEach(index => {
        if (paintedIndexes.has(index)) {
          paintedIndexes.delete(index);
          const pos = positions[index];
          const matrix = new THREE.Matrix4();
          matrix.setPosition(pos[0], pos[1], pos[2]);
          meshRef.current!.setMatrixAt(index, matrix);
          needsUpdate = true;
        }
      });
      
      if (needsUpdate) {
        meshRef.current.instanceMatrix.needsUpdate = true;
      }
    }
    
    // Hover effect
    const closest = spatialGrid.findClosestPoint(mousePoint.x, mousePoint.z, hoverThreshold);
    const newHoveredIndex = closest ? closest.index : null;
    
    if (newHoveredIndex !== hoveredIndex) {
      const matrix = new THREE.Matrix4();
      
      // Reset previous hover (only if not painted)
      if (hoveredIndex !== null && !paintedIndexes.has(hoveredIndex)) {
        const pos = positions[hoveredIndex];
        matrix.setPosition(pos[0], pos[1], pos[2]);
        meshRef.current.setMatrixAt(hoveredIndex, matrix);
      }
      
      // Set new hover with scale (only if not already painted)
      if (newHoveredIndex !== null && !paintedIndexes.has(newHoveredIndex)) {
        const pos = positions[newHoveredIndex];
        const scale = 3; // Scale up when hovered
        matrix.compose(
          new THREE.Vector3(pos[0], pos[1], pos[2]),
          new THREE.Quaternion(),
          new THREE.Vector3(scale, scale, scale)
        );
        meshRef.current.setMatrixAt(newHoveredIndex, matrix);
      }
      
      meshRef.current.instanceMatrix.needsUpdate = true;
      setHoveredIndex(newHoveredIndex);
    }
  });

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[undefined, undefined, count]}
    >
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshBasicMaterial color="#4169e1" />
    </instancedMesh>
  );
}

export function DotGrid() {
  const [isLeftMouseDown, setIsLeftMouseDown] = useState(false);
  const [isRightMouseDown, setIsRightMouseDown] = useState(false);
  
  return (
    <div 
      style={{ position: 'fixed', inset: 0, background: '#f5f5f0' }}
      onMouseDown={(e) => {
        if (e.button === 0) setIsLeftMouseDown(true);
        if (e.button === 2) setIsRightMouseDown(true);
      }}
      onMouseUp={(e) => {
        if (e.button === 0) setIsLeftMouseDown(false);
        if (e.button === 2) setIsRightMouseDown(false);
      }}
      onMouseLeave={() => {
        setIsLeftMouseDown(false);
        setIsRightMouseDown(false);
      }}
      onMouseEnter={(e) => {
        // e.buttons is a bitmask: 1 = left, 2 = right, 4 = middle
        if (e.buttons & 1) setIsLeftMouseDown(true);   // Left button is pressed
        if (e.buttons & 2) setIsRightMouseDown(true);  // Right button is pressed
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Canvas orthographic camera={{ zoom: 50, position: [0, 100, 0], near: 1, far: 1000 }}>
        <GridDots isLeftMouseDown={isLeftMouseDown} isRightMouseDown={isRightMouseDown} />
      </Canvas>
    </div>
  );
}
