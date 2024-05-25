import React, { useEffect, useState, Suspense, lazy } from 'react';
import { gsap } from 'gsap';
import GridPattern from './GridPattern'; // Importa el componente GridPattern
import './App.css'; // Asegúrate de importar los estilos

const Scene = lazy(() => import('./Scene'));
const Globe = lazy(() => import('./Globe'));
const Footer = lazy(() => import('./Footer'));

const App = () => {
  const [currentScene, setCurrentScene] = useState('scene1');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 400000); // 400000 milisegundos equivalen a 400 segundos

    // Limpieza del intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  const handleSceneChange = () => {
    setIsTransitioning(true);
    gsap.to('.scene-container', {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setCurrentScene('globe');
        gsap.to('.scene-container', {
          opacity: 1,
          duration: 1,
          onComplete: () => setIsTransitioning(false),
        });
      },
    });
  };

  const handleBackClick = () => {
    setIsTransitioning(true);
    gsap.to('.scene-container', {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setCurrentScene('scene1');
        gsap.to('.scene-container', {
          opacity: 1,
          duration: 1,
          onComplete: () => setIsTransitioning(false),
        });
      },
    });
  };

  return (
    <div className="scene-container" style={{ height: '100vh', opacity: 1, position: 'relative' }}>
      <GridPattern /> {/* Añade el componente GridPattern como fondo */}
      <Suspense fallback={<div>Cargando escena...</div>}>
        {currentScene === 'scene1' && <Scene allowInteraction={true} onButtonClick={handleSceneChange} />}
        {currentScene === 'globe' && <Globe onBackClick={handleBackClick} />}
      </Suspense>
      <Footer style={{ position: 'absolute', bottom: 0, width: '100%' }} /> {/* Añade el Footer */}
    </div>
  );
};

export default App;
