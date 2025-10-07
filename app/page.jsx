'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import RSVPModal from '../components/RSVPModal';

export default function WeddingCelebrationArabic() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef(null);
  const [currentBg, setCurrentBg] = useState(0);

  const backgrounds = ['/w3.jpg', '/w4.jpg', '/w1.jpg', '/w2.jpg'];

  // 🌸 Rotate background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // 🎵 Play music on first click
  const handlePlayMusic = () => {
    if (!musicPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setMusicPlaying(true);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handlePlayMusic, { once: true });
    return () => window.removeEventListener('click', handlePlayMusic);
  }, []);

  // 💌 Show RSVP modal after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsModalOpen(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-center font-[Cairo] bg-black"
    >
      {/* 🎆 Background slideshow */}
      {backgrounds.map((bg, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${bg})`,
            opacity: currentBg === i ? 1 : 0,
          }}
        />
      ))}

      {/* ✨ Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80"></div>

      {/* 🎶 Music */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/wedding-song.mp3" type="audio/mpeg" />
      </audio>

      {/* 🌹 Floating petals and hearts */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 400 }}
          animate={{ opacity: [0.2, 1, 0], y: -200 }}
          transition={{
            repeat: Infinity,
            duration: 7 + Math.random() * 3,
            delay: Math.random() * 4,
          }}
          className="absolute text-3xl"
          style={{
            color: Math.random() > 0.5 ? '#FFD700' : '#FF69B4',
            left: `${Math.random() * 100}%`,
          }}
        >
          {Math.random() > 0.5 ? '💖' : '🌸'}
        </motion.div>
      ))}

      {/* 🎇 Soft glowing particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute rounded-full bg-yellow-200 blur-3xl"
          style={{
            width: '180px',
            height: '180px',
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            opacity: 0.1 + Math.random() * 0.3,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 6 + Math.random() * 3,
          }}
        />
      ))}

      {/* 💫 Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="relative z-10 text-5xl md:text-7xl text-yellow-300 font-bold drop-shadow-[0_0_25px_rgba(255,255,0,0.8)]"
      >
        ليلة من العمر 💫
      </motion.h1>

      {/* 🌟 Divider */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ duration: 2, delay: 0.8 }}
        className="mt-4 h-[3px] bg-gradient-to-r from-yellow-200 via-pink-400 to-yellow-200 rounded-full relative z-10 shadow-lg"
      />

      {/* 💍 Couple names */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="relative z-10 mt-10"
      >
        <h2 className="text-5xl md:text-6xl text-white font-semibold drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
          <span className="text-yellow-300">العراق</span> ❤️{' '}
          <span className="text-pink-300">الكويت</span>
        </h2>
        <p className="mt-4 text-lg md:text-xl text-white/90">
          بالحب جمعنا الله، وبالعمر جمعنا القدر 💍
        </p>
      </motion.div>

      {/* 📅 Date & Place */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 2 }}
        className="mt-8 text-white relative z-10"
      >
        <p className="text-2xl md:text-3xl font-semibold text-yellow-200">
          الجمعة، ١٢ أكتوبر ٢٠٢٥
        </p>
        <p className="text-lg mt-2 text-white/80">
          البصرة - قاعة ألف ليلة وليلة ✨
        </p>
      </motion.div>

      {/* 💞 Animated Heart */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1.3, 1, 1.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-12 text-yellow-400 relative z-10 drop-shadow-[0_0_30px_rgba(255,255,0,0.8)]"
      >
        <FaHeart className="text-8xl" />
      </motion.div>

      {/* 🌙 Quote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 2 }}
        className="relative z-10 mt-8 text-white text-lg md:text-xl max-w-2xl px-4 leading-relaxed drop-shadow-md"
      >
        “في هذه الليلة المباركة، نحتفل بالحب، بالفرح، وباللحظة التي تبدأ فيها
        أجمل الحكايات... حكايتنا نحن.” 🌙
      </motion.p>

      {/* 🎵 Music control button */}
      <button
        onClick={() => {
          if (audioRef.current) {
            if (musicPlaying) {
              audioRef.current.pause();
            } else {
              audioRef.current.play();
            }
            setMusicPlaying(!musicPlaying);
          }
        }}
        className="absolute bottom-8 left-6 bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-yellow-500 hover:to-pink-500 text-white px-6 py-3 rounded-full shadow-xl z-20 transition transform hover:scale-110"
      >
        {musicPlaying ? '🔇 إيقاف الموسيقى' : '🎵 تشغيل الموسيقى'}
      </button>

      {/* 🌷 Footer message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 2 }}
        className="absolute bottom-4 text-white/80 text-sm md:text-base z-10"
      >
        بكل الحب، ندعوكم لمشاركتنا فرحتنا 💐
      </motion.div>

      {/* 💌 RSVP Modal */}
      <RSVPModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
