import React, { useEffect, Suspense, lazy, useState } from 'react';
import { gsap } from 'gsap';
import GridPattern from './GridPattern'; // Importa el componente GridPattern
import './App.css'; // Asegúrate de importar los estilos

const Globe = lazy(() => import('./Globe'));
const Footer = lazy(() => import('./Footer'));
const Menu = lazy(() => import('./Menu'));

const App = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 400000); // 400000 milisegundos equivalen a 400 segundos

    // Limpieza del intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scene-container" style={{ height: '100vh', opacity: 1, position: 'relative' }}>
      <GridPattern /> {/* Añade el componente GridPattern como fondo */}
      <Suspense fallback={<div>Cargando escena...</div>}>
        <Menu /> {/* Añade el Menu en el header */}
        <Globe /> {/* Muestra Globe directamente */}
      </Suspense>
      <Footer style={{ position: 'absolute', bottom: 0, width: '100%' }} /> {/* Añade el Footer */}
    </div>
  );
};

export default App;
