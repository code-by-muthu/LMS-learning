import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--electric-blue)] relative overflow-hidden">
      
      <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_20px_var(--pink-glow)] mb-4 animate-fade-in-up">
          Start Your Learning Journey
        </h2>
        <p className="text-lg text-[var(--white-smoke)] opacity-80 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Join thousands of learners with our 15-day free trial.
        </p>
        <Link
          to="/signup"
          className="px-6 py-3 bg-[var(--dark-charcoal)] text-[var(--aqua-glow)] rounded-full font-semibold border-2 border-[var(--neon-purple)] shadow-[0_0_15px_var(--blue-glow)] hover:shadow-[0_0_25px_var(--blue-glow)] transition-all duration-300 animate-pulse-step"
        >
          Get Started Now
        </Link>
      </div>
    </section>
  );
};

export default CTASection;