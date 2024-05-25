import React, { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './App.css'; // Asegúrate de importar los estilos

const SceneContent = lazy(() => import('./SceneContent'));
const AnimatedTitle = lazy(() => import('./AnimatedTitle'));
const Footer = lazy(() => import('./Footer')); // Importa el componente Footer de manera diferida

const Scene = ({ allowInteraction, onButtonClick }) => {
  const [loading, setLoading] = useState(false);
  const clickSound = useMemo(() => new Audio('/assets/bip.wav'), []); // Precarga del sonido

  useEffect(() => {
    // Precargar el sonido
    clickSound.load();

    return () => {
      // Limpiar el recurso cuando el componente se desmonte
      clickSound.pause();
      clickSound.src = '';
    };
  }, [clickSound]);

  const handleClick = () => {
    clickSound.currentTime = 0; // Reiniciar el sonido
    clickSound.play(); // Reproducir sonido
    onButtonClick(); // Llamar a la función onButtonClick
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <Suspense fallback={null}>
          <SceneContent allowInteraction={allowInteraction} setLoading={setLoading} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
        </Suspense>
      </Canvas>
      <Suspense fallback={null}>
        <AnimatedTitle />
      </Suspense>
      <button 
        onClick={handleClick} 
        className="button-enter"
      >
        INICIAR VIAJE
      </button>
      <Suspense fallback={null}>
        <Footer style={{ position: 'absolute', bottom: 0, width: '100%' }} /> {/* Añade el Footer */}
      </Suspense>
    </div>
  );
};

export default Scene;
