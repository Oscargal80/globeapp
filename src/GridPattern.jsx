import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import './GridPattern.css'; // Importa el archivo CSS para GridPattern

const cn = (...classes) => classes.filter(Boolean).join(' ');

export function GridPattern({
  width = 5, // Reducido para círculos más pequeños
  height = 5, // Reducido para círculos más pequeños
  numCircles = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}) {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [circles, setCircles] = useState(() => generateCircles(numCircles));

  function getPos() {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ];
  }

  function generateCircles(count) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
    }));
  }

  const updateCirclePosition = (id) => {
    setCircles((currentCircles) =>
      currentCircles.map((circle) =>
        circle.id === id
          ? {
              ...circle,
              pos: getPos(),
            }
          : circle,
      ),
    );
  };

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setCircles(generateCircles(numCircles));
    }
  }, [dimensions, numCircles]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className,
      )}
      {...props}
    >
      <svg className="overflow-visible">
        {circles.map(({ pos: [x, y], id }, index) => (
          <motion.circle
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: "reverse",
            }}
            onAnimationComplete={() => updateCirclePosition(id)}
            key={`${x}-${y}-${index}`}
            r={Math.min(width, height) / 2 - 1}
            cx={x * width + width / 2}
            cy={y * height + height / 2}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}

export default GridPattern;
