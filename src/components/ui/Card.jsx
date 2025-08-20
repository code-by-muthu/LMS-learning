import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_10px_var(--blue-glow)] ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;