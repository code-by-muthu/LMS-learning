import React from 'react';

const ReviewCard = ({ userName, courseName, rating, review, profileImage }) => {
  return (
    <div className="min-w-[300px] bg-[var(--dark-charcoal)] p-5 rounded-xl border-2 border-[var(--aqua-glow)] shadow-[0_0_15px_var(--blue-glow)] hover:shadow-[0_0_30px_var(--blue-glow)] transition-all duration-300 flex flex-col text-center">
      <div className="flex items-center justify-center mb-4">
        <img 
          src={profileImage || 'https://via.placeholder.com/40'} 
          alt={`${userName} profile`} 
          className="w-10 h-10 rounded-full mr-3 border-2 border-[var(--neon-pink)]"
        />
        <div>
          <h4 className="text-lg font-bold text-[var(--white-smoke)] [text-shadow:0_0_8px_var(--blue-glow)]">{userName}</h4>
          <p className="text-sm text-[var(--neon-pink)] opacity-85">{courseName}</p>
        </div>
      </div>
      <div className="flex justify-center mb-3">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`text-xl ${i < rating ? 'text-[var(--cyber-yellow)] [text-shadow:0_0_5px_var(--yellow-glow)]' : 'text-[var(--dark-charcoal)] opacity-50'}`}
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-base text-[var(--white-smoke)] opacity-85 leading-relaxed flex-grow">{review}</p>
    </div>
  );
};

export default ReviewCard;