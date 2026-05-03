import { motion } from 'motion/react';
import { DUCK_QUOTES } from '../constants';
import { useState, useEffect } from 'react';

export default function DuckMascot({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const [quote, setQuote] = useState(DUCK_QUOTES[0]);
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomQuote = DUCK_QUOTES[Math.floor(Math.random() * DUCK_QUOTES.length)];
      setQuote(randomQuote);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 5000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  return (
    <div className="relative inline-block group">
      {showBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-3 bg-white rounded-2xl shadow-xl border border-yellow-100 z-50 text-xs font-bold text-yellow-800 text-center"
        >
          {quote}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
        </motion.div>
      )}
      
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`${sizeClasses[size]} relative cursor-pointer`}
        onClick={() => {
          const randomQuote = DUCK_QUOTES[Math.floor(Math.random() * DUCK_QUOTES.length)];
          setQuote(randomQuote);
          setShowBubble(true);
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Main Body */}
          <circle cx="50" cy="65" r="30" fill="#FFD700" />
          {/* Head */}
          <circle cx="50" cy="35" r="22" fill="#FFD700" />
          {/* Wing Left */}
          <ellipse cx="25" cy="65" rx="10" ry="15" fill="#FFC700" transform="rotate(-10 25 65)" />
          {/* Wing Right */}
          <ellipse cx="75" cy="65" rx="10" ry="15" fill="#FFC700" transform="rotate(10 75 65)" />
          {/* Beak */}
          <path d="M 42 38 Q 50 50 58 38" fill="#FFA500" />
          <path d="M 42 38 Q 50 42 58 38" fill="#FF8C00" />
          {/* Eyes */}
          <circle cx="43" cy="32" r="2.5" fill="#333" />
          <circle cx="57" cy="32" r="2.5" fill="#333" />
          {/* Blush */}
          <circle cx="36" cy="38" r="3" fill="#FF6B6B" opacity="0.3" />
          <circle cx="64" cy="38" r="3" fill="#FF6B6B" opacity="0.3" />
        </svg>
      </motion.div>
    </div>
  );
}
