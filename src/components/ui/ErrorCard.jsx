import React from 'react';
import { Link } from 'react-router-dom';

const ErrorCard = ({ error, index }) => {
  return (
    <div
      className="relative w-64 sm:w-64 md:w-56 lg:w-72 bg-[var(--dark-charcoal)] p-5 rounded-xl border-2 border-[var(--aqua-glow)] shadow-[0_0_15px_var(--blue-glow)] hover:shadow-[0_0_30px_var(--blue-glow)] transition-all duration-300 transform hover:-translate-y-[2px] min-h-[180px] flex flex-col justify-between text-center flex-shrink-0"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-5 h-5 rounded-full bg-[var(--acid-green)] shadow-[0_0_12px_var(--green-glow)] animate-pulse"></div>
        <h3 className="text-xl font-bold text-[var(--white-smoke)] [text-shadow:0_0_8px_var(--blue-glow)] mb-2">{error.title}</h3>
        <p className="text-base text-[var(--white-smoke)] opacity-85 leading-relaxed mb-3">{error.description}</p>
      </div>
      <div className="flex justify-center">
        <Link
          to={`/category/${encodeURIComponent(error.category || 'unknown')}/errors`}
          className="inline-block text-[var(--neon-pink)] font-semibold text-lg hover:text-[var(--aqua-glow)] hover:[text-shadow:0_0_12px_var(--pink-glow)] transition-all duration-300"
        >
          Explore Solution
        </Link>
      </div>
    </div>
  );
};

export default ErrorCard;