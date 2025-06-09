import { gsap } from 'gsap';

export const createParticles = (container: HTMLElement | null) => {
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

export const createBlossoms = (container: HTMLElement | null) => {
  // ... kode createBlossoms
};

export const createLightRays = (container: HTMLElement | null) => {
  // ... kode createLightRays
};

export const createSacredGeometry = (container: HTMLElement | null) => {
  // ... kode createSacredGeometry
};

export const animateCharacter = () => {
  // ... kode animateCharacter
};

export const initParallax = () => {
  // ... kode initParallax
};

export const addRippleEffect = () => {
  // ... kode addRippleEffect
};
