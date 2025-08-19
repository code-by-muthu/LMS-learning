import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const CTASection = () => {
  const particleRefs = useRef([]);
  const cardRef = useRef(null);

  useEffect(() => {
    // Particle animation
    particleRefs.current.forEach((particle, index) => {
      gsap.to(particle, {
        x: () => Math.random() * 100 - 50,
        y: () => Math.random() * 100 - 50,
        scale: () => Math.random() * 0.5 + 0.5,
        opacity: () => Math.random() * 0.3 + 0.3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
      });
    });

    // 3D tilt effect for card
    const card = cardRef.current;
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(card, {
        rotationY: x * 0.05,
        rotationX: -y * 0.05,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="bg-[var(--main-bg)] w-full p-2 sm:p-4 relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(155,89,255,0.2)_0%,_rgba(0,255,245,0.1)_50%,_transparent_70%)] pointer-events-none"></div>
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (particleRefs.current[i] = el)}
            className="absolute w-2 h-2 bg-[var(--neon-pink)] rounded-full"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              boxShadow: `0 0 8px var(--pink-glow)`,
            }}
          ></div>
        ))}
      </div>
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_20px_var(--blue-glow)] py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 w-full">
          {/* Left: Text and Buttons */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_15px_var(--blue-glow)] leading-tight animate-fade-in-up">
              <span className="text-[var(--neon-pink)]">Code</span> Your Future
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[var(--white-smoke)] opacity-85 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Join a vibrant community to master coding with expert-led courses, error-solving forums, and shareable certificates. Start with a 15-day free trial!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                to="/signup"
                className="relative px-5 py-2 bg-[var(--electric-blue)] text-[var(--dark-charcoal)] rounded-full font-semibold text-sm sm:text-base shadow-[0_0_15px_var(--blue-glow)] hover:shadow-[0_0_30px_var(--blue-glow)] transition-all duration-300 animate-pulse-step overflow-hidden"
              >
                <span className="relative z-10">Begin Your Quest</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--acid-green)] opacity-0 hover:opacity-40 rounded-full transition-opacity duration-500"></div>
              </Link>
              <Link
                to="/courses"
                className="px-5 py-2 bg-transparent text-[var(--neon-purple)] rounded-full font-semibold text-sm sm:text-base border-2 border-[var(--neon-purple)] shadow-[0_0_8px_var(--pink-glow)] hover:text-[var(--aqua-glow)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300"
              >
                View All Courses
              </Link>
            </div>
          </div>
          {/* Right: 3D Tilt Card */}
          <div
            ref={cardRef}
            className="relative bg-[var(--dark-charcoal)] p-4 sm:p-6 rounded-xl border-t-4 border-[var(--acid-green)] shadow-[0_0_15px_var(--green-glow)] hover:shadow-[0_0_25px_var(--green-glow)] transition-all duration-300 w-full max-w-sm"
            style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--acid-green)] to-[var(--neon-pink)]"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--green-glow)] rounded-full opacity-40 animate-pulse" style={{ filter: 'blur(8px)' }}></div>
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-3xl sm:text-4xl text-[var(--acid-green)] [text-shadow:0_0_10px_var(--green-glow)] animate-pulse-step">🌟</span>
              <h3 className="text-base sm:text-lg font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_8px_var(--green-glow)]">Level Up Your Skills</h3>
              <p className="text-xs sm:text-sm text-[var(--white-smoke)] opacity-80">Collaborate globally to debug, learn, and earn certifications.</p>
              <Link
                to="/error-learning"
                className="px-4 py-2 bg-[var(--neon-pink)] text-[var(--dark-charcoal)] rounded-full font-semibold text-xs sm:text-sm hover:bg-[var(--aqua-glow)] hover:shadow-[0_0_12px_var(--blue-glow)] transition-all duration-300"
              >
                Debug with Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;