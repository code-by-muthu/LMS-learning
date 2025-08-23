import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import CourseCard from '../components/Home/CourseCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [courses, setCourses] = useState([]);
  const [filterLevel, setFilterLevel] = useState('All');
  const [error, setError] = useState(null);
  const filterRef = useRef(null);

  // Fetch courses and filter by wishlist
  useEffect(() => {
    fetch('/data/courses.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        return response.json();
      })
      .then(data => {
        const validCourses = data.filter(course => course.id && course.title && course.level);
        const bookmarkedIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const likedCourses = validCourses.filter(course => bookmarkedIds.includes(course.id));
        setCourses(likedCourses);
      })
      .catch(err => setError(err.message));
  }, []);

  // Animation for course cards and filter buttons
  useEffect(() => {
    if (courses.length > 0) {
      gsap.fromTo(
        '.course-card-container',
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }
    if (filterRef.current) {
      gsap.fromTo(
        '.filter-button',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );

      // Hover animation for filter buttons
      const buttons = filterRef.current.querySelectorAll('.filter-button');
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }
  }, [courses, filterLevel]);

  // Filter courses based on level
  const filteredCourses = filterLevel === 'All'
    ? courses
    : courses.filter(course => course.level === filterLevel);

  // Available filter options
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)] py-12 relative">
      {/* Background Gradient and Grid Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-charcoal)]/90 to-[var(--main-bg)] opacity-95 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/neon-grid.png')] bg-repeat opacity-10"></div>
      </div>

      <div className="relative container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[var(--neon-pink)] [text-shadow:0_0_15px_var(--pink-glow)] relative">
            Your Wishlist
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-8px] w-24 h-1 bg-[var(--aqua-glow)] shadow-[0_0_8px_var(--blue-glow)]"></span>
          </h1>
          <p className="text-lg text-[var(--white-smoke)] opacity-80 mt-4">
            Your handpicked courses for your learning path.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8" ref={filterRef}>
          <div className="flex overflow-x-auto space-x-2 sm:space-x-3   p-2 rounded-lg    snap-x snap-mandatory scrollbar-hide">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`filter-button flex-shrink-0 px-3 sm:px-5 py-2 sm:py-2.5 rounded-md text-xs sm:text-base font-medium transition-all duration-300 border border-[var(--aqua-glow)] snap-center ${
                  filterLevel === level
                    ? 'bg-[var(--neon-pink)] text-[var(--dark-charcoal)] shadow-[0_0_15px_var(--pink-glow)]'
                    : 'bg-[var(--dark-charcoal)]/80 text-[var(--white-smoke)] hover:bg-[var(--aqua-glow)]/30 hover:shadow-[0_0_12px_var(--aqua-glow)]'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="text-center text-[var(--neon-red)] text-lg mb-8">
            Error: {error}
          </div>
        )}

        {/* Courses Masonry Grid */}
        {filteredCourses.length === 0 && !error ? (
          <div className="text-center text-[var(--white-smoke)] text-lg">
            No courses in your wishlist.{' '}
            <Link
              to="/courses"
              className="text-[var(--neon-pink)] hover:text-[var(--aqua-glow)] hover:[text-shadow:0_0_8px_var(--blue-glow)] transition-all duration-300"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className="course-card-container break-inside-avoid mb-6 bg-[var(--dark-charcoal)] rounded-lg p-2 shadow-[inset_0_0_8px_var(--aqua-glow)] hover:scale-[1.02] transition-all duration-300"
              >
                <CourseCard
                  course={course}
                  index={index}
                  showWishlist={true}
                  showRating={true}
                  showPrice={true}
                  showCreator={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default Wishlist;