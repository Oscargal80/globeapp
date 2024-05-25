import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

const SceneContent = ({ allowInteraction, onSphereClick, zoomIn }) => {
  const { camera, scene, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const isZoomedIn = useRef(false);
  const sphereRef = useRef();
  const linesRef = useRef([]);
  
  useEffect(() => {
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;

    camera.position.z = 1000;

    // Configurar niebla para la escena
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    // Crear partículas
    const PI2 = Math.PI * 2;
    const material = new THREE.SpriteMaterial({
      color: 0x073763,
      map: new THREE.CanvasTexture(generateSprite()),
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < 1000; i++) {
      const particle = new THREE.Sprite(material);
      particle.position.x = Math.random() * 2 - 1;
      particle.position.y = Math.random() * 2 - 1;
      particle.position.z = Math.random() * 2 - 1;
      particle.position.normalize();
      particle.position.multiplyScalar(Math.random() * 10 + 450);
      particle.scale.multiplyScalar(2);
      scene.add(particle);
    }

    // Crear líneas
    const initialColor = new THREE.Color(0x000000); // Negro
    for (let i = 0; i < 300; i++) {
      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      const vertex = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      );
      vertex.normalize();
      vertex.multiplyScalar(450);
      vertices.push(vertex.x, vertex.y, vertex.z);

      const vertex2 = vertex.clone();
      vertex2.multiplyScalar(Math.random() * 0.3 + 1);
      vertices.push(vertex2.x, vertex2.y, vertex2.z);

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      const material = new THREE.LineBasicMaterial({ color: initialColor, opacity: 1 });
      const line = new THREE.Line(geometry, material);
      scene.add(line);

      linesRef.current.push(material); // Guardar la referencia al material de la línea para animarlo
    }

    // Animar colores de las líneas
    animateLines(linesRef.current);

    // Crear una esfera como armazón (wireframe) con color gris claro
    const sphereGeometry = new THREE.SphereGeometry(30, 16, 16); // Reducir la cantidad de segmentos para espacios más grandes
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000, // Negro
      wireframe: true,
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereRef.current = sphere;
    scene.add(sphere);

    // Agregar luces adicionales
    const pointLight1 = new THREE.PointLight(0xffffff, 5, 100); // Aumentar la intensidad de la luz
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 5, 100); // Aumentar la intensidad de la luz
    pointLight2.position.set(-20, -20, -20);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0x404040, 3); // Luz ambiental más intensa
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 50, 50);
    scene.add(directionalLight);

    // Manejar el cambio de tamaño de la ventana
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    // Manejar el movimiento del mouse
    const onDocumentMouseMove = (event) => {
      if (allowInteraction) {
        mouse.current.x = event.clientX - window.innerWidth / 2;
        mouse.current.y = event.clientY - window.innerHeight / 2;
      }
    };

    // Manejar el clic del mouse para alternar el zoom
    const toggleZoom = (event) => {
      const raycaster = new THREE.Raycaster();
      const mousePosition = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(mousePosition, camera);
      const intersects = raycaster.intersectObject(sphereRef.current);

      if (intersects.length > 0) {
        gsap.to(camera.position, {
          z: 500,
          duration: 1,
          onComplete: onSphereClick,
        });
      } else if (allowInteraction) {
        const targetZoom = isZoomedIn.current ? 1000 : 200;
        gsap.to(camera.position, {
          duration: 1,
          z: targetZoom,
          ease: 'power2.inOut',
        });
        isZoomedIn.current = !isZoomedIn.current;
      }
    };

    // Agregar event listeners
    window.addEventListener('resize', onWindowResize, { passive: true });
    document.addEventListener('mousemove', onDocumentMouseMove, { passive: true });
    document.addEventListener('click', toggleZoom, { passive: true });

    return () => {
      window.removeEventListener('resize', onWindowResize, { passive: true });
      document.removeEventListener('mousemove', onDocumentMouseMove, { passive: true });
      document.removeEventListener('click', toggleZoom, { passive: true });
    };
  }, [camera, scene, gl, allowInteraction, onSphereClick]);

  const generateSprite = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(8, 8, 8, 0, Math.PI * 2, false);
    context.fillStyle = '#073763';
    context.fill();
    return canvas;
  };

  const animateLines = (lines) => {
    lines.forEach((material, index) => {
      gsap.to(material.color, {
        r: 1, // Blanco
        g: 1, // Blanco
        b: 1, // Blanco
        duration: 0.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.01,
      });
      gsap.to(material.color, {
        r: 0.53, // Azul
        g: 0.53, // Azul
        b: 1, // Azul
        duration: 0.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.25 + index * 0.01,
      });
    });
  };

  useFrame(() => {
    if (!allowInteraction) {
      return; // Detener la animación si no se permite la interacción
    }

    camera.position.x += (mouse.current.x - camera.position.x) * 0.05;
    camera.position.y += (-mouse.current.y + 200 - camera.position.y) * 0.05;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Rotar la esfera lentamente de derecha a izquierda
    if (sphereRef.current) {
      sphereRef.current.rotation.y -= 0.005; // Ajusta la velocidad de rotación aquí
    }

    if (zoomIn) {
      camera.position.z -= 5;
      if (camera.position.z <= 500) {
        camera.position.z = 500;
        onSphereClick();
      }
    }
  });

  return null;
};

export default SceneContent;
