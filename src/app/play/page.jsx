"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ColorThief from "colorthief";
import { GiPlayButton } from "react-icons/gi";
import { MdArrowBackIosNew, MdArrowForwardIos, MdKeyboard } from "react-icons/md";

const games = [
  {
    id: "1",
    title: "Mortal Kombat 3",
    cover: "https://m.media-amazon.com/images/M/MV5BMjc4Y2UzMGQtNjBjZi00YzE2LTkzNDctYzg1MGQzNWUwZGRlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    poster: "https://4kwallpapers.com/images/walls/thumbs_3t/19808.jpeg",
    description: "Experience the ultimate fighting showdown with iconic characters, brutal combos, and intense arcade action.",
    gameUrl: "https://www.retrogames.cc/embed/16951-ultimate-mortal-kombat-3-usa.html",
  },
  {
    id: "2",
    title: "Streets of Rage",
    cover: "https://i.ebayimg.com/images/g/8CoAAOSwQ0ZjBx89/s-l1200.jpg",
    poster: "https://images.launchbox-app.com//43b11d02-0d14-4dd6-a734-425eadc7b75b.jpg",
    description: "Take down gangs and fight through crime-infested streets in this legendary beat'em up classic.",
    gameUrl: "https://www.retrogames.cc/embed/28442-bare-knuckle-ikari-no-tetsuken-streets-of-rage-world-rev-a.html",
  },
  {
    id: "3",
    title: "Spider Man",
    cover: "https://howlongtobeat.com/games/8938_Spider-Man.png",
    poster: "https://4kwallpapers.com/images/walls/thumbs_3t/22180.png",
    description: "Swing through the city, fight crime, and become the hero New York deserves in this action-packed adventure.",
    gameUrl: "https://www.retrogames.cc/embed/32210-spider-man-usa.html",
  },
  {
    id: "4",
    title: "Bat Man",
    cover: "https://www.oldgames.sk/images/oldgames/action/BatmanVideoGame/Covers/batman-the-video-game-genesis-box-front.jpg",
    poster: "https://4kwallpapers.com/images/walls/thumbs_3t/4087.jpg",
    description: "Step into the shadows as Gotham's Dark Knight and battle iconic villains to protect the city.",
    gameUrl: "https://www.retrogames.cc/embed/29796-batman-japan.html",
  },
  {
    id: "5",
    title: "Shadow Dance",
    cover: "https://cdn.mobygames.com/covers/4200380-shadow-dancer-sega-master-system-front-cover.jpg",
    poster: "https://images.launchbox-app.com/0ccede93-827f-4558-be31-faac12fbb0ab.png",
    description: "Master stealth and combat as a ninja in this thrilling action platformer filled with danger and skill-based challenges.",
    gameUrl: "https://www.retrogames.cc/embed/30375-shadow-dancer-the-secret-of-shinobi-world.html",
  },
  {
    id: "6",
    title: "Sunset Riders",
    cover: "https://i.pinimg.com/736x/e0/14/e5/e014e5fff068299403a1c95665ab7c72.jpg",
    poster: "https://images.launchbox-app.com/2c1ef5ea-a6d2-4302-9f50-739b153377a4.png",
    description: "Ride into the Wild West, duel outlaws, and become the ultimate bounty hunter in this arcade classic.",
    gameUrl: "https://www.retrogames.cc/embed/16748-sunset-riders-usa.html",
  },
  {
    id: "7",
    title: "Pink Panther",
    cover: "https://m.media-amazon.com/images/I/711WD9aDOzL._UF1000,1000_QL80_.jpg",
    poster: "https://wallpapers.com/images/hd/relaxed-pink-panther-cartoon-cr07sjer88rb3vuo.jpg",
    description: "Solve quirky puzzles and chase mysteries alongside the smooth and clever Pink Panther in this fun adventure.",
    gameUrl: "https://www.retrogames.cc/embed/42265-pink-panther-pinkadelic-pursuit.html",
  },
  {
    id: "8",
    title: "Sonic",
    cover: "https://i.ebayimg.com/images/g/3UQAAOSwzX1kVCo5/s-l1200.jpg",
    poster: "https://4kwallpapers.com/images/walls/thumbs_3t/7933.jpg",
    description: "Run at lightning speed, collect rings, and battle Dr. Robotnik in this iconic platformer adventure.",
    gameUrl: "https://www.retrogames.cc/embed/28249-sonic-the-hedgehog-usa-europe-hack-by-lost-v1-0-sonic-jam-s-easy-mode.html",
  },
  {
    id: "9",
    title: "Crash Team Racing",
    cover: "https://myhotposters.com/cdn/shop/products/mL3200_1024x1024.jpg?v=1748534676",
    poster: "https://i0.wp.com/gameranx.com/wp-content/uploads/2019/06/H2x1_NSwitch_CrashTeamRacingNitroFueled_image1600w.jpg?fit=1600%2C800&quality=89&ssl=1",
    description: "Race against friends and rivals, use crazy power-ups, and claim victory in this high-speed karting classic.",
    gameUrl: "https://www.retrogames.cc/embed/41687-crash-team-racing.html",
  },
  {
    id: "10",
    title: "Tiny Toon",
    cover: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p514269_b_v8_aa.jpg",
    poster: "https://www.traditionalanimation.com/wp-content/uploads/2023/08/tinytoonslooniversityheader.png",
    description: "Join Buster and friends in a zany adventure full of laughs, challenges, and cartoon chaos.",
    gameUrl: "https://www.retrogames.cc/embed/28522-tiny-toon-adventures-buster-s-hidden-treasure-usa.html",
  },
  {
    id: "11",
    title: "Pac Man",
    cover: "https://cdn.mobygames.com/covers/4556611-pac-man-commodore-64-front-cover.jpg",
    poster: "https://wallpapers.com/images/hd/pacman-background-4rm7w3jcm9a5y12y.jpg",
    description: "Navigate mazes, gobble pellets, and outsmart ghosts in the timeless arcade classic.",
    gameUrl: "https://www.retrogames.cc/embed/26817-classic-nes-pacman-u-hyperion.html",
  },
  {
    id: "12",
    title: "Ben 10",
    cover: "https://i.pinimg.com/736x/40/1f/49/401f49b55f06314eabb587304445e36b.jpg",
    poster: "https://4kwallpapers.com/images/walls/thumbs_3t/18954.jpg",
    description: "Transform into alien heroes and save the world with exciting powers in this action-packed adventure.",
    gameUrl: "https://www.retrogames.cc/embed/43849-ben-10-unl.html",
  },
  {
    id: "13",
    title: "Mortal Kombat 4",
    cover: "https://m.media-amazon.com/images/M/MV5BODNjNDBiMTctNzM0ZS00ZGJhLThjMjktYjVmNjMzZmI3M2E2XkEyXkFqcGc@._V1_.jpg",
    poster: "https://4kwallpapers.com/images/walls/thumbs_3t/1130.jpg",
    description: "Fight through intense battles with new characters, stages, and the classic Mortal Kombat brutality.",
    gameUrl: "https://www.retrogames.cc/embed/32474-mortal-kombat-4-usa.html",
  },
];

function ParticleCanvas({ color }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numParticles = 100;
    particles.current = Array.from({ length: numParticles }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      alpha: Math.random() * 0.7 + 0.3,
    }));

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
      requestAnimationFrame(animate);
    };
    animate();
  }, [color]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export default function PS5Slider() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [bgColor, setBgColor] = useState([0, 0, 0]);
  const scrollRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);
  const [touchStart, setTouchStart] = useState(null); // ✨ اضافه شد

  const handlePlay = () => router.push(`/play/${games[current].id}`);
  const handleNext = () => setCurrent((prev) => (prev + 1) % games.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + games.length) % games.length);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = games[current].cover;
    img.onload = () => {
      const colorThief = new ColorThief();
      const dominantColor = colorThief.getColor(img);
      setBgColor(dominantColor);
    };
  }, [current]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Enter") handlePlay();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  useEffect(() => {
    if (scrollRef.current && scrollRef.current.children[current]) {
      const card = scrollRef.current.children[current];
      const offset =
        card.offsetLeft -
        scrollRef.current.offsetWidth / 2 +
        card.offsetWidth / 2;
      scrollRef.current.scrollTo({ left: offset, behavior: "smooth" });
    }
  }, [current]);

  const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
  const handleDragStart = (e) => setDragStart(e.clientX);
  const handleDragEnd = (e) => {
    if (dragStart !== null) {
      if (e.clientX - dragStart > 50) handlePrev();
      if (e.clientX - dragStart < -50) handleNext();
    }
    setDragStart(null);
  };

  // ✨ تاچ ساپورت
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart !== null) {
      const diff = e.changedTouches[0].clientX - touchStart;
      if (diff > 50) handlePrev();
      if (diff < -50) handleNext();
    }
    setTouchStart(null);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleTouchStart} // ✨ اضافه شد
      onTouchEnd={handleTouchEnd}     // ✨ اضافه شد
      className="relative h-screen w-full overflow-hidden select-none touch-none"
    >
      {/* Background Poster */}
      <AnimatePresence mode="wait">
        <motion.div
          key={games[current].id}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${games[current].poster})`,
            translateX: mouse.x / 100,
            translateY: mouse.y / 100,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Glow + Particles */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, rgba(${bgColor[0]},${bgColor[1]},${bgColor[2]},0.4) 0%, rgba(0,0,0,0.9) 100%)`,
          mixBlendMode: "screen",
          filter: "blur(140px)",
        }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />
      <ParticleCanvas color={bgColor} />
      <div className="absolute inset-0 bg-black/30" />

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
        <motion.div
          key={games[current].id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-8 text-white text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            {games[current].title}
          </h1>
          <button
            onClick={handlePlay}
            className="mt-4 md:mt-6 px-10 md:px-14 py-3 md:py-5 bg-blue-600 hover:bg-blue-800 rounded-2xl shadow-lg text-lg md:text-2xl font-semibold transition flex items-center justify-center gap-2"
          >
            <GiPlayButton size={24} /> Play
          </button>
        </motion.div>

        {/* Controls */}
        <div className="absolute top-4 right-4 hidden md:flex flex-col items-end space-y-2 text-white text-sm">
          <div className="flex items-center gap-1">
            <MdArrowBackIosNew /> Left Arrow
          </div>
          <div className="flex items-center gap-1">
            <MdArrowForwardIos /> Right Arrow
          </div>
          <div className="flex items-center gap-1">
            <MdKeyboard /> Enter
          </div>
        </div>

        <div className="flex gap-5 mb-[50px]">
          <button
            onClick={handlePrev}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white shadow-lg"
          >
            <MdArrowBackIosNew size={24} />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white shadow-lg"
          >
            <MdArrowForwardIos size={24} />
          </button>
        </div>

        {/* 3D Slider */}
        <div
          ref={scrollRef}
          className="absolute bottom-12 md:bottom-16 flex space-x-4 md:space-x-6 overflow-hidden px-4 md:px-8 py-2 perspective"
        >
          {games.map((game, index) => {
            const offset = index === current ? 0 : index - current;
            const scale = index === current ? 1 : 0.8;
            const rotateY = offset * 20;
            const zIndex = index === current ? 20 : 10;
            return (
              <motion.div
                key={game.id}
                onClick={() => setCurrent(index)}
                style={{
                  transform: `translateZ(0) rotateY(${rotateY}deg)`,
                  zIndex,
                }}
                className="relative flex-shrink-0 cursor-pointer rounded-2xl group"
              >
                <motion.img
                  src={game.cover}
                  alt={game.title}
                  className="w-40 md:w-48 h-56 md:h-64 object-cover rounded-2xl shadow-2xl border-2 border-cyan-400 group-hover:scale-110 transition-transform duration-300"
                  animate={{ scale, opacity: index === current ? 1 : 0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <div className="absolute top-2 left-2 bg-blue-600 px-2 py-1 rounded-md text-white text-xs font-bold">
                  Top #{index + 1}
                </div>
                {index === current && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      boxShadow: `0 0 100px 40px rgba(${bgColor[0]},${bgColor[1]},${bgColor[2]},0.8)`,
                    }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
