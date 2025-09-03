import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';

function GridDots() {
  const positions = useMemo(() => {
    const gridSize = 100;
    const spacing = 1;
    const points: number[] = [];
    
    for (let x = -gridSize; x <= gridSize; x++) {
      for (let z = -gridSize; z <= gridSize; z++) {
        points.push(x * spacing, 0, z * spacing);
      }
    }
    
    return new Float32Array(points);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#4169e1" size={2} sizeAttenuation={false} />
    </points>
  );
}

export function DotGrid() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#f5f5f0' }}>
      <Canvas orthographic camera={{ zoom: 50, position: [0, 100, 0], near: 1, far: 1000 }}>
        <GridDots />
      </Canvas>
    </div>
  );
}
