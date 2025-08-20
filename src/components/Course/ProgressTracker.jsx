import React from 'react';

const ProgressTracker = ({ progress }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-[var(--electric-blue)] mb-2">
        Your Progress
      </h3>
      <div className="w-full bg-[var(--dark-charcoal)] rounded-full h-2.5">
        <div
          className="bg-[var(--neon-purple)] h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-[var(--white-smoke)] opacity-80 mt-2">
        {progress}% Complete
      </p>
    </div>
  );
};

export default ProgressTracker;