import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12 bg-[var(--main-bg)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-2 h-2 bg-[var(--cyber-yellow)] rounded-full top-10 left-10 animate-float"></div>
        <div className="absolute w-2 h-2 bg-[var(--neon-red)] rounded-full bottom-20 right-20 animate-float animation-delay-1000"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 bg-[var(--dark-charcoal)] border-t-4 border-[var(--neon-pink)] shadow-[0_0_15px_var(--pink-glow)] animate-fade-in-up">
            <h3 className="text-lg font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_8px_var(--pink-glow)] mb-4">About LMS</h3>
            <p className="text-sm text-[var(--white-smoke)] opacity-80">
              Empowering developers with courses and community-driven learning.
            </p>
          </div>
          <div className="p-6 bg-[var(--dark-charcoal)] border-t-4 border-[var(--acid-green)] shadow-[0_0_15px_var(--green-glow)] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_8px_var(--green-glow)] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/courses"
                  className="text-[var(--white-smoke)] hover:text-[var(--aqua-glow)] hover:[text-shadow:0_0_10px_var(--blue-glow)] transition-all duration-300"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/error-learning"
                  className="text-[var(--white-smoke)] hover:text-[var(--aqua-glow)] hover:[text-shadow:0_0_10px_var(--blue-glow)] transition-all duration-300"
                >
                  Error Learning
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[var(--white-smoke)] hover:text-[var(--aqua-glow)] hover:[text-shadow:0_0_10px_var(--blue-glow)] transition-all duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[var(--white-smoke)] hover:text-[var(--aqua-glow)] hover:[text-shadow:0_0_10px_var(--blue-glow)] transition-all duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-[var(--dark-charcoal)] border-t-4 border-[var(--hot-orange)] shadow-[0_0_15px_var(--green-glow)] animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <h3 className="text-lg font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_8px_var(--pink-glow)] mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                className="text-[var(--white-smoke)] hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                className="text-[var(--white-smoke)] hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="p-6 bg-[var(--dark-charcoal)] border-t-4 border-[var(--aqua-glow)] shadow-[0_0_15px_var(--blue-glow)] animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <h3 className="text-lg font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_8px_var(--blue-glow)] mb-4">Contact Us</h3>
            <p className="text-sm text-[var(--white-smoke)] opacity-80">Email: support@lmsplatform.com</p>
            <p className="text-sm text-[var(--white-smoke)] opacity-80">Phone: +1 (800) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 text-center text-[var(--white-smoke)] opacity-80 animate-fade-in-up">
          <p>&copy; {new Date().getFullYear()} LMS Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;