import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import createGlobe from "cobe";
import axios from 'axios'; // Importa axios

const Modal = lazy(() => import('./Modal'));
const ClientModal = lazy(() => import('./ClientModal'));
const AnimatedTitle = lazy(() => import('./AnimatedTitle')); // Importa AnimatedTitle

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

const Globe = ({ className, config = GLOBE_CONFIG, onBackClick }) => {
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

  const [showModal, setShowModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [gpsData, setGpsData] = useState(null); // Estado para guardar los datos de GPS

  const clickSound = useRef(new Audio('/assets/click.mp3')); // Ruta al archivo de sonido
  const backClickSound = useRef(new Audio('/assets/bip2.wav')); // Ruta al archivo de sonido de vuelta

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

  const handleLinkClick = (title, content) => {
    clickSound.current.play(); // Reproducir sonido
    setModalContent({ title, content });
    setShowModal(true);
    document.body.classList.add('modal-open'); // Desactivar clic en el menú
  };

  const handleClientLinkClick = () => {
    clickSound.current.play(); // Reproducir sonido
    setShowClientModal(true);
    document.body.classList.add('modal-open'); // Desactivar clic en el menú
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove('modal-open'); // Liberar clic en el menú
  };

  const closeClientModal = () => {
    setShowClientModal(false);
    document.body.classList.remove('modal-open'); // Liberar clic en el menú
  };

  const handleBackClick = () => {
    backClickSound.current.play(); // Reproducir sonido
    onBackClick(); // Llamar a la función de vuelta
  };

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
          top: '5%', // Subir un poco más
          left: '10%', 
          zIndex: 10, 
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Ajustar opacidad
          padding: '5px', // Reducir padding
          borderRadius: '5px',
          fontSize: '8px', // Reducir tamaño de fuente
          maxWidth: '150px', // Limitar el ancho máximo
          wordWrap: 'break-word', // Ajustar el texto para que se ajuste al contenedor
        }}>
          <p>IP: {gpsData.ip}</p>
          <p>GPS: {gpsData.location}</p>
          <p>ISP: {gpsData.organization}</p>
        </div>
      )}
      <Suspense fallback={<div>Cargando...</div>}>
        <AnimatedTitle style={{ position: 'absolute', zIndex: 1 }} /> {/* Añadir AnimatedTitle */}
        <Modal show={showModal} onClose={closeModal} title={modalContent.title}>
          {modalContent.content}
        </Modal>
        <ClientModal show={showClientModal} onClose={closeClientModal} />
      </Suspense>
      <button 
        onClick={handleBackClick} 
        className="back-button"
        style={{ zIndex: 10 }} // Asegurarse de que el botón esté al frente
      >
        VOLVER AL INICIO
      </button>
      <div className="menu-buttons" style={{ zIndex: 10 }}> {/* Asegurarse de que el menú esté al frente */}
        <button onClick={() => handleLinkClick('Acerca', 
          <>
            <p>Nos dedicamos al desarrollo de sitios web minimalistas y elegantes, sencillos pero robustos y totalmente adaptables a cualquier formato, con campos y tablas dinámicas. Nuestro compromiso es crecer con usted y su emprendimiento.</p>
            <p>Para saber más, comuníquese a <a href="mailto:info@binariaos.com.py">info@binariaos.com.py</a></p>
          </>
        )}>Acerca</button>
        <button onClick={() => handleLinkClick('Servicios', 
          <>
            <p>1- Desarrollo en HTML5, PHP, CSS, Javascript, entre otros.</p>
            <p>2- Desarrollo sobre Wordpress, Drupal y otros CMS.</p>
            <p>3- Gestión de e-commerce. Base de datos y seguridad web.</p>
            <p>4- Diseño y desarrollo de interfaces.</p>
            <p>5- Front-end Development.</p>
          </>
        )}>Servicios</button>
        <button onClick={handleClientLinkClick}>Clientes</button>
        <button onClick={() => handleLinkClick('Contactos', 
          <>
            <p>Para saber más, comuníquese a <a href="mailto:info@binariaos.com.py">info@binariaos.com.py</a></p>
          </>
        )}>Contactos</button>
      </div>
    </div>
  );
};

export default Globe;
