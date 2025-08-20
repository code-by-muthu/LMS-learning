import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Notification = () => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');

  useEffect(() => {
    if (message) {
      gsap.fromTo(
        '.notification',
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const show = (msg, msgType) => { 
    setMessage(msg);
    setType(msgType);
  };

  if (!message) return null;

  return (
    <div className="notification fixed top-4 right-4 z-50">
      <div
        className={`p-4 rounded-lg shadow-[0_0_15px_var(--${
          type === 'success' ? 'green-glow' : 'pink-glow'
        })] ${
          type === 'success'
            ? 'bg-[var(--acid-green)] text-[var(--dark-charcoal)]'
            : 'bg-[var(--neon-pink)] text-[var(--white-smoke)]'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

Notification.show = (message, type) => {
  const notification = new Notification();
  notification.show(message, type);
};

export default Notification;