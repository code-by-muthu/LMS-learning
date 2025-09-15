import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaBook, FaUsers, FaTrophy } from 'react-icons/fa';
import CourseCard from '../components/Home/CourseCard';
import Notification from '../components/Course/Notification';

const CategoryCourses = () => {
  const { categoryName } = useParams();
  const [courses, setCourses] = useState([]);
  const [filterLevel, setFilterLevel] = useState('All');
  const [notification, setNotification] = useState({ message: '', type: 'error' });
  const heroRef = useRef(null);
  const filterRef = useRef(null);

  // Fetch courses for this category
  useEffect(() => {
    fetch('/data/courses.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch courses');
        return response.json();
      })
      .then((data) => {
        const validCourses = data.filter(
          (course) => course.category === decodeURIComponent(categoryName) && course.level
        );
        setCourses(validCourses);
      })
      .catch((err) => setNotification({ message: err.message, type: 'error' }));
  }, [categoryName]);

  // Animation for course cards and filter buttons
  useEffect(() => {
    if (courses.length > 0) {
      gsap.fromTo(
        '.course-card',
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    }

    if (filterRef.current) {
      gsap.fromTo(
        '.filter-button',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );

      // Hover animation for filter buttons
      const buttons = filterRef.current.querySelectorAll('.filter-button');
      buttons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      });
    }
  }, [courses, filterLevel]);

  // Animation for hero section
  useEffect(() => {
    const hero = heroRef.current;
    if (hero) {
      gsap.fromTo(
        hero.querySelector('h1'),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      );
      gsap.fromTo(
        hero.querySelector('p'),
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
      );
      gsap.fromTo(
        hero.querySelectorAll('.stat-card'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  // Filter courses based on level
  const filteredCourses = filterLevel === 'All'
    ? courses
    : courses.filter((course) => course.level === filterLevel);

  // Available filter options
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)]">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'error' })}
      />
      {/* Header Section */}
      <section ref={heroRef} className="relative py-10 sm:py-14 lg:py-18 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-purple)]/25 via-[var(--electric-blue)]/35 to-[var(--acid-green)]/25 animate-pulse"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        <div className="absolute top-12 left-12 w-20 h-20 bg-[var(--neon-pink)] rounded-full blur-[35px] opacity-25 animate-float"></div>
        <div className="absolute bottom-12 right-12 w-28 h-28 bg-[var(--electric-blue)] rounded-full blur-[45px] opacity-25 animate-float animation-delay-1000"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_15px_var(--neon-purple)] mb-3 sm:mb-4 lg:mb-5">
            {decodeURIComponent(categoryName)}
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--white-smoke)] opacity-85 max-w-2xl mx-auto mb-6">
            Explore curated{" "}
            <span className="text-[var(--electric-blue)] font-semibold">Courses</span>{" "}
            tailored for your learning journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="stat-card bg-[var(--dark-charcoal)]/50 backdrop-blur-md p-4 rounded-lg shadow-[0_0_10px_var(--blue-glow)] text-center min-w-[150px]">
              <FaBook className="text-[var(--electric-blue)] text-3xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--white-smoke)]">200+</div>
              <div className="text-sm text-[var(--white-smoke)] opacity-80">Total Courses</div>
            </div>
            <div className="stat-card bg-[var(--dark-charcoal)]/50 backdrop-blur-md p-4 rounded-lg shadow-[0_0_10px_var(--green-glow)] text-center min-w-[150px]">
              <FaUsers className="text-[var(--acid-green)] text-3xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--white-smoke)]">50K+</div>
              <div className="text-sm text-[var(--white-smoke)] opacity-80">Active Learners</div>
            </div>
            <div className="stat-card bg-[var(--dark-charcoal)]/50 backdrop-blur-md p-4 rounded-lg shadow-[0_0_10px_var(--yellow-glow)] text-center min-w-[150px]">
              <FaTrophy className="text-[var(--cyber-yellow)] text-3xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--white-smoke)]">95%</div>
              <div className="text-sm text-[var(--white-smoke)] opacity-80">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Content Section */}
      <section className="py-10 sm:py-16 lg:py-8 bg-[var(--main-bg)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {notification.message ? (
            <p className="text-[var(--neon-red)] text-center text-base sm:text-lg lg:text-xl font-semibold">
              Error: {notification.message}
            </p>
          ) : (
            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_10px_var(--blue-glow)] mb-6 sm:mb-8 text-center">
                Available Courses
              </h2>
              {/* Filter Buttons */}
      <section className="py-2 bg-[var(--main-bg)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-2" ref={filterRef}>
            <div className="flex overflow-x-auto space-x-2 sm:space-x-3 p-2 rounded-lg snap-x snap-mandatory scrollbar-hide">
              {levels.map((level) => (
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
        </div>
      </section>

              {filteredCourses.length === 0 ? (
                <p className="text-[var(--white-smoke)] text-center text-base sm:text-lg">
                  No courses available for this category or level.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 justify-items-center">
                  {filteredCourses.map((course, index) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      index={index}
                      className="w-full max-w-[280px]"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

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

export default CategoryCourses;