import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  initialLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleLike}
          className={`relative z-10 flex items-center gap-3 px-8 py-4 rounded-full shadow-xl transition-all duration-300 ${
            isLiked 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-transparent' 
              : 'bg-white text-ja-blue border border-ja-blue/20 hover:border-ja-blue'
          }`}
        >
          <Heart 
            className={`w-6 h-6 ${isLiked ? 'fill-white' : ''}`} 
          />
          <span className="font-bold text-lg">为我们点赞</span>
        </motion.button>

        {/* Particle Effects */}
        <AnimatePresence>
          {isLiked && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 0, 
                    scale: 1.5, 
                    x: (Math.random() - 0.5) * 100, 
                    y: -100 - Math.random() * 50 
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute top-0 left-1/2 w-4 h-4 text-red-500 pointer-events-none"
                >
                  <Heart className="w-full h-full fill-red-500" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
      
      <p className="mt-4 text-slate-400 text-sm font-medium">
        {likes.toLocaleString()} 人支持了这个项目
      </p>
    </div>
  );
};

export default LikeButton;