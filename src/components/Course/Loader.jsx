import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[var(--main-bg)] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[var(--neon-pink)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;