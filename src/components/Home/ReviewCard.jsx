import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ReviewCard = ({ userName, courseName, rating, review, profileImage, id, index }) => {
  const [expanded, setExpanded] = useState(false);
  const isLongReview = review.length > 100;

  const cardVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateZ: index % 2 === 0 ? -5 : 5 },
    visible: {
      opacity: 1,
      x: 0,
      rotateZ: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: index * 0.15 }
    },
    animate: {
      rotateZ: [-2, 2, -2],
      boxShadow: [
        '0 0 20px var(--neon-pink), 0 0 20px var(--aqua-glow)',
        '0 0 40px var(--neon-pink), 0 0 40px var(--aqua-glow)',
        '0 0 20px var(--neon-pink), 0 0 20px var(--aqua-glow)'
      ],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  const imageVariants = {
    hidden: { scale: 0, rotate: -10 },
    visible: { scale: 1, rotate: 0, transition: { duration: 0.5, delay: 0.2 } },
    animate: { scale: [1, 1.1, 1], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }
  };

  const starVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({ scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.3 + i * 0.1 } }),
    animate: (i) => ({ scale: [1, 1.3, 1], transition: { duration: 2, repeat: Infinity, delay: i * 0.2 } })
  };

  const linkVariants = {
    rest: { y: 0, opacity: 0.8 },
    animate: {
      y: [0, -3, 0],
      opacity: [0.8, 1, 0.8],
      color: ['var(--neon-pink)', 'var(--aqua-glow)', 'var(--neon-pink)'],
      transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  return (
    <motion.div
      className="min-w-[220px] sm:min-w-[240px] md:min-w-[260px] lg:min-w-[280px] xl:min-w-[300px] bg-[var(--dark-charcoal)] p-5 rounded-full flex flex-col items-center justify-center snap-center"
      style={{ clipPath: 'ellipse(50% 55% at 50% 50%)', willChange: 'transform, opacity, box-shadow' }}
      variants={cardVariants}
      initial="hidden"
      animate={['visible', 'animate']}
    >
      <div className="flex flex-col items-center mb-3">
        <motion.img
          src={profileImage || 'https://via.placeholder.com/40'}
          alt={`${userName} profile`}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-[var(--neon-pink)] shadow-[0_0_8px_var(--pink-glow)] mb-2"
          variants={imageVariants}
          initial="hidden"
          animate={['visible', 'animate']}
        />
        <h4 className="text-sm sm:text-base md:text-lg font-bold text-[var(--white-smoke)] [text-shadow:0_0_6px_var(--blue-glow)] tracking-[0.5px]">{userName}</h4>
        <p className="text-xs sm:text-sm text-[var(--neon-pink)] opacity-85 tracking-[0.5px]">{courseName}</p>
      </div>
      <div className="flex justify-center mb-2">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className={`text-base sm:text-lg md:text-xl ${i < rating ? 'text-[var(--cyber-yellow)] [text-shadow:0_0_4px_var(--yellow-glow)]' : 'text-[var(--dark-charcoal)] opacity-50'}`}
            variants={starVariants}
            initial="hidden"
            animate={['visible', 'animate']}
            custom={i}
          >
            ★
          </motion.span>
        ))}
      </div>
      <p className="text-xs sm:text-sm md:text-base text-[var(--white-smoke)] opacity-85 leading-tight text-center tracking-[0.5px] line-clamp-3">
        {isLongReview && !expanded ? `${review.slice(0, 100)}...` : review}
      </p>
      {isLongReview && !expanded && (
        <motion.div
          variants={linkVariants}
          initial="rest"
          animate="animate"
        >
          <Link to={`/review/${id}`} className="text-[var(--neon-pink)] text-xs mt-2 tracking-[0.5px]">
            Read More
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ReviewCard;