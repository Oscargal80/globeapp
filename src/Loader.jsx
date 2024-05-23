import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setExplode(true); // Inicia la explosión
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Ajusta la velocidad de carga

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-overlay">
      <div className={`loader-line ${explode ? 'explode' : ''}`} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Loader;
