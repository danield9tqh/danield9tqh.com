import { Canvas } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import { useMemo, useState } from 'react';

function Dot({ position }: { position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group position={position}>
      {/* Invisible larger hit area */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      {/* Visible dot instance */}
      <Instance 
        scale={hovered ? 3 : .8} 
        color={hovered ? '#ff4444' : '#4169e1'}
      />
    </group>
  );
}

function GridDots() {
  const positions = useMemo(() => {
    const gridWidth = 50;  // 100 wide total (-50 to 50)
    const gridHeight = 25; // 50 tall total (-25 to 25)
    const spacing = 1;
    const points: [number, number, number][] = [];
    
    for (let x = -gridWidth; x <= gridWidth; x++) {
      for (let z = -gridHeight; z <= gridHeight; z++) {
        points.push([x * spacing, 0, z * spacing]);
      }
    }
    
    return points;
  }, []);

  return (
    <Instances limit={positions.length}>
      <sphereGeometry args={[0.03, 64, 64]} />
      <meshBasicMaterial color="#4169e1" />
      
      {positions.map((pos, i) => (
        <Dot key={i} position={pos} />
      ))}
    </Instances>
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
