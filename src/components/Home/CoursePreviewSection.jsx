import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';

const CoursePreviewSection = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/data/courses.json')
      .then((res) => res.json())
      .then((data) => setCourses(data.slice(0, 8))) // limit to 8
      .catch((err) => console.error('Error loading courses:', err));
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
    <section className="py-8 sm:py-12 lg:py-16 bg-[--main-bg]">
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#D81BFF] [text-shadow:0_0_20px_rgba(216,27,255,0.4)] text-center mb-8 sm:mb-12">
          Launch Your Learning Quest
        </h2>

        {/* Horizontal scroll section */}
        {courses.length === 0 ? (
          <p className="text-center text-[var(--white-smoke)] opacity-70">Loading courses...</p>
        ) : (
          <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4">
            {courses.map((course, index) => (
              <div
                  key={course.id}
                  className="relative min-w-[280px] max-w-[280px] h-[370px] flex-shrink-0 
                            border-2 border-[var(--acid-green)] shadow-[0_0_12px_var(--green-glow)] 
                            rounded-lg p-1 flex"
                >
                  <CourseCard course={course} index={index} className="h-full w-full" />

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

        {/* Explore Button */}
        <div className="text-center mt-8">
          <Link
            to="/courses"
            className="px-6 py-3 bg-gradient-to-r from-[#D81BFF] to-[#00E4FF] text-[var(--white-smoke)] rounded-full font-extrabold hover:shadow-[0_0_20px_rgba(216,27,255,0.4)] transition-all duration-300"
          >
            Explore Courses Now
          </Link>
          <p className="text-sm text-[var(--white-smoke)] opacity-80 mt-2">
            Try for Free with a 15-Day Trial!
          </p>
        </div>
      </div>
    </section>
  );
};

export default CoursePreviewSection;
