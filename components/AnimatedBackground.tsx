import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '@/styles/animations.module.css';

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children }) => {
  // Refs for animation elements
  const particlesRef = useRef<HTMLDivElement>(null);
  const lightRaysRef = useRef<HTMLDivElement>(null);
  const sacredGeometryRef = useRef<HTMLDivElement>(null);
  const sacredGeometryBgRef = useRef<HTMLDivElement>(null);

  // Animation functions
  const createParticles = () => {
    const container = particlesRef.current;
    if (!container) return;

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      
      const opacity = Math.random() * 0.5 + 0.2;
      particle.style.opacity = opacity.toString();
      
      container.appendChild(particle);

      gsap.to(particle, {
        y: `-=${Math.random() * 100 + 50}`,
        x: `+=${(Math.random() - 0.5) * 50}`,
        opacity: 0,
        duration: Math.random() * 10 + 10,
        ease: "power1.out",
        repeat: -1,
        delay: Math.random() * 5
      });
    }
  };

  const createBlossoms = () => {
    const container = particlesRef.current;
    if (!container) return;

    const blossomCount = 30;
    for (let i = 0; i < blossomCount; i++) {
      const blossom = document.createElement('div');
      blossom.classList.add('blossom');
      
      const size = Math.random() * 15 + 5;
      blossom.style.width = `${size}px`;
      blossom.style.height = `${size}px`;
      
      const x = Math.random() * 100;
      const y = Math.random() * 100 + 100;
      blossom.style.left = `${x}%`;
      blossom.style.top = `${y}%`;
      
      const blueHue = Math.floor(Math.random() * 40 + 190);
      blossom.style.backgroundColor = `hsl(${blueHue}, 80%, 70%)`;
      
      container.appendChild(blossom);

      gsap.to(blossom, {
        y: `-=${Math.random() * 200 + 100}`,
        x: `+=${(Math.random() - 0.5) * 100}`,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: Math.random() * 15 + 15,
        ease: "power1.out",
        repeat: -1,
        delay: Math.random() * 10
      });
    }
  };

  const createLightRays = () => {
    const container = lightRaysRef.current;
    if (!container) return;

    const rayCount = 8;
    for (let i = 0; i < rayCount; i++) {
      const ray = document.createElement('div');
      ray.classList.add('light-ray');
      
      const angle = (i / rayCount) * 360;
      ray.style.transform = `rotate(${angle}deg)`;
      
      container.appendChild(ray);

      gsap.to(ray, {
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: i * 0.25
      });
    }
  };

  const createSacredGeometry = () => {
    const container = sacredGeometryBgRef.current;
    if (!container) return;

    const geometryCount = 3;
    for (let i = 0; i < geometryCount; i++) {
      const geometry = document.createElement('div');
      geometry.classList.add('sacred-geometry-element');
      
      const size = 200 + i * 100;
      geometry.style.width = `${size}px`;
      geometry.style.height = `${size}px`;
      
      container.appendChild(geometry);

      gsap.to(geometry, {
        rotation: 360,
        duration: 20 + i * 10,
        repeat: -1,
        ease: "none"
      });
    }
  };

  // Initialize animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create all animations
    createParticles();
    createBlossoms();
    createLightRays();
    createSacredGeometry();

    // Sacred geometry rotation
    if (sacredGeometryRef.current) {
      gsap.to(sacredGeometryRef.current, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "linear"
      });
    }

    // Cleanup function
    return () => {
      const containers = [
        particlesRef.current,
        lightRaysRef.current,
        sacredGeometryBgRef.current
      ];

      // Remove all animation elements
      containers.forEach(container => {
        if (container) {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        }
      });

      // Kill all GSAP animations
      gsap.killTweensOf([
        '.particle',
        '.blossom',
        '.light-ray',
        '.sacred-geometry-element',
        sacredGeometryRef.current
      ]);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Background layers */}
      <div ref={particlesRef} className={styles.particleContainer} />
      <div ref={sacredGeometryBgRef} className={styles.sacredGeometryBg} />
      <div ref={lightRaysRef} className={styles.lightRays} />
      <div ref={sacredGeometryRef} className={styles.sacredGeometry} />
      
      {/* Content layer */}
      {children && (
        <div className={styles.contentLayer}>
          {children}
        </div>
      )}
    </div>
  );
};

export default AnimatedBackground;
