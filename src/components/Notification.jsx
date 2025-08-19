import React, { useEffect } from 'react';

const Notification = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-xs w-full">
      <div
        className={`p-4 rounded-md shadow-[0_0_15px_var(--${
          type === 'success' ? 'green-glow' : 'pink-glow'
        })] animate-fade-in-up ${
          type === 'success'
            ? 'bg-[var(--acid-green)] text-[var(--dark-charcoal)]'
            : 'bg-[var(--neon-red)] text-[var(--white-smoke)]'
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold">{message}</span>
          <button
            onClick={onClose}
            className="text-[var(--dark-charcoal)] hover:text-[var(--neon-pink)]"
            aria-label="Close notification"
          >
            <img
              src="https://img.icons8.com/material-outlined/24/close-window.png"
              alt="Close"
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;