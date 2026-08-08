"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorThief from "colorthief";
import { GiPlayButton } from "react-icons/gi";
import { 
  MdArrowBackIosNew, 
  MdArrowForwardIos, 
  MdKeyboard,
  MdClose 
} from "react-icons/md";
import { FaGamepad } from "react-icons/fa";

// ============================================
// GAMES DATA
// ============================================

const games = [
  { 
    id: "1", 
    title: "Mortal Kombat 3", 
    cover: "https://i.postimg.cc/j26MDh5S/pic1.jpg", 
    poster: "https://i.postimg.cc/htv0nn9n/pic2.jpg", 
    description: "Experience the ultimate fighting showdown with iconic characters, brutal combos, and intense arcade action.", 
    gameUrl: "https://www.retrogames.cc/embed/16951-ultimate-mortal-kombat-3-usa.html" 
  },
  { 
    id: "2", 
    title: "Streets of Rage", 
    cover: "https://i.postimg.cc/cHLx9Fpm/pic3.jpg", 
    poster: "https://i.postimg.cc/Vkh2QD03/pic4.jpg", 
    description: "Take down gangs and fight through crime-infested streets in this legendary beat'em up classic.", 
    gameUrl: "https://www.retrogames.cc/embed/28442-bare-knuckle-ikari-no-tetsuken-streets-of-rage-world-rev-a.html" 
  },
  { 
    id: "3", 
    title: "Spider Man", 
    cover: "https://i.postimg.cc/7b8bWgM6/pic5.jpg", 
    poster: "https://i.postimg.cc/fDcXyVLH/pic6.jpg", 
    description: "Swing through the city, fight crime, and become the hero New York deserves in this action-packed adventure.", 
    gameUrl: "https://www.retrogames.cc/embed/32210-spider-man-usa.html" 
  },
  { 
    id: "4", 
    title: "Bat Man", 
    cover: "https://i.postimg.cc/QdRskXm7/pic7.jpg", 
    poster: "https://i.postimg.cc/wvnbnvtD/pic8.jpg", 
    description: "Step into the shadows as Gotham's Dark Knight and battle iconic villains to protect the city.", 
    gameUrl: "https://www.retrogames.cc/embed/29796-batman-japan.html" 
  },
  { 
    id: "5", 
    title: "Shadow Dance", 
    cover: "https://i.postimg.cc/Nfkpkbx1/pic9.jpg", 
    poster: "https://i.postimg.cc/SKFRQLwV/pic10.jpg", 
    description: "Master stealth and combat as a ninja in this thrilling action platformer filled with danger and skill-based challenges.", 
    gameUrl: "https://www.retrogames.cc/embed/30375-shadow-dancer-the-secret-of-shinobi-world.html" 
  },
  { 
    id: "6", 
    title: "Sunset Riders", 
    cover: "https://i.postimg.cc/vmbySPRx/pic10.webp", 
    poster: "https://i.postimg.cc/Vsn8mQYN/pic11.jpg", 
    description: "Ride into the Wild West, duel outlaws, and become the ultimate bounty hunter in this arcade classic.", 
    gameUrl: "https://www.retrogames.cc/embed/16748-sunset-riders-usa.html" 
  },
  { 
    id: "7", 
    title: "Sonic", 
    cover: "https://i.postimg.cc/RVpGYhjB/pic12.jpg", 
    poster: "https://i.postimg.cc/1tMDNYS3/pic13.jpg", 
    description: "Run at lightning speed, collect rings, and battle Dr. Robotnik in this iconic platformer adventure.", 
    gameUrl: "https://www.retrogames.cc/embed/28249-sonic-the-hedgehog-usa-europe-hack-by-lost-v1-0-sonic-jam-s-easy-mode.html" 
  },
  { 
    id: "8", 
    title: "Crash Team Racing", 
    cover: "https://i.postimg.cc/tgqTVR4S/pic14.webp", 
    poster: "https://i.postimg.cc/NjzGJ38F/pic14.jpg", 
    description: "Race against friends and rivals, use crazy power-ups, and claim victory in this high-speed karting classic.", 
    gameUrl: "https://www.retrogames.cc/embed/41687-crash-team-racing.html" 
  },
  { 
    id: "9", 
    title: "Pac Man", 
    cover: "https://i.postimg.cc/L60M2zJb/pic15.jpg", 
    poster: "https://i.postimg.cc/T1zqJ77w/pic16.jpg", 
    description: "Navigate mazes, gobble pellets, and outsmart ghosts in the timeless arcade classic.", 
    gameUrl: "https://www.retrogames.cc/embed/26817-classic-nes-pacman-u-hyperion.html" 
  },
];

// ============================================
// PARTICLE BACKGROUND (Fixed window error)
// ============================================

function ParticleCanvas({ color }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    // Check if window is defined (browser only)
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const numParticles = 100;
    particles.current = Array.from({ length: numParticles }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      alpha: Math.random() * 0.7 + 0.3,
    }));

    let animationId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${p.alpha})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

// ============================================
// GAME IFRAME MODAL
// ============================================

function GameIframe({ game, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          className="relative w-full max-w-6xl h-[90vh] bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-3">
              <FaGamepad className="text-red-500 text-xl" />
              <h3 className="text-white font-bold">{game.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors flex items-center justify-center text-white"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Iframe */}
          <iframe
            src={game.gameUrl}
            className="w-full h-full"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function PS5Slider() {
  const [current, setCurrent] = useState(0);
  const [bgColor, setBgColor] = useState([180, 0, 0]);
  const [showIframe, setShowIframe] = useState(false);
  const scrollRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const currentGame = games[current];

  // Get window size (only on client)
  useEffect(() => {
    if (typeof window === "undefined") return;
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePlay = () => setShowIframe(true);
  const handleNext = () => setCurrent((prev) => (prev + 1) % games.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + games.length) % games.length);

  // Extract color from cover
  useEffect(() => {
    if (typeof window === "undefined") return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = currentGame.cover;
    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(img);
        setBgColor(color);
      } catch {
        setBgColor([180, 0, 0]);
      }
    };
    img.onerror = () => setBgColor([180, 0, 0]);
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKey = (e) => {
      if (showIframe) {
        if (e.key === "Escape") setShowIframe(false);
        return;
      }
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Enter") handlePlay();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, showIframe]);

  // Center scroll
  useEffect(() => {
    if (scrollRef.current && scrollRef.current.children[current]) {
      const card = scrollRef.current.children[current];
      const offset = card.offsetLeft - scrollRef.current.offsetWidth / 2 + card.offsetWidth / 2;
      scrollRef.current.scrollTo({ left: offset, behavior: "smooth" });
    }
  }, [current]);

  // Mouse drag
  const handleMouseMove = (e) => {
    if (typeof window === "undefined") return;
    setMouse({ x: e.clientX, y: e.clientY });
  };
  const handleDragStart = (e) => setDragStart(e.clientX);
  const handleDragEnd = (e) => {
    if (dragStart !== null) {
      if (e.clientX - dragStart > 50) handlePrev();
      if (e.clientX - dragStart < -50) handleNext();
    }
    setDragStart(null);
  };

  // Touch
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart !== null) {
      const diff = e.changedTouches[0].clientX - touchStart;
      if (diff > 50) handlePrev();
      if (diff < -50) handleNext();
    }
    setTouchStart(null);
  };

  // Parallax offset
  const getParallax = () => {
    if (!windowSize.width) return { x: 0, y: 0 };
    return {
      x: (mouse.x - windowSize.width / 2) / 80,
      y: (mouse.y - windowSize.height / 2) / 80,
    };
  };

  const parallax = getParallax();

  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative h-screen w-full overflow-hidden select-none touch-none bg-black"
      >
        {/* ===== BACKGROUND POSTER ===== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGame.id}
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{
              backgroundImage: `url(${currentGame.poster})`,
              transform: `translate(${parallax.x}px, ${parallax.y}px)`,
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>

        {/* ===== GLOW + PARTICLES ===== */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, rgba(${bgColor[0]},${bgColor[1]},${bgColor[2]},0.4) 0%, rgba(0,0,0,0.95) 100%)`,
            filter: "blur(120px)",
          }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
        <ParticleCanvas color={bgColor} />
        <div className="absolute inset-0 bg-black/20" />

        {/* ===== MAIN CONTENT ===== */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGame.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center mb-6 text-white text-center"
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-2xl"
                style={{ textShadow: `0 0 60px rgba(${bgColor[0]},${bgColor[1]},${bgColor[2]},0.5)` }}
              >
                {currentGame.title}
              </motion.h1>
              
              <motion.p 
                className="text-gray-300 text-sm md:text-base max-w-md mt-2 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentGame.description}
              </motion.p>

              <motion.button
                onClick={handlePlay}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="mt-5 px-10 md:px-14 py-3 md:py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-2xl shadow-2xl shadow-red-500/40 text-lg md:text-2xl font-semibold transition flex items-center gap-3"
              >
                <GiPlayButton size={24} /> Play Now
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* ===== KEYBOARD CONTROLS HINT ===== */}
          <div className="absolute top-4 right-4 hidden md:flex flex-col items-end space-y-2 text-white/60 text-xs">
            <div className="flex items-center gap-1"><MdArrowBackIosNew size={14} /> Prev</div>
            <div className="flex items-center gap-1"><MdArrowForwardIos size={14} /> Next</div>
            <div className="flex items-center gap-1"><MdKeyboard size={14} /> Enter</div>
          </div>

          {/* ===== NAV BUTTONS ===== */}
          <div className="flex gap-4 mb-4">
            <button 
              onClick={handlePrev} 
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
            >
              <MdArrowBackIosNew size={22} />
            </button>
            <button 
              onClick={handleNext} 
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
            >
              <MdArrowForwardIos size={22} />
            </button>
          </div>

          {/* ===== 3D SLIDER ===== */}
          <div 
            ref={scrollRef} 
            className="absolute bottom-12 md:bottom-16 flex space-x-4 md:space-x-6 overflow-hidden px-4 md:px-8 py-2 w-full max-w-5xl"
          >
            {games.map((game, index) => {
              const isActive = index === current;
              const offset = index - current;
              const scale = isActive ? 1 : 0.75;
              const rotateY = offset * 15;
              const zIndex = isActive ? 30 : 10;
              const opacity = Math.abs(offset) <= 2 ? 1 : 0;

              return (
                <motion.div
                  key={game.id}
                  onClick={() => setCurrent(index)}
                  style={{ 
                    transform: `perspective(1000px) rotateY(${rotateY}deg)`,
                    zIndex,
                    opacity,
                    flexShrink: 0,
                  }}
                  className="relative cursor-pointer group"
                >
                  <motion.img
                    src={game.cover}
                    alt={game.title}
                    className="w-28 md:w-40 h-40 md:h-56 object-cover rounded-2xl shadow-2xl border-2 border-white/10 group-hover:border-red-400 transition-all"
                    animate={{ 
                      scale,
                      boxShadow: isActive 
                        ? `0 0 60px rgba(${bgColor[0]},${bgColor[1]},${bgColor[2]},0.6)` 
                        : "0 0 0px rgba(0,0,0,0)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ 
                        boxShadow: `0 0 80px 30px rgba(${bgColor[0]},${bgColor[1]},${bgColor[2]},0.5)`,
                      }}
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  <div className="absolute top-2 left-2 bg-red-500/80 backdrop-blur-sm px-2 py-0.5 rounded-md text-white text-xs font-bold">
                    #{index + 1}
                  </div>

                  {isActive && (
                    <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-white text-[10px] font-medium whitespace-nowrap bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                      ▶ Playing
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== GAME IFRAME ===== */}
      {showIframe && (
        <GameIframe 
          game={currentGame} 
          onClose={() => setShowIframe(false)} 
        />
      )}
    </>
  );
}