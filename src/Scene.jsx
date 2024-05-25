import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SceneContent from './SceneContent';
import AnimatedTitle from './AnimatedTitle';
import Footer from './Footer'; // Importa el componente Footer
import './App.css'; // Asegúrate de importar los estilos

const Scene = ({ allowInteraction, onButtonClick }) => {
  const [loading, setLoading] = useState(false);
  const [clickSound] = useState(new Audio('/assets/bip.wav')); // Precarga del sonido

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
        <SceneContent allowInteraction={allowInteraction} setLoading={setLoading} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
      </Canvas>
      <AnimatedTitle />
      <button 
        onClick={handleClick} 
        className="button-enter"
      >
        INICIAR VIAJE
      </button>
      <Footer style={{ position: 'absolute', bottom: 0, width: '100%' }} /> {/* Añade el Footer */}
    </div>
  );
};

export default Scene;
