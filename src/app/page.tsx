'use client'
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidJoystickAlt } from "react-icons/bi";

interface Particle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  color: string;
}

const Home: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // ذخیره سایز پنجره برای parallax
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = document.getElementById("bgCanvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();

        const dx = mousePosRef.current.x - p.x;
        const dy = mousePosRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= dx / 70;
          p.y -= dy / 70;
        }

        p.x += p.dx;
        p.y += p.dy;

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouse = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);

    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const parallaxStyle = (factor: number): React.CSSProperties => ({
    transform: windowSize.width
      ? `translate(${(mousePos.x - windowSize.width / 2) / factor}px, ${(mousePos.y - windowSize.height / 2) / factor}px)`
      : "none"
  });

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <canvas id="bgCanvas" className="absolute top-0 left-0 w-full h-full z-0"></canvas>

      <header className="flex justify-center items-center px-6 py-4 bg-black bg-opacity-40 backdrop-blur-md fixed w-full z-50">
        <h1 className="text-4xl flex sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 neon-text glitch">
          GameZone
          <BiSolidJoystickAlt className="text-white mt-3 ml-1" />
        </h1>
      </header>

      <section className="relative h-screen flex flex-col items-center justify-center z-10 px-4 sm:px-6 md:px-12 text-center">
        <h2 style={parallaxStyle(50)} className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 animate-flicker neon-text glitch">
          Enter the GameZone
        </h2>
        <p style={parallaxStyle(100)} className="text-lg sm:text-xl md:text-2xl mb-8 neon-text max-w-xl">
          Dive into the ultimate gaming experience. Explore worlds, compete with players, and conquer challenges.
        </p>
        <button style={parallaxStyle(80)} className="px-14 sm:px-20 py-4 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 rounded-3xl font-bold text-lg sm:text-xl transition shadow-2xl shadow-pink-500/80 neon-button animate-pulse">
          <Link href='/play'>Start Now</Link>
        </button>
      </section>

      <footer className="bg-black bg-opacity-70 backdrop-blur-md text-gray-400 p-6 sm:p-8 flex justify-center items-center text-sm sm:text-base z-10">
        <span>&copy; 2025 GameZone. All rights reserved.</span>
      </footer>

      <style jsx>{`
        .neon-text {
          text-shadow:
            0 0 5px #ff00ff,
            0 0 10px #ff00ff,
            0 0 20px #ff00ff,
            0 0 40px #ff00ff;
        }
        .neon-button {
          text-shadow:
            0 0 2px #fff,
            0 0 5px #ff00ff,
            0 0 15px #ff00ff;
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.85; }
        }
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 22%, 24%, 55% { opacity: 0.4; }
        }
        .animate-flicker {
          animation: flicker 1.5s infinite;
        }
        @keyframes glitch {
          0% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
          20% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
          40% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
          60% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
          80% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
          100% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
        }
        .glitch {
          animation: glitch 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
