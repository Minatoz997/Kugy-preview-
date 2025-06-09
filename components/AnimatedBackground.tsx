import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '@/styles/AnimatedBackground.module.css';

const AnimatedBackground: React.FC = () => {
  const sacredGeometryRef = useRef(null);
  const particlesRef = useRef(null);
  const lightRaysRef = useRef(null);
  const sacredGeometryBgRef = useRef(null);

  // Pindahkan semua fungsi animasi dari kode sebelumnya
  useEffect(() => {
    // Initialize animations
    createParticles();
    createBlossoms();
    createLightRays();
    createSacredGeometry();
  }, []);

  // ... fungsi animasi lainnya

  return (
    <div className={styles.animatedBg}>
      <div ref={particlesRef} className={styles.particleContainer}></div>
      <div ref={sacredGeometryBgRef} className={styles.sacredGeometryBg}></div>
      <div ref={lightRaysRef} className={styles.lightRays}></div>
    </div>
  );
};

export default AnimatedBackground;
