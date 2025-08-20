import React from 'react';
import Button from '../ui/Button';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[var(--dark-charcoal)]/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[var(--main-bg)] p-6 rounded-lg border-2 border-[var(--neon-purple)] shadow-[0_0_20px_var(--pink-glow)] max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_10px_var(--pink-glow)]">
            {title}
          </h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;