import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

const Modal = ({ show, onClose, title, children }) => {
  const nodeRef = useRef(null);

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
    <CSSTransition
      in={show}
      timeout={300}
      classNames="fade"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div className="modal-overlay" ref={nodeRef}>
        <div className="modal">
          <div className="modal-header">
            <h2>{title}</h2>
            <span className="close" onClick={playCloseSoundAndClose}>&times;</span>
          </div>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
