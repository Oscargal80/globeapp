import React from 'react';
import { SpotLight } from '@react-three/drei';

const Lights = () => {
  return (
    <>
      <spotLight
        color={0x0000ff} // Azul
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <spotLight
        color={0x0000ff} // Azul
        position={[-10, 10, -10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <spotLight
        color={0x0000ff} // Azul
        position={[10, -10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <spotLight
        color={0x0000ff} // Azul
        position={[-10, -10, -10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
      />
    </>
  );
};

export default Lights;
