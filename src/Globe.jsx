import React, { useEffect, useRef, useState, useCallback, Suspense, lazy } from "react";
import { useSpring, animated } from "react-spring";
import createGlobe from "cobe";
import axios from 'axios';
import AnimatedTitle from './AnimatedTitle'; // Importa AnimatedTitle
const Modal = lazy(() => import('./Modal'));
const ClientModal = lazy(() => import('./ClientModal'));

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-25.28646, -57.647], size: 0.15 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

const Globe = ({ className, config = GLOBE_CONFIG }) => {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  const [gpsData, setGpsData] = useState(null); // Estado para guardar los datos de GPS

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({ r: delta / 200 });
    }
  };

  const onRender = useCallback(
    (state) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r.get();
      state.width = width * 2;
      state.height = width * 2;
    },
    [pointerInteracting, phi, r]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => globe.destroy();
  }, [config, onRender]);

  useEffect(() => {
    // Hacer una solicitud para obtener los datos de ipinfo.php
    axios.get('/ipinfo.php')
      .then(response => {
        console.log('Datos de GPS obtenidos:', response.data); // Mensaje de consola para depuración
        setGpsData(response.data); // Guardar los datos en el estado
      })
      .catch(error => {
        console.error("Error al obtener los datos de GPS:", error);
      });
  }, []);

  const specialMarker = config.markers.find(
    (marker) => marker.location[0] === -25.28646 && marker.location[1] === -57.647
  );

  const style = useSpring({
    loop: { reverse: true },
    from: { opacity: 1 },
    to: { opacity: 0.3 },
    config: { duration: 1000 },
  });

  // Animación de zoom inicial
  const zoomStyle = useSpring({
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' },
    config: { duration: 1500 }, // Ajustar la duración a 1.5 segundos
  });

  return (
    <div className={`globe-container ${className}`}>
      <animated.canvas
        className="globe-canvas"
        ref={canvasRef}
        style={zoomStyle}
        onPointerDown={(e) =>
          updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
      {specialMarker && (
        <animated.div
          style={{
            ...style,
            position: 'absolute',
            top: `${50 + specialMarker.location[0]}%`,
            left: `${50 + specialMarker.location[1]}%`,
            width: `${specialMarker.size * 20}px`,
            height: `${specialMarker.size * 20}px`,
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 255, 1)', // Azul
            zIndex: 5, // Asegurarse de que tenga un z-index apropiado
          }}
        />
      )}
      {gpsData && (
        <div style={{ 
          position: 'absolute', 
          bottom: '8%', // Mover abajo
          left: '5%', // Mover a la izquierda
          zIndex: 10, 
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Ajustar opacidad
          padding: '5px', // Reducir padding
          borderRadius: '5px',
          fontSize: '8px', // Reducir tamaño de fuente
          maxWidth: '150px', // Limitar el ancho máximo
          wordWrap: 'break-word', // Ajustar el texto para que se ajuste al contenedor
        }}>
          <p><strong>IP:</strong> {gpsData.ip}</p>
          <p><strong>GPS:</strong> {gpsData.location}</p>
          <p><strong>ISP:</strong> {gpsData.organization}</p>
        </div>
      )}
      <Suspense fallback={<div>Cargando...</div>}>
        <AnimatedTitle style={{ position: 'absolute', zIndex: 1 }} /> {/* Añadir AnimatedTitle */}
      </Suspense>
    </div>
  );
};

export default Globe;
