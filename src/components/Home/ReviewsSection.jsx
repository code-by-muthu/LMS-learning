import React from 'react';
import { motion } from 'framer-motion';
import ReviewCard from './ReviewCard'; // Adjust the path based on your project structure

const ReviewsSection = () => {
  const sampleReviews = [
    {
      id: 1,
      userName: 'John Doe',
      courseName: 'Error Handling Course',
      rating: 5,
      review: 'This course transformed how I debug my code. The step-by-step approach and real-world examples made complex debugging concepts accessible and practical. Highly recommended for developers at all levels!',
      profileImage: 'https://via.placeholder.com/40?text=JD'
    },
    {
      id: 2,
      userName: 'Jane Smith',
      courseName: 'Python Basics',
      rating: 4,
      review: 'Great content, but could use more advanced examples.',
      profileImage: 'https://via.placeholder.com/40?text=JS'
    },
    {
      id: 3,
      userName: 'Alex Johnson',
      courseName: 'JavaScript Mastery',
      rating: 5,
      review: 'Excellent explanations and practical exercises.',
      profileImage: 'https://via.placeholder.com/40?text=AJ'
    },
      {
      id: 3,
      userName: 'Alex Johnson',
      courseName: 'JavaScript Mastery',
      rating: 5,
      review: 'Excellent explanations and practical exercises.',
      profileImage: 'https://via.placeholder.com/40?text=AJ'
    },
      {
      id: 3,
      userName: 'Alex Johnson',
      courseName: 'JavaScript Mastery',
      rating: 5,
      review: 'Excellent explanations and practical exercises.',
      profileImage: 'https://via.placeholder.com/40?text=AJ'
    },
    {
      id: 4,
      userName: 'Emily Brown',
      courseName: 'Data Science Essentials',
      rating: 4,
      review: 'Very informative, helped me a lot in my projects.',
      profileImage: 'https://via.placeholder.com/40?text=EB'
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <motion.section
      className="py-5 bg-[var(--main-bg)] relative overflow-x-hidden overflow-y-hidden max-w-full min-w-0"
      style={{ maxWidth: '100vw', maxHeight: '600px' }}
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-x;
          }
          .scroll-container {
            position: relative;
            scroll-behavior: smooth;
            overscroll-behavior-x: contain;
            min-width: 0;
            max-width: 100%;
            box-sizing: border-box;
            box-shadow: -10px 0 15px rgba(255, 0, 255, 0.2), 10px 0 15px rgba(0, 255, 229, 0.2);
          }
          .bg-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(155, 89, 255, 0.2) 0%, rgba(0, 255, 229, 0.2) 100%);
            z-index: 0;
          }
        `}
      </style>
      <div className="bg-overlay" />
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--neon-purple)_0%,_transparent_70%)] z-0 opacity-30"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-4 md:px-4 lg:px-6 max-w-7xl min-w-0">
        <motion.h2
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_20px_var(--pink-glow)] text-center mb-6 sm:mb-8 md:mb-10 tracking-[0.5px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } }}
        >
          What Our Users Say
        </motion.h2>
        <div className="scroll-container overflow-x-auto hide-scrollbar px-5 py-4">
          <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 flex-nowrap snap-x snap-mandatory min-w-0">
            {sampleReviews.map((review, index) => (
              <ReviewCard key={review.id} {...review} id={review.id} index={index} />
            ))}
            <div className="shrink-0 w-5" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ReviewsSection;