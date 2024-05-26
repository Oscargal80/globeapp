import React, { lazy, Suspense, useState } from 'react';
import './Menu.css'; // Importa los estilos del menú

const Modal = lazy(() => import('./Modal'));
const ClientModal = lazy(() => import('./ClientModal'));

const Menu = () => {
  const [showModal, setShowModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú de hamburguesa

  const handleLinkClick = (title, content) => {
    setModalContent({ title, content });
    setShowModal(true);
    document.body.classList.add('modal-open'); // Desactivar clic en el menú
    setIsMenuOpen(false); // Cerrar menú hamburguesa al hacer clic
  };

  const handleClientLinkClick = () => {
    setShowClientModal(true);
    document.body.classList.add('modal-open'); // Desactivar clic en el menú
    setIsMenuOpen(false); // Cerrar menú hamburguesa al hacer clic
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove('modal-open'); // Liberar clic en el menú
  };

  const closeClientModal = () => {
    setShowClientModal(false);
    document.body.classList.remove('modal-open'); // Liberar clic en el menú
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alternar el estado del menú
  };

  return (
    <div className="menu-header">
      <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`menu-buttons ${isMenuOpen ? 'open' : ''}`}>
        <button onClick={() => handleLinkClick('Acerca', 
          <>
            <p>Nos dedicamos al desarrollo de sitios web minimalistas y elegantes, que combinan simplicidad con robustez. Nuestros diseños son completamente adaptables a cualquier formato, garantizando una experiencia de usuario óptima en dispositivos móviles, tablets y computadoras de escritorio.</p>
            <p>Nuestro compromiso es crecer con usted y su emprendimiento.</p>
            <p>Para saber más, comuníquese a <a href="mailto:info@binariaos.com.py">info@binariaos.com.py</a></p>
          </>
        )}>Acerca</button>
        <button onClick={() => handleLinkClick('Servicios', 
          <>
            <p>1- Desarrollo en HTML. CSS, JS, React y más.</p>
            <p>2- Desarrollo sobre Wordpress, Drupal y otros CMS.</p>
            <p>3- Gestión de e-commerce. Base de datos, SEO.</p>
            <p>4- Desarrollo de interfaces.</p>
            <p>5- Front-end Development.</p>
          </>
        )}>Servicios</button>
        <button onClick={handleClientLinkClick}>Clientes</button>
        <button onClick={() => handleLinkClick('Contactos', 
          <>
            <p>Para saber más, comuníquese a <a href="mailto:info@binariaos.com.py">info@binariaos.com.py</a></p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.221088316759!2d-57.65619892483307!3d-25.296774977646983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945d0805bc54295b%3A0xdf22b5b72a06a09d!2sBinariaOS%20Web%20Design!5e0!3m2!1ses-419!2spy!4v1716693294336!5m2!1ses-419!2spy"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </>
        )}>Contactos</button>
      </div>
      <Suspense fallback={<div>Cargando...</div>}>
        <Modal show={showModal} onClose={closeModal} title={modalContent.title}>
          {modalContent.content}
        </Modal>
        <ClientModal show={showClientModal} onClose={closeClientModal} />
      </Suspense>
    </div>
  );
};

export default Menu;
