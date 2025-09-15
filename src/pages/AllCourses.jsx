import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaTrophy } from 'react-icons/fa';
import CourseCard from '../components/Home/CourseCard';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    fetch('/data/courses.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        return response.json();
      })
      .then((data) => setCourses(data.slice(0, 8)))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      gsap.fromTo(
        '.course-card',
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.label-stamp',
        { scale: 0, rotate: -30, opacity: 0 },
        {
          scale: 1,
          rotate: -12,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          delay: 0.5,
        }
      );
    }
  }, [courses]);

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
      gsap.fromTo(
        hero.querySelector('a'),
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          delay: 0.4, 
          ease: 'power2.out',
          
          keyframes: [
            { scale: 1, duration: 0.6 },
            { scale: 1.05, duration: 0.3 },
            { scale: 1, duration: 0.3 },
          ]
        }
      );
    }
  }, []);

  const getLabelStyles = (label) => {
    switch (label) {
      case 'Bestseller':
        return 'bg-[var(--neon-pink)] text-[var(--dark-charcoal)] shadow-[0_0_10px_var(--pink-glow)]';
      case 'Trending':
        return 'bg-[var(--aqua-glow)] text-[var(--dark-charcoal)] shadow-[0_0_10px_var(--aqua-glow)]';
      case 'Top Rated':
        return 'bg-[var(--cyber-yellow)] text-[var(--dark-charcoal)] shadow-[0_0_10px_var(--yellow-glow)]';
      case 'Most Popular':
        return 'bg-[var(--electric-blue)] text-[var(--white-smoke)] shadow-[0_0_10px_var(--blue-glow)]';
      default:
        return '';
    }
  };

  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-10 sm:py-14 lg:py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-purple)]/25 via-[var(--electric-blue)]/35 to-[var(--acid-green)]/25 animate-pulse"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        <div className="absolute top-12 left-12 w-20 h-20 bg-[var(--neon-pink)] rounded-full blur-[35px] opacity-25 animate-float"></div>
        <div className="absolute bottom-12 right-12 w-28 h-28 bg-[var(--electric-blue)] rounded-full blur-[45px] opacity-25 animate-float animation-delay-1000"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_15px_var(--neon-purple)] mb-3 sm:mb-4 lg:mb-5">
            Expand Your Knowledge
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--white-smoke)] opacity-85 max-w-2xl mx-auto mb-6">
            Choose from our extensive library of courses taught by industry experts and enhance your skills.
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
          <Link
            to="/categories"
            className="inline-block px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--aqua-glow)] text-[var(--dark-charcoal)] rounded-lg font-semibold text-sm sm:text-base shadow-[0_0_12px_var(--pink-glow)] hover:shadow-[0_0_20px_var(--blue-glow)] transition-all duration-300"
          >
            Explore Categories
          </Link>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-12 sm:py-8 lg:py-8 bg-[var(--main-bg)]">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_15px_var(--pink-glow)] text-center mb-8 sm:mb-10">
            Popular Courses
          </h2>
          {error ? (
            <p className="text-[var(--neon-red)] text-center">Error: {error}</p>
          ) : courses.length === 0 ? (
            <p className="text-[var(--white-smoke)] text-center">Loading courses...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="relative min-w-[280px] border-2 border-[var(--acid-green)] shadow-[0_0_12px_var(--green-glow)] rounded-lg p-1"
                >
                  <CourseCard course={course} index={index} />
                  {course.label && (
                    <div
                      className={`label-stamp absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full transform -rotate-12 ${getLabelStyles(course.label)}`}
                    >
                      {course.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllCourses;