'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import RSVPModal from '../components/RSVPModal';

export default function WeddingCelebrationArabic() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Optimized: Preload backgrounds and use smaller images
  const backgrounds = useMemo(() => ['/w3.jpg', '/w4.jpg', '/w1.jpg', '/w2.jpg'], []);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = backgrounds.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
      try {
        await Promise.all(promises);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoaded(true); // Continue even if some images fail
      }
    };

    preloadImages();
  }, [backgrounds]);

  // Optimized: Reduced background rotation time and added cleanup
  useEffect(() => {
    if (!isLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % backgrounds.length);
    }, 10000); // Increased from 8s to 10s
    
    return () => clearInterval(interval);
  }, [backgrounds.length, isLoaded]);

  // Optimized: Reduced auto-modal time
  useEffect(() => {
    if (!isLoaded) return;
    
    const timer = setTimeout(() => setIsModalOpen(true), 10000); // Reduced from 15s to 10s
    return () => clearTimeout(timer);
  }, [isLoaded]);

  // Optimized: Reduced number of hearts and simplified animation
  const FlyingHeart = useCallback(({ pos, index }) => (
    <motion.div
      className="absolute text-lg z-2"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
      }}
      initial={{ 
        opacity: 0,
        scale: 0,
      }}
      animate={{ 
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0],
        y: [0, -80, -120],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay: pos.delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeOut"
      }}
    >
      <FaHeart 
        className={index % 3 === 0 ? "text-rose-400" : index % 3 === 1 ? "text-pink-400" : "text-red-400"}
      />
    </motion.div>
  ), []);

  // Optimized: Reduced number of sparkles
  const Sparkle = useCallback(({ index }) => (
    <motion.div
      className="absolute text-yellow-200 text-sm z-2"
      style={{
        left: `${20 + (index * 20) % 60}%`,
        top: `${10 + (index * 25) % 70}%`,
      }}
      animate={{ 
        opacity: [0, 0.5, 0],
        scale: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay: index * 0.8,
        repeat: Infinity,
      }}
    >
      ✨
    </motion.div>
  ), []);

  // Optimized: Reduced number of heart positions
  const heartPositions = useMemo(() => [
    { x: 10, y: 15, delay: 0 }, { x: 85, y: 25, delay: 1 },
    { x: 25, y: 75, delay: 2 }, { x: 75, y: 65, delay: 3 },
    { x: 45, y: 10, delay: 1.5 }, { x: 35, y: 55, delay: 2.5 },
  ], []);

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-center font-[Cairo] bg-black px-4 py-4"
    >
      {/* 🎆 Optimized Background with will-change */}
      <div className="absolute inset-0">
        {backgrounds.map((bg, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000"
            style={{
              backgroundImage: `url(${bg})`,
              opacity: currentBg === i ? 1 : 0,
              zIndex: currentBg === i ? 0 : -1,
              backgroundSize: 'cover',
              backgroundPosition: 'center 25%',
              willChange: 'opacity', // Performance hint
            }}
          />
        ))}
      </div>

      {/* ✨ Simplified Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/60 z-1"></div>

      {/* 💖 Reduced number of animated elements */}
      {heartPositions.map((pos, i) => (
        <FlyingHeart key={i} pos={pos} index={i} />
      ))}

      {/* ✨ Reduced sparkles */}
      {[...Array(3)].map((_, i) => (
        <Sparkle key={i} index={i} />
      ))}

      {/* Main Content with reduced effects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md mx-auto space-y-4 bg-black/30 rounded-2xl p-4 border border-white/10 shadow-lg"
      >
        
        {/* 💫 Title Section */}
        <div className="mb-3">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl text-yellow-200 font-bold mb-2"
          >
            ليلة من العمر
          </motion.h1>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }} // Slower rotation
            className="text-xl text-yellow-100"
          >
            💫
          </motion.div>
        </div>

        {/* 🌟 Simple Divider */}
        <div className="h-0.5 bg-gradient-to-r from-yellow-200 via-pink-300 to-yellow-200 rounded-full w-28 mx-auto my-2"></div>

        {/* 💍 Couple Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-black/40 p-3 rounded-lg border border-white/10"
        >
          <h2 className="text-xl md:text-2xl text-white font-semibold mb-2">
            <span className="text-yellow-200 block mb-1">العراق</span>
            
            <motion.div
              className="text-xl my-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }} // Slower animation
            >
              ❤️
            </motion.div>
            
            <span className="text-pink-200 block mt-1">الكويت</span>
          </h2>
          
          <p className="text-white/80 text-sm mt-2 leading-relaxed">
            بالحب جمعنا الله، وبالعمر جمعنا القدر 💍
          </p>
        </motion.div>

        {/* 📅 Date & Place */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-black/40 p-3 rounded-lg border border-yellow-300/20"
        >
          <div className="text-lg md:text-xl font-semibold text-yellow-200 mb-1">
            الجمعة، ١٢ أكتوبر ٢٠٢٥
          </div>
          <div className="text-sm md:text-base text-white/80 flex items-center justify-center gap-1">
            <span>🏰</span>
            البصرة - قاعة ألف ليلة وليلة
            <span>✨</span>
          </div>
        </motion.div>

        {/* 💞 Central Heart with simpler animation */}
        <motion.div
          className="my-3"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 3, // Slower animation
            repeat: Infinity,
          }}
        >
          <FaHeart className="text-5xl text-rose-400 mx-auto" />
        </motion.div>

        {/* 🌙 Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="bg-black/40 p-3 rounded-lg border border-white/10"
        >
          <p className="text-sm text-white/90 leading-loose">
            "في هذه الليلة المباركة، نحتفل بالحب، بالفرح، وباللحظة التي تبدأ فيها
            أجمل الحكايات... حكايتنا نحن."
          </p>
          <div className="text-lg mt-2 text-yellow-200">🌙</div>
        </motion.div>

      </motion.div>

      {/* 💌 RSVP Button */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-rose-500 to-yellow-400 text-white px-5 py-2 rounded-full shadow-lg z-20 border border-yellow-300 font-semibold text-sm w-40"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        💌 تأكيد الحضور
      </motion.button>

      {/* 🌷 Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-4 mb-20 text-white/80 text-xs z-10 text-center"
      >
        بكل الحب، ندعوكم لمشاركتنا فرحتنا 💐
      </motion.div>

      {/* 💌 RSVP Modal */}
      <RSVPModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}