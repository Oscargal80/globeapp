import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, useBox, usePlane } from '@react-three/cannon';

const Box = () => {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0] }));
  return (
    <mesh ref={ref} position={[0, 5, 0]}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="orange" />
    </mesh>
  );
};

const Plane = () => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" color="lightblue" />
    </mesh>
  );
};

const PhysicsScene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Physics>
        <Box />
        <Plane />
      </Physics>
      <OrbitControls />
    </Canvas>
  );
};

export default PhysicsScene;
