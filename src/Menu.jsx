import React, { useState, useEffect } from 'react';
import './App.css'; // Importa el archivo CSS global
import LinkButton from './LinkButton';
import Modal from './Modal';
import ClientModal from './ClientModal';
import useSound from 'use-sound';

const Menu = ({ onModalOpen, onModalClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar el menú colapsado

  const [playClickSound] = useSound('/assets/click.mp3'); // Ruta al archivo de sonido

  const handleLinkClick = (title, content) => {
    playClickSound(); // Reproducir sonido
    setModalContent({ title, content });
    setShowModal(true);
    document.body.classList.add('modal-open'); // Desactivar clic en el menú
    if (onModalOpen) onModalOpen();
  };

  const handleClientLinkClick = () => {
    playClickSound(); // Reproducir sonido
    setShowClientModal(true);
    document.body.classList.add('modal-open'); // Desactivar clic en el menú
    if (onModalOpen) onModalOpen();
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove('modal-open'); // Liberar clic en el menú
    if (onModalClose) onModalClose();
  };

  const closeClientModal = () => {
    setShowClientModal(false);
    document.body.classList.remove('modal-open'); // Liberar clic en el menú
    if (onModalClose) onModalClose();
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simular 2 segundos de carga
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className="menu-button" onClick={toggleMenu}>M</div>
      <nav className={`menu ${menuOpen ? 'open' : ''}`}>
        <LinkButton href="#about" onClick={() => handleLinkClick('Acerca', 
          <>
            <p>Nos dedicamos al desarrollo de sitios web minimalistas y elegantes, sencillos pero robustos y totalmente adaptables a cualquier formato, con campos y tablas dinámicas. Nuestro compromiso es crecer con usted y su emprendimiento. <p>Para saber más, comuníquese a <a href="mailto:info@binariaos.com.py">info@binariaos.com.py</a></p></p>
          </>
        )}>Acerca</LinkButton>
        <LinkButton href="#services" onClick={() => handleLinkClick('Servicios', 
          <>
            <p>1- Desarrollo en HTML5, PHP, CSS, Javascript, entre otros.</p>
            <p>2- Desarrollo sobre Wordpress, Drupal y otros CMS.</p>
            <p>3- Gestión de e-commerce. Base de datos y seguridad web.</p>
            <p>4- Diseño y desarrollo de interfaces.</p>
            <p>5- Front-end Development.</p>
          </>
        )}>Servicios</LinkButton>
        <LinkButton href="#clients" onClick={handleClientLinkClick}>Clientes</LinkButton>
        <LinkButton href="#contact" onClick={() => handleLinkClick('Contactos', 
          <>
            <p>Para saber más, comuníquese a <a href="mailto:info@binariaos.com.py">info@binariaos.com.py</a></p>
          </>
        )}>Contactos</LinkButton>
      </nav>
      <Modal show={showModal} onClose={closeModal} title={modalContent.title}>
        {modalContent.content}
      </Modal>
      <ClientModal show={showClientModal} onClose={closeClientModal} />
    </div>
  );
};

export default Menu;
