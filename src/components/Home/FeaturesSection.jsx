import React from 'react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Comprehensive Courses',
      description: 'Master skills from beginner to advanced with expert-led tutorials.',
      icon: '📚',
      color: '--neon-purple',
      glow: '--pink-glow',
    },
    {
      title: 'Earn Certificates',
      description: 'Showcase your achievements with downloadable certificates.',
      icon: '🏆',
      color: '--acid-green',
      glow: '--green-glow',
    },
    {
      title: 'Error Community',
      description: 'Collaborate and solve coding challenges with peers.',
      icon: '💻',
      color: '--electric-blue',
      glow: '--blue-glow',
    },
  ];

  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-[var(--main-bg)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-[var(--neon-pink)] rounded-full top-6 sm:top-8 left-4 sm:left-6 animate-float"></div>
        <div className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-[var(--electric-blue)] rounded-full bottom-6 sm:bottom-8 right-4 sm:right-6 animate-float animation-delay-1000"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_20px_var(--pink-glow)] text-center mb-6 sm:mb-8 animate-fade-in-up">
          Discover Your Learning Path
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-[var(--dark-charcoal)] p-3 sm:p-4 rounded-lg border-t-4 border-[var(--${feature.color})] shadow-[0_0_15px_var(--${feature.glow})] hover:shadow-[0_0_25px_var(--${feature.glow})] transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{
                animationDelay: `${index * 200}ms`,
                clipPath: 'polygon(0 10%, 100% 0, 100% 90%, 0 100%)',
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--${feature.color})] to-[var(--neon-pink)]"></div>
              <div
                className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-[var(--${feature.glow})] rounded-full opacity-50 animate-pulse"
                style={{ filter: 'blur(8px)' }}
              ></div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <span className="text-2xl sm:text-3xl text-[var(--${feature.color})] [text-shadow:0_0_8px_var(--${feature.glow})] animate-pulse-step">
                  {feature.icon}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_8px_var(--${feature.glow})] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--white-smoke)] opacity-80">
                    {feature.description}
                  </p>
                </div>
              </div>
              <Link
                to="/courses"
                className="mt-3 sm:mt-4  flex  justify-center items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm bg-[var(--neon-pink)] text-[var(--dark-charcoal)] rounded-full font-semibold hover:bg-[var(--aqua-glow)] hover:text-[var(--dark-charcoal)] hover:shadow-[0_0_15px_var(--blue-glow)] transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;