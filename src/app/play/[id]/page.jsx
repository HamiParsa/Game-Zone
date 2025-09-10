"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBackIosNew } from "react-icons/md";

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
// Simple particle background
function ParticleCanvas({ color }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles.current = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.2,
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

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

// Loading screen
function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-800 rounded-full animate-spin"></div>
      <p className="mt-4 text-white text-lg font-bold">LOADING...</p>
    </div>
  );
}

export default function PlayGamePage() {
  const router = useRouter();
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [bgColor, setBgColor] = useState([0, 0, 0]);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    const selected = games.find((g) => g.id === id);
    if (!selected) return router.push("/");
    setGame(selected);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = selected.cover;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, 1, 1).data;
      setBgColor([data[0], data[1], data[2]]);
    };
  }, [id, router]);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  if (!game) return null;

  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md opacity-60"
        style={{ backgroundImage: `url(${game.poster})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <ParticleCanvas color={bgColor} />

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 text-white bg-black/40 p-2 rounded-full hover:bg-black/70 z-20"
      >
        <MdArrowBackIosNew size={24} />
      </button>

      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {/* Main content */}
      <div className={`relative z-10 flex flex-col md:flex-row items-center justify-center h-full px-4 md:px-16 gap-6 ${loading ? "pointer-events-none" : ""}`}>
        {/* Poster */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full sm:w-64 md:w-80 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-700"
        >
          <img src={game.cover} alt={game.title} className="w-full h-auto object-cover" />
        </motion.div>

        {/* Game iframe + description */}
        <div className="flex flex-col w-full md:w-2/3 gap-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl font-bold drop-shadow-lg text-center md:text-left"
          >
            {game.title}
          </motion.h1>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-[300px] sm:h-[350px] md:h-[450px] rounded-2xl shadow-2xl border-2 border-gray-700 overflow-hidden"
          >
            <iframe
              ref={iframeRef}
              src={game.gameUrl}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              onLoad={handleIframeLoad}
            />
          </motion.div>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-white/90 text-base md:text-lg text-center md:text-left"
          >
            {game.description}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
