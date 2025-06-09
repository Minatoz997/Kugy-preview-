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

export const createLightRays = (container: HTMLElement | null) => {
  if (!container) return;
  // Light rays implementation
};

export const createSacredGeometry = (container: HTMLElement | null) => {
  if (!container) return;
  // Sacred geometry implementation
};
