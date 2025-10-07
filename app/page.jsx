'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import RSVPModal from '../components/RSVPModal';

export default function WeddingCelebrationArabic() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);

  const backgrounds = ['/w3.jpg', '/w4.jpg', '/w1.jpg', '/w2.jpg'];

  // 🌸 Background rotation with useCallback
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  // 💌 Show RSVP modal after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsModalOpen(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  // Memoized heart component to prevent re-renders
  const FlyingHeart = useCallback(({ pos, index }) => (
    <motion.div
      className="absolute text-xl z-2"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
      }}
      initial={{ 
        opacity: 0,
        scale: 0,
      }}
      animate={{ 
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
        x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 50],
        y: [0, -100, -150],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        delay: pos.delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }}
    >
      <FaHeart 
        className={index % 3 === 0 ? "text-rose-400" : index % 3 === 1 ? "text-pink-400" : "text-red-400"}
      />
    </motion.div>
  ), []);

  // Memoized sparkle component
  const Sparkle = useCallback(({ index }) => (
    <motion.div
      className="absolute text-yellow-200 text-sm z-2"
      style={{
        left: `${20 + (index * 15) % 60}%`,
        top: `${10 + (index * 20) % 70}%`,
      }}
      animate={{ 
        opacity: [0, 0.7, 0],
        scale: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: index * 0.5,
        repeat: Infinity,
      }}
    >
      ✨
    </motion.div>
  ), []);

  const heartPositions = [
    { x: 10, y: 15, delay: 0 }, { x: 85, y: 25, delay: 0.5 },
    { x: 25, y: 75, delay: 1 }, { x: 75, y: 65, delay: 1.5 },
    { x: 45, y: 10, delay: 2 }, { x: 35, y: 55, delay: 2.5 },
    { x: 65, y: 35, delay: 3 }, { x: 15, y: 65, delay: 3.5 },
  ];

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-center font-[Cairo] bg-black px-4 py-4"
    >
      {/* 🎆 Optimized Background with less opacity overlay */}
      {backgrounds.map((bg, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${bg})`,
            opacity: currentBg === i ? 1 : 0,
            zIndex: currentBg === i ? 0 : -1,
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            transform: 'scale(1.05)', // Slightly zoomed to show more content
          }}
        />
      ))}

      {/* ✨ Lighter Gradient Overlay for better background visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-1"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-rose-900/10 z-1"></div>

      {/* 💖 Optimized Flying Hearts */}
      {heartPositions.map((pos, i) => (
        <FlyingHeart key={i} pos={pos} index={i} />
      ))}

      {/* ✨ Optimized Sparkles */}
      {[...Array(4)].map((_, i) => (
        <Sparkle key={i} index={i} />
      ))}

      {/* Main Content Container with less opacity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 w-full max-w-md mx-auto space-y-5 backdrop-blur-[2px] bg-black/20 rounded-2xl p-5 border border-white/5 shadow-xl"
      >
        
        {/* 💫 Title Section */}
        <div className="mb-4">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl text-yellow-200 font-bold mb-2"
          >
            ليلة من العمر
          </motion.h1>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="text-2xl text-yellow-100"
          >
            💫
          </motion.div>
        </div>

        {/* 🌟 Simple Divider */}
        <div className="h-0.5 bg-gradient-to-r from-yellow-200 via-pink-300 to-yellow-200 rounded-full w-32 mx-auto my-3"></div>

        {/* 💍 Couple Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="bg-black/30 p-4 rounded-xl border border-white/10"
        >
          <h2 className="text-2xl md:text-3xl text-white font-semibold mb-3">
            <span className="text-yellow-200 block mb-2">العراق</span>
            
            <motion.div
              className="text-2xl my-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❤️
            </motion.div>
            
            <span className="text-pink-200 block mt-2">الكويت</span>
          </h2>
          
          <p className="text-white/80 text-base mt-3 leading-relaxed">
            بالحب جمعنا الله، وبالعمر جمعنا القدر 💍
          </p>
        </motion.div>

        {/* 📅 Date & Place */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="bg-black/40 p-4 rounded-xl border border-yellow-300/20"
        >
          <div className="text-xl md:text-2xl font-semibold text-yellow-200 mb-2">
            الجمعة، ١٢ أكتوبر ٢٠٢٥
          </div>
          <div className="text-base md:text-lg text-white/80 flex items-center justify-center gap-2">
            <span>🏰</span>
            البصرة - قاعة ألف ليلة وليلة
            <span>✨</span>
          </div>
        </motion.div>

        {/* 💞 Central Heart */}
        <motion.div
          className="my-4"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
          }}
        >
          <FaHeart className="text-6xl text-rose-400 mx-auto" />
        </motion.div>

        {/* 🌙 Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="bg-black/30 p-4 rounded-xl border border-white/10"
        >
          <p className="text-base text-white/90 leading-loose">
            "في هذه الليلة المباركة، نحتفل بالحب، بالفرح، وباللحظة التي تبدأ فيها
            أجمل الحكايات... حكايتنا نحن."
          </p>
          <div className="text-xl mt-3 text-yellow-200">🌙</div>
        </motion.div>

      </motion.div>

      {/* 💌 RSVP Button */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-rose-500 to-yellow-400 text-white px-6 py-3 rounded-full shadow-lg z-20 border border-yellow-300 font-semibold text-base w-44"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        💌 تأكيد الحضور
      </motion.button>

      {/* 🌷 Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-6 mb-16 text-white/80 text-sm z-10 text-center"
      >
        بكل الحب، ندعوكم لمشاركتنا فرحتنا 💐
      </motion.div>

      {/* 💌 RSVP Modal */}
      <RSVPModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}