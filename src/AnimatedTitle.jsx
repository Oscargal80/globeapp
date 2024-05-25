import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const AnimatedTitle = () => {
  const [isFaded, setIsFaded] = useState(false);

  useEffect(() => {
    const handleSceneClick = () => {
      if (isFaded) {
        // Rearmar el texto con fade in
        gsap.to("#text, #subtitle", { opacity: 1, duration: 1 });
      } else {
        // Desarmar el texto con fade out
        gsap.to("#text, #subtitle", { opacity: 0, duration: 1 });
      }
      setIsFaded(!isFaded);
    };

    window.addEventListener('click', handleSceneClick, { passive: true });

    return () => {
      window.removeEventListener('click', handleSceneClick, { passive: true });
    };
  }, [isFaded]);

  return (
    <div className="animated-title-container">
      <svg className="svg-title" version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="600px" height="100px" viewBox="0 0 600 100">
        <style type="text/css">
          {`
            text {
              filter: url(#filter);
              fill: black;
              font-family: 'JetBrains Mono', monospace;
              font-size: 100px;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            @media (max-width: 600px) {
              .svg-title {
                display: none;
              }
              .normal-text-title {
                display: block;
                font-size: 24px;
                margin-top: 20px;
                font-family: 'JetBrains Mono', monospace;
                color: black; /* Asegúrate de que el color sea adecuado para pantallas pequeñas */
              }
            }

            @media (min-width: 601px) {
              .normal-text-title {
                display: none; /* Ocultar el texto en pantallas grandes */
              }
            }
          `}
        </style>
        <defs>
          <filter id="filter">
            <feFlood floodColor="black" result="white" />
            <feFlood floodColor="red" result="flood1" />
            <feFlood floodColor="limegreen" result="flood2" />
            <feOffset in="SourceGraphic" dx="3" dy="0" result="off1a" />
            <feOffset in="SourceGraphic" dx="2" dy="0" result="off1b" />
            <feOffset in="SourceGraphic" dx="-3" dy="0" result="off2a" />
            <feOffset in="SourceGraphic" dx="-2" dy="0" result="off2b" />
            <feComposite in="flood1" in2="off1a" operator="in" result="comp1" />
            <feComposite in="flood2" in2="off2a" operator="in" result="comp2" />
            <feMerge x="0" width="100%" result="merge1">
              <feMergeNode in="black" />
              <feMergeNode in="comp1" />
              <feMergeNode in="off1b" />
              <animate 
                attributeName="y" 
                id="y"
                dur="4s"
                values="104px; 104px; 30px; 105px; 30px; 2px; 2px; 50px; 40px; 105px; 105px; 20px; 60px; 40px; 104px; 40px; 70px; 10px; 30px; 104px; 102px"
                keyTimes="0; 0.362; 0.368; 0.421; 0.440; 0.477; 0.518; 0.564; 0.593; 0.613; 0.644; 0.693; 0.721; 0.736; 0.772; 0.818; 0.844; 0.894; 0.925; 0.939; 1"
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="height" 
                id="h" 
                dur="4s"
                values="10px; 0px; 10px; 30px; 50px; 0px; 10px; 0px; 0px; 0px; 10px; 50px; 40px; 0px; 0px; 0px; 40px; 30px; 10px; 0px; 50px"
                keyTimes="0; 0.362; 0.368; 0.421; 0.440; 0.477; 0.518; 0.564; 0.593; 0.613; 0.644; 0.693; 0.721; 0.736; 0.772; 0.818; 0.844; 0.894; 0.925; 0.939; 1"
                repeatCount="indefinite" 
              />
            </feMerge>
            <feMerge x="0" width="100%" y="60px" height="65px" result="merge2">
              <feMergeNode in="black" />
              <feMergeNode in="comp2" />
              <feMergeNode in="off2b" />
              <animate 
                attributeName="y" 
                id="y"
                dur="4s"
                values="103px; 104px; 69px; 53px; 42px; 104px; 78px; 89px; 96px; 100px; 67px; 50px; 96px; 66px; 88px; 42px; 13px; 100px; 100px; 104px;" 
                keyTimes="0; 0.055; 0.100; 0.125; 0.159; 0.182; 0.202; 0.236; 0.268; 0.326; 0.357; 0.400; 0.408; 0.461; 0.493; 0.513; 0.548; 0.577; 0.613; 1"
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="height" 
                id="h"
                dur="4s"
                values="0px; 0px; 0px; 16px; 16px; 12px; 12px; 0px; 0px; 5px; 10px; 22px; 33px; 11px; 0px; 0px; 10px"
                keyTimes="0; 0.055; 0.100; 0.125; 0.159; 0.182; 0.202; 0.236; 0.268; 0.326; 0.357; 0.400; 0.408; 0.461; 0.493; 0.513;  1"
                repeatCount="indefinite" 
              />
            </feMerge>
            <feMerge>
              <feMergeNode in="SourceGraphic" />  
              <feMergeNode in="merge1" /> 
              <feMergeNode in="merge2" />
            </feMerge>
          </filter>
        </defs>
        <g>
          <text id="text" x="35" y="100">binariaOS</text>
        </g>
      </svg>
      <div className="normal-text-title">
        binariaOS
      </div>
      <div id="subtitle" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '24px', marginTop: '20px' }}>
        Desarrollo Web
      </div>
    </div>
  );
};

export default AnimatedTitle;
