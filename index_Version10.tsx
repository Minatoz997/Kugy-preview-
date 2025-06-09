import { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { gsap } from 'gsap';
import HomeSelect from "../components/HomeSelect";
import ParticlesBackground from "../components/ParticlesBackground";
import { UiContext } from "./_app";

const animeQuotes = [
  { text: "Impian itu bukan untuk dikejar, tapi untuk diwujudkan.", author: "One Piece" },
  { text: "Tidak apa-apa untuk menangis, tapi bangkitlah setelahnya.", author: "Naruto" },
  { text: "Hidup ini seperti pensil yang pasti akan habis, tapi meninggalkan tulisan indah.", author: "Natsume Yuujinchou" },
  { text: "Jangan remehkan kekuatan impian.", author: "Haikyuu!!" },
  { text: "Setiap orang punya waktu yang berharga.", author: "Your Name" },
  { text: "Jika kamu tidak mencoba, kamu tidak akan pernah tahu hasilnya.", author: "Kuroko no Basket" },
  { text: "Dunia ini kejam, tapi juga sangat indah.", author: "Attack on Titan" },
];

const texts = {
  start: "Mulai",
  carousel: [
    "🎁 Login Google - 75 Kredit | Guest - 25 Kredit!",
    "🚀 Login dengan Google atau Sebagai Tamu",
    "💬 Chat AI Karakter Anime 24/7",
    "✨ Privasi Aman & Tampilan Premium",
  ],
  version: "Versi",
  developed: "Dikembangkan dengan",
  by: "oleh",
};

const BACKEND_URL = "https://backend-cb98.onrender.com";

const animeBg = {
  background: "url('https://raw.githubusercontent.com/Minatoz997/angel_background.png/main/angel_background.png') center/cover no-repeat",
  minHeight: "100vh",
};

const darkBg = {
  background: "linear-gradient(135deg,#0f172a 40%,#172554 100%)",
  minHeight: "100vh",
};

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<"start" | "select">("start");
  const [featureIdx, setFeatureIdx] = useState(0);
  const [carouselProg, setCarouselProg] = useState(0);
  const [blurTrans, setBlurTrans] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [quoteIdx, setQuoteIdx] = useState(Math.floor(Math.random() * animeQuotes.length));

  // Refs for GSAP animations
  const loaderRef = useRef(null);
  const sacredGeometryRef = useRef(null);
  const particlesRef = useRef(null);
  const lightRaysRef = useRef(null);
  const sacredGeometryBgRef = useRef(null);

  const { darkMode } = useContext(UiContext);

  useEffect(() => {
    // Clear any existing session data
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');

    // Initialize GSAP animations
    if (sacredGeometryRef.current) {
      gsap.to(sacredGeometryRef.current, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "linear"
      });
    }

    // Create and animate particles
    createParticles();
    createBlossoms();
    createLightRays();
    createSacredGeometry();
    initParallax();
    addRippleEffect();

    return () => {
      // Cleanup animations
      gsap.killTweensOf(sacredGeometryRef.current);
    };
  }, []);

  // Original effects
  useEffect(() => {
    if (step !== "start") return;
    const listener = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setParallax({ x: x * 12, y: y * 8 });
    };
    window.addEventListener("mousemove", listener);
    return () => window.removeEventListener("mousemove", listener);
  }, [step]);

  useEffect(() => {
    if (step === "start") {
      const interval = setInterval(() => {
        setFeatureIdx((i) => (i + 1) % texts.carousel.length);
        setCarouselProg(0);
      }, 2500);
      const prog = setInterval(() => {
        setCarouselProg((p) => (p < 100 ? p + 2 : 100));
      }, 50);
      return () => {
        clearInterval(interval);
        clearInterval(prog);
      };
    }
  }, [step]);

  useEffect(() => {
    if (step !== "start") return;
    const interval = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % animeQuotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (step !== "start") return;
    document.body.style.cursor = "url('/star-cursor.png'), auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [step]);

  // GSAP Animation Functions
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
    // ... existing createLightRays code ...
  };

  const createSacredGeometry = () => {
    // ... existing createSacredGeometry code ...
  };

  const initParallax = () => {
    // ... existing initParallax code ...
  };

  const addRippleEffect = () => {
    // ... existing addRippleEffect code ...
  };

  const handleStart = () => {
    setBlurTrans(true);
    setTimeout(() => {
      setBlurTrans(false);
      setStep("select");
    }, 450);
  };

  if (step === "start") {
    return (
      <div
        className="flex flex-col min-h-screen relative overflow-hidden transition-colors duration-500"
        style={
          darkMode
            ? darkBg
            : { ...animeBg, backgroundPosition: `${50 + parallax.x}% ${50 + parallax.y}%` }
        }
      >
        <ParticlesBackground darkMode={darkMode} />

        {/* GSAP Animation Containers */}
        <div ref={particlesRef} className="particle-container"></div>
        <div ref={sacredGeometryBgRef} className="sacred-geometry-bg"></div>
        <div ref={lightRaysRef} className="light-rays"></div>

        {/* Original Content */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-8 z-10">
          <span className="bg-gradient-to-r from-blue-400 to-sky-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            Beta
          </span>
        </div>

        {/* ... rest of the original JSX ... */}
      </div>
    );
  }

  if (step === "select") {
    return (
      <>
        <ParticlesBackground darkMode={darkMode} />
        <HomeSelect
          onGoogle={() => {
            if (typeof window !== "undefined") {
              window.location.href = `${BACKEND_URL}/auth/google`;
            }
          }}
          onGuest={async () => {
            const guestEmail = `guest_${Math.random().toString(36).substr(2, 9)}@guest.kugy.ai`;
            try {
              const response = await fetch(`${BACKEND_URL}/api/guest-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: guestEmail }),
              });
              
              const data = await response.json();
              if (response.ok && data.token) {
                sessionStorage.setItem("token", data.token);
                localStorage.setItem("user_email", guestEmail);
                router.push(`/menu?email=${encodeURIComponent(guestEmail)}&credits=25`);
              } else {
                throw new Error(data.error || "No token received");
              }
            } catch (error) {
              console.error("Guest login error:", error);
              const dummyToken = "guest-token-" + guestEmail;
              sessionStorage.setItem("token", dummyToken);
              localStorage.setItem("user_email", guestEmail);
              router.push(`/menu?email=${encodeURIComponent(guestEmail)}&credits=25`);
            }
          }}
          bgStyle={darkMode ? darkBg : animeBg}
        />
      </>
    );
  }

  return null;
};

export default IndexPage;