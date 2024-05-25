import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './ClientModal.css';

const ClientModal = ({ show, onClose }) => {
  const closeSound = new Audio('/assets/close.mp3'); // Ruta al archivo de sonido

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        playCloseSoundAndClose();
      }
    };

    if (show) {
      document.addEventListener('keydown', handleKeyDown, { passive: true });
    } else {
      document.removeEventListener('keydown', handleKeyDown, { passive: true });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { passive: true });
    };
  }, [show]);

  const playCloseSoundAndClose = () => {
    closeSound.play(); // Reproducir sonido
    onClose(); // Cerrar modal
  };

  return (
    <CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
      <div className="client-modal-overlay">
        <div className="client-modal">
          <div className="client-modal-header">
            <h2>Clientes y Trabajos</h2>
            <span className="client-modal-close" onClick={playCloseSoundAndClose}>&times;</span>
          </div>
          <div className="client-modal-content">
            <div className="client-preview">
              <h4><a href="https://khairi.com.py" target="_blank" rel="noopener noreferrer">Khairi - Tuteur</a></h4>
              <iframe src="https://khairi.com.py" title="Khairi - Tuteur" />
            </div>
            <div className="client-preview">
              <h4><a href="https://cms.binariaos.com.py" target="_blank" rel="noopener noreferrer">CMS Binariaos</a></h4>
              <iframe src="https://cms.binariaos.com.py" title="CMS Binariaos" />
            </div>
            <div className="client-preview">
              <h4><a href="https://expo.camaradeempresarioscde.org.py" target="_blank" rel="noopener noreferrer">Expo Construir Paraguay</a></h4>
              <iframe src="https://expo.camaradeempresarioscde.org.py" title="Expo Construir Paraguay" />
            </div>
            <div className="client-preview">
              <h4><a href="https://shop.binariaos.com.py" target="_blank" rel="noopener noreferrer">Shop Binariaos</a></h4>
              <iframe src="https://shop.binariaos.com.py" title="Shop Binariaos" />
            </div>
            <div className="client-preview">
              <h4><a href="https://binaria-hugo.netlify.app" target="_blank" rel="noopener noreferrer">Binaria Hugo</a></h4>
              <iframe src="https://binaria-hugo.netlify.app" title="Binaria Hugo" />
            </div>
            <div className="client-preview">
              <h4><a href="https://ai.binariaos.com.py" target="_blank" rel="noopener noreferrer">AI Binariaos</a></h4>
              <iframe src="https://ai.binariaos.com.py" title="AI Binariaos" />
            </div>
            <div className="client-preview">
              <h4><a href="https://binariaos.com.py/1980" target="_blank" rel="noopener noreferrer">Binariaos 1980</a></h4>
              <iframe src="https://binariaos.com.py/1980" title="Binariaos 1980" />
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ClientModal;
