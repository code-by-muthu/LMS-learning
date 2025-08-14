import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewsSection = () => {
  const sampleReviews = [
    {
      userName: 'John Doe',
      courseName: 'Error Handling Course',
      rating: 5,
      review: 'This course transformed how I debug my code. Highly recommended!',
      profileImage: 'https://via.placeholder.com/40?text=JD'
    },
    {
      userName: 'Jane Smith',
      courseName: 'Python Basics',
      rating: 4,
      review: 'Great content, but could use more advanced examples.',
      profileImage: 'https://via.placeholder.com/40?text=JS'
    },
    {
      userName: 'Alex Johnson',
      courseName: 'JavaScript Mastery',
      rating: 5,
      review: 'Excellent explanations and practical exercises.',
      profileImage: 'https://via.placeholder.com/40?text=AJ'
    },
    {
      userName: 'Emily Brown',
      courseName: 'Data Science Essentials',
      rating: 4,
      review: 'Very informative, helped me a lot in my projects.',
      profileImage: 'https://via.placeholder.com/40?text=EB'
    },
  ];

  return (                                                                                                                              
    <section className="py-5  bg-gradient-to-b from-[var(--dark-charcoal)] via-[var(--neon-purple)] to-[var(--main-bg)] relative">
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; -webkit-overflow-scrolling: touch; touch-action: pan-x; }
          .bg-glow::before {
            content: ''; position: absolute; top: 15%; left: 10%;
            width: 150px; height: 150px;
            background: radial-gradient(circle, var(--electric-blue) 10%, transparent 70%);
            opacity: 0.3; filter: blur(40px); z-index: 0; animation: float 8s infinite ease-in-out;
          }
          .bg-glow::after {
            content: ''; position: absolute; bottom: 15%; right: 10%;
            width: 120px; height: 120px;
            background: radial-gradient(circle, var(--aqua-glow) 10%, transparent 70%);
            opacity: 0.3; filter: blur(30px); z-index: 0; animation: float 8s infinite ease-in-out 1s;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}
      </style>

      <div className="relative z-10 bg-glow">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--neon-pink)] text-center mb-6 sm:mb-8 md:mb-10 tracking-tight animate-float">
          What Our Users Say
        </h2>

        {/* Full-width horizontal scroll with hidden scrollbar & 5px padding */}
        <div className="w-screen -mx-[calc((100vw-100%)/2)]">
          <div className="overflow-x-auto hide-scrollbar px-5">
            <div className="flex gap-3 xs:gap-4 sm:gap-6 md:gap-8 flex-nowrap snap-x snap-mandatory">
              {sampleReviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
              <div className="shrink-0 w-5" /> {/* right edge space */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
