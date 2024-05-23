import React, { useEffect, Suspense, lazy } from 'react';

// Cargar los componentes de manera diferida
const Scene = lazy(() => import('./Scene'));
const Menu = lazy(() => import('./Menu'));
const Footer = lazy(() => import('./Footer'));

const App = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 400000); // 400000 milisegundos equivalen a 400 segundos

    // Limpieza del intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Suspense fallback={<div>Cargando escena...</div>}>
        <Scene allowInteraction={true} />
      </Suspense>
      <Suspense fallback={<div>Cargando menú...</div>}>
        <Menu />
      </Suspense>
      <Suspense fallback={<div>Cargando pie de página...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
