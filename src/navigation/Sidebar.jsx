import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTimes,
  FaHome,
  FaBook,
  FaUserGraduate,
  FaTags,
  FaHeadset,
  FaFileContract,
} from 'react-icons/fa';

const Sidebar = ({ setIsSidebarOpen }) => {
  const options = [
    { name: 'Home', icon: <FaHome />, path: '/' },
    { name: 'All Courses', icon: <FaBook />, path: '/courses' },
    { name: 'My Learning', icon: <FaUserGraduate />, path: '/profile' },
    { name: 'Pricing', icon: <FaTags />, path: '/pricing' },
    { name: 'Support', icon: <FaHeadset />, path: '/support' },
    { name: 'Terms & Conditions', icon: <FaFileContract />, path: '/terms' },
  ];

  return (
    <div className="w-72 h-full bg-[var(--dark-charcoal)] shadow-[0_0_20px_var(--blue-glow)] transition-transform duration-300 transform translate-x-0 overflow-y-auto fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-b from-[var(--neon-purple)] to-transparent">
        <h2 className="text-2xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_15px_var(--blue-glow),0_0_25px_var(--blue-glow-strong)]">
          LearnSphere
        </h2>
        <button
          className="text-[var(--white-smoke)] text-xl hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_12px_var(--pink-glow)] transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTimes />
        </button>
      </div>

      <div className="flex flex-col mt-6 px-4 space-y-3">
        {options.map((option, index) => (
          <Link
            key={index}
            to={option.path}
            className="flex items-center gap-3 py-3 px-4 rounded-lg text-lg font-medium text-[var(--white-smoke)] hover:bg-gradient-to-r hover:from-[var(--neon-purple)] hover:to-[var(--electric-blue)] hover:shadow-[0_0_12px_var(--blue-glow)] hover:scale-[1.02] transition-all duration-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="text-xl">{option.icon}</span>
            <span>{option.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;