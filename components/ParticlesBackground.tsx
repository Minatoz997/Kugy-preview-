import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '@/styles/ParticlesBackground.module.css';

const ParticlesBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const createParticles = () => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing particles
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Create new particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      
      // Random size
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      
      // Random opacity
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString();
      
      container.appendChild(particle);

      // Animate with GSAP
      gsap.to(particle, {
        y: `-
