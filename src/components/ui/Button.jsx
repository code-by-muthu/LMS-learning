import React from 'react';

const Button = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-full font-semibold transition-all duration-300';
  const variantStyles = {
    primary: 'bg-[var(--neon-purple)] text-[var(--white-smoke)] hover:bg-[var(--aqua-glow)] hover:shadow-[0_0_15px_var(--blue-glow)]',
    secondary: 'bg-[var(--dark-charcoal)] text-[var(--aqua-glow)] border-2 border-[var(--neon-purple)] hover:shadow-[0_0_15px_var(--blue-glow)]',
    ghost: 'text-[var(--aqua-glow)] hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)]',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;