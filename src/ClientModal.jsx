import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

const ClientModal = ({ show, onClose }) => {
  const closeSound = new Audio('/assets/close.mp3'); // Ruta al archivo de sonido

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        playCloseSoundAndClose();
      }
    };

    if (show) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [show]);

  const playCloseSoundAndClose = () => {
    closeSound.play(); // Reproducir sonido
    onClose(); // Cerrar modal
  };

  return (
    <CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Nuestros Clientes</h2>
            <span className="close" onClick={playCloseSoundAndClose}>&times;</span>
          </div>
          <div className="modal-content">
            <div className="client-preview">
              <h4><a href="https://khairi.com.py" target="_blank" rel="noopener noreferrer">Khairi - Tuteur</a></h4>
              <iframe src="https://khairi.com.py" title="Khairi - Tuteur" />
            </div>
            <div className="client-preview">
              <h4><a href="https://expo.camaradeempresarioscde.org.py" target="_blank" rel="noopener noreferrer">Expo Construir Paraguay</a></h4>
              <iframe src="https://expo.camaradeempresarioscde.org.py" title="Expo Construir Paraguay" />
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ClientModal;
