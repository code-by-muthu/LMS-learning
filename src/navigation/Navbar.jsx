import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaBars, FaSearch, FaUserCircle, FaHeart, FaBell, FaHome, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    // Fetch course and error categories
    Promise.all([
      fetch('/data/courses.json').then((res) => res.json()),
      fetch('/data/errorCategories.json').then((res) => res.json())
    ])
      .then(([courseData, errorData]) => {
        const courseCategories = [...new Set(courseData.map((course) => course.category))].map((name, index) => ({
          id: `c${index + 1}`,
          name,
        }));
        const errorCategories = errorData.map((category) => ({
          id: category.id,
          name: category.name,
        }));
        setCategories([...courseCategories, ...errorCategories]);
      })
      .catch((err) => console.error('Failed to fetch categories:', err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      const results = categories.map((cat) => cat.name).filter((name) => name.toLowerCase().includes(query));
      setFilteredCourses(results);
    } else {
      setFilteredCourses([]);
    }
  };

  return (
    <div className="bg-[var(--main-bg)] p-2 sm:p-4 w-full relative">
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-40"></div>
      )}
      <nav className="flex items-center justify-between w-full p-2 bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_20px_var(--blue-glow)] z-50 relative">
        <div className="flex items-center justify-between w-full md:hidden">
          <button
            className="text-[var(--white-smoke)] text-lg p-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars className="text-2xl" />
          </button>
          <div className="text-xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_10px_var(--blue-glow)] mx-2">
            LearnError
          </div>
          <div className="flex items-center w-1/2 p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus-within:shadow-[0_0_15px_var(--pink-glow)]">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-transparent text-[var(--white-smoke)] text-base focus:outline-none placeholder-[var(--white-smoke)]"
            />
            <FaSearch className="text-[var(--white-smoke)] ml-2 text-base" />
          </div>
          <Link
            to="/notifications"
            className="text-[var(--white-smoke)] text-lg p-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
          >
            <FaBell className="text-2xl" />
          </Link>
        </div>
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center">
            <button
              className="text-[var(--white-smoke)] text-lg p-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars className="text-2xl" />
            </button>
            <div className="text-xl sm:text-2xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_10px_var(--blue-glow)] mx-2">
              LearnError
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center text-[var(--white-smoke)] text-base px-4 py-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Categories
                <FaChevronDown className="ml-1 text-[var(--white-smoke)] hover:text-[var(--neon-pink)]" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 bg-[var(--dark-charcoal)] rounded-md p-2 w-48 shadow-[0_0_15px_var(--blue-glow)] z-10">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${encodeURIComponent(category.name)}`}
                      className="block px-2 py-1 text-[var(--white-smoke)] text-base hover:bg-[var(--neon-purple)] hover:text-[var(--white-smoke)] rounded-md transition-all duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center mx-4 w-1/4">
            <div className="flex items-center w-full p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus-within:shadow-[0_0_15px_var(--pink-glow)]">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-transparent text-[var(--white-smoke)] text-base focus:outline-none placeholder-[var(--white-smoke)]"
              />
              <FaSearch className="text-[var(--white-smoke)] ml-2 text-base" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/courses"
              className="text-[var(--white-smoke)] text-base px-4 py-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
            >
              All Courses
            </Link>
            <Link
              to="/wishlist"
              className="text-[var(--white-smoke)] text-lg p-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
            >
              <FaHeart className="text-2xl" />
            </Link>
            <Link
              to="/signin"
              className="px-4 py-2 bg-[var(--neon-purple)] text-[var(--white-smoke)] rounded-md text-base hover:bg-[var(--soft-violet)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/notifications"
              className="text-[var(--white-smoke)] text-lg p-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
            >
              <FaBell className="text-2xl" />
            </Link>
            <Link
              to="/profile"
              className="text-[var(--white-smoke)] text-lg p-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
            >
              <FaUserCircle className="text-2xl" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--dark-charcoal)] p-2 flex justify-around items-center shadow-[0_0_20px_var(--blue-glow)] z-50">
        <Link
          to="/"
          className="text-[var(--white-smoke)] text-lg p-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
        >
          <FaHome className="text-2xl" />
        </Link>
        <Link
          to="/search"
          className="text-[var(--white-smoke)] text-lg p-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
        >
          <FaSearch className="text-2xl" />
        </Link>
        <Link
          to="/courses"
          className="flex flex-col items-center text-[var(--white-smoke)] text-sm p-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
        >
          <FaBook className="text-2xl mb-1" />
          <span>All Courses</span>
        </Link>
        <Link
          to="/wishlist"
          className="text-[var(--white-smoke)] text-lg p-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
        >
          <FaHeart className="text-2xl" />
        </Link>
        <Link
          to="/profile"
          className="text-[var(--white-smoke)] text-lg p-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
        >
          <FaUserCircle className="text-2xl" />
        </Link>
      </div>
      {isSidebarOpen && (
        <div ref={sidebarRef} className="fixed top-0 left-0 z-50">
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      )}
      {searchQuery && (
        <div className="w-full mx-auto mt-4 bg-[var(--dark-charcoal)] rounded-md p-2 sm:p-4 shadow-[0_0_15px_var(--blue-glow)]">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <Link
                key={index}
                to={`/category/${encodeURIComponent(course)}`}
                className="block p-2 text-[var(--white-smoke)] text-sm sm:text-base border-b border-[var(--main-bg)] hover:bg-[var(--neon-purple)]"
              >
                {course}
              </Link>
            ))
          ) : (
            <div className="p-2 text-[var(--neon-red)] text-sm sm:text-base">
              No courses found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;