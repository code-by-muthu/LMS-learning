
import React from 'react';
 
function QuickActions() {
  const actions = [
    {
      name: 'Browse Courses',
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="var(--electric-blue)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M4 4h16v13H6.5A2.5 2.5 0 0 0 4 19.5V4z" />
        </svg>
      ),
      glowColor: 'hover:shadow-[0_0_15px_var(--blue-glow)]',
    },
    {
      name: 'Learn Error',
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="var(--acid-green)"
        >
          <path d="M10.29 3.868c1.334-2.668 4.666-2.668 6 0l5.83 11.66c1.334 2.668-.666 5.332-4 5.332H8.46c-3.334 0-5.334-2.664-4-5.332l5.83-11.66z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      ),
      glowColor: 'hover:shadow-[0_0_15px_var(--green-glow)]',
    },
    {
      name: 'Join Community',
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="var(--neon-purple)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      glowColor: 'hover:shadow-[0_0_15px_var(--neon-purple)]',
    },
    {
      name: 'Schedule Study',
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="var(--neon-red)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      glowColor: 'hover:shadow-[0_0_15px_var(--neon-red)]',
    },
  ];
 
  return (
    <div className="bg-[#0A0A23] text-[#F5F5F5] font-sans p-6 mb-20 lg:mb-5 sm:mb-20 rounded-3xl w-full lg:max-w-7xl mx-auto shadow-2xl  border border-gray-800">
      <h2 className="text-3xl font-bold ml-2 mb-1">Quick Actions</h2>
      <p className="text-gray-400 text-lg ml-2 mb-8">Shortcuts to common tasks</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`
              bg-[#1A1A1A]
              p-6 rounded-2xl
              flex flex-col items-center justify-center
              text-center transition-all duration-300
              hover:scale-105
              ${action.glowColor}
            `}
          >
            <div className="mb-4">{action.icon}</div>
            <span className="text-lg font-semibold">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
 
export default QuickActions;
 
 