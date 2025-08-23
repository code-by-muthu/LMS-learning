import React from 'react';

const Button = ({ variant = 'primary', children, className = '', disabled, loading, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-full font-semibold transition-all duration-300 flex items-center justify-center';
  const variantStyles = {
    primary: `bg-[var(--neon-purple)] text-[var(--white-smoke)] hover:bg-[var(--aqua-glow)] hover:shadow-[0_0_15px_var(--blue-glow)] ${
      disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
    }`,
    secondary: `bg-[var(--dark-charcoal)] text-[var(--aqua-glow)] border-2 border-[var(--neon-purple)] hover:shadow-[0_0_15px_var(--blue-glow)] ${
      disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
    }`,
    ghost: `text-[var(--aqua-glow)] hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] ${
      disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
    }`,
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-[var(--white-smoke)]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;