import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function GridDots({ isMouseDown }: { isMouseDown: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [greenIndexes] = useState<Set<number>>(() => new Set());
  
  // Create positions and matrices for instances
  const { positions, count } = useMemo(() => {
    const gridWidth = 30;
    const gridHeight = 15;
    const spacing = 1;
    const points: [number, number, number][] = [];
    
    for (let x = -gridWidth; x <= gridWidth; x++) {
      for (let z = -gridHeight; z <= gridHeight; z++) {
        points.push([x * spacing, 0, z * spacing]);
      }
    }
    
    return { positions: points, count: points.length };
  }, []);

  // Initialize instance matrices and colors after mount
  useFrame(() => {
    if (!meshRef.current || meshRef.current.userData.initialized) return;
    
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color('#4169e1');
    
    positions.forEach((pos, i) => {
      matrix.setPosition(pos[0], pos[1], pos[2]);
      meshRef.current!.setMatrixAt(i, matrix);
      meshRef.current!.setColorAt(i, color);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
    meshRef.current.userData.initialized = true;
  });

  // Handle hover with raycasting and distance threshold
  useFrame(({ raycaster, pointer, camera }) => {
    if (!meshRef.current) return;
    
    // Cast ray to ground plane to get mouse world position
    raycaster.setFromCamera(pointer, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const mousePoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, mousePoint);
    
    if (!mousePoint) return;
    
    // Find closest dot within threshold
    const hoverThreshold = 0.5; // Distance threshold for hover
    let closestIndex: number | null = null;
    let closestDistance = hoverThreshold;
    
    positions.forEach((pos, i) => {
      const distance = Math.sqrt(
        Math.pow(mousePoint.x - pos[0], 2) + 
        Math.pow(mousePoint.z - pos[2], 2)
      );
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });
    
    // If mouse is down and hovering, make it green
    if (isMouseDown && closestIndex !== null && !greenIndexes.has(closestIndex)) {
      greenIndexes.add(closestIndex);
      meshRef.current.setColorAt(closestIndex, new THREE.Color('#00ff00'));
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
    
    if (closestIndex !== hoveredIndex) {
      const matrix = new THREE.Matrix4();
      
      // Reset previous hover
      if (hoveredIndex !== null && !greenIndexes.has(hoveredIndex)) {
        const pos = positions[hoveredIndex];
        matrix.setPosition(pos[0], pos[1], pos[2]);
        meshRef.current.setMatrixAt(hoveredIndex, matrix);
      }
      
      // Set new hover with scale
      if (closestIndex !== null) {
        const pos = positions[closestIndex];
        const scale = greenIndexes.has(closestIndex) ? 3 : 3; // Keep green ones scaled
        matrix.compose(
          new THREE.Vector3(pos[0], pos[1], pos[2]),
          new THREE.Quaternion(),
          new THREE.Vector3(scale, scale, scale)
        );
        meshRef.current.setMatrixAt(closestIndex, matrix);
      }
      
      meshRef.current.instanceMatrix.needsUpdate = true;
      setHoveredIndex(closestIndex);
    }
  });

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[undefined, undefined, count]}
    >
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshBasicMaterial vertexColors />
    </instancedMesh>
  );
}

export function DotGrid() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  return (
    <div 
      style={{ position: 'fixed', inset: 0, background: '#f5f5f0' }}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      <Canvas orthographic camera={{ zoom: 50, position: [0, 100, 0], near: 1, far: 1000 }}>
        <GridDots isMouseDown={isMouseDown} />
      </Canvas>
    </div>
  );
}
