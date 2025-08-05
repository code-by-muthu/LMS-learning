import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaBars, FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const courses = [
  'React Router Error',
  'Django HTTPS Error',
  'GraphQL Query Error',
  'Webpack Bundle Error',
  'TypeScript Type Error',
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 1024
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      const results = courses.filter((course) =>
        course.toLowerCase().includes(query)
      );
      setFilteredCourses(results);
    } else {
      setFilteredCourses([]);
    }
  };

  return (
    <div className="bg-[var(--main-bg)] p-2 sm:p-4 w-full relative">
      {/* Overlay on small screen */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40"></div>
      )}

      <nav className="flex items-center justify-between w-full p-2 bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_20px_var(--blue-glow)] z-50 relative">
        <div className="flex items-center w-full sm:w-auto">
          <button
            className="text-[var(--white-smoke)] text-lg p-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars className="text-2xl" />
          </button>
          <div className="text-xl sm:text-2xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_10px_var(--blue-glow)] mx-2">
            LearnError
          </div>
        </div>

        <div className="hidden sm:flex relative" ref={dropdownRef}>
          <button
            className="flex items-center text-[var(--white-smoke)] text-base px-4 py-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Courses
            <FaChevronDown className="ml-1 text-[var(--white-smoke)] hover:text-[var(--neon-pink)]" />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 bg-[var(--dark-charcoal)] rounded-md p-2 w-48 shadow-[0_0_15px_var(--blue-glow)] z-10">
              {courses.map((course, index) => (
                <a
                  key={index}
                  href="#"
                  className="block px-2 py-1 text-[var(--white-smoke)] text-base hover:bg-[var(--neon-purple)] hover:text-[var(--white-smoke)] rounded-md transition-all duration-300"
                  onClick={(e) => e.preventDefault()}
                >
                  {course}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="flex sm:flex-1 sm:max-w-md mx-0 sm:mx-4">
          <div className="flex items-center w-full p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus-within:shadow-[0_0_15px_var(--pink-glow)]">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-transparent text-[var(--white-smoke)] text-base focus:outline-none order-1 placeholder-transparent sm:placeholder-[var(--white-smoke)]"
            />
            <FaSearch className="text-[var(--white-smoke)] ml-2 text-base sm:order-2" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-row gap-4">
            <Link
              to="/signin"
              className="px-4 py-2 bg-[var(--neon-purple)] text-[var(--white-smoke)] rounded-md text-base hover:bg-[var(--soft-violet)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-[var(--acid-green)] text-[var(--dark-charcoal)] rounded-md text-base hover:bg-[var(--cyber-yellow)] hover:shadow-[0_0_15px_var(--green-glow)] transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
          <Link
            to="/profile"
            className="text-[var(--white-smoke)] text-lg p-2 hover:text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300"
          >
            <FaUserCircle className="text-3xl" />
          </Link>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div ref={sidebarRef} className="fixed top-0 left-0 z-50">
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      )}

      {/* Search Results */}
      {searchQuery && (
        <div className="w-full mx-auto mt-4 bg-[var(--dark-charcoal)] rounded-md p-2 sm:p-4 shadow-[0_0_15px_var(--blue-glow)]">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <div
                key={index}
                className="p-2 text-[var(--white-smoke)] text-sm sm:text-base border-b border-[var(--main-bg)]"
              >
                {course}
              </div>
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
