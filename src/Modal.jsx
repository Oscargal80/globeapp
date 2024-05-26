import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

const Modal = ({ show, onClose, title, children }) => {
  const nodeRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(); // Cerrar modal
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('keydown', handleKeyDown, { passive: true });
    } else {
      document.removeEventListener('keydown', handleKeyDown, { passive: true });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { passive: true });
    };
  }, [show]);

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
            <span className="close" onClick={onClose}>&times;</span>
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
