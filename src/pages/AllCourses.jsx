import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import CourseCard from '../components/Home/CourseCard';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

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
      {/* Hero Section */}
<section className="
  relative 
  bg-[var(--dark-charcoal)] 
  flex flex-col items-center justify-center 
  overflow-hidden
  py-12 sm:py-16 lg:py-20 
  min-h-auto sm:min-h-[75vh] lg:min-h-[85vh]
">
  {/* Background Gradient Animation */}
  <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark-charcoal)] via-[var(--main-bg)] to-[var(--dark-charcoal)]"></div>
  <div className="absolute inset-0 opacity-30">
    {/* Top Glow */}
    <div className="
      absolute -top-24 sm:-top-36 left-1/2 -translate-x-1/2 
      w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] 
      bg-gradient-to-r from-[var(--neon-pink)] to-[var(--electric-blue)] 
      rounded-full 
      blur-[80px] sm:blur-[120px] lg:blur-[150px] 
      animate-pulse
    "></div>

    {/* Bottom Glow */}
    <div className="
      absolute bottom-0 right-1/4 
      w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] 
      bg-[var(--aqua-glow)] 
      rounded-full 
      blur-[70px] sm:blur-[100px] lg:blur-[120px] 
      animate-pulse delay-700
    "></div>
  </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
    <h1 className="
      text-3xl sm:text-5xl lg:text-6xl 
      font-extrabold 
      leading-snug sm:leading-tight lg:leading-tight 
      text-transparent bg-clip-text 
      bg-gradient-to-r from-[var(--neon-pink)] via-[var(--electric-blue)] to-[var(--aqua-glow)] 
      drop-shadow-[0_0_30px_rgba(255,45,85,0.7)] 
      mb-4 sm:mb-6
    ">
      Learn Smarter.<br className="hidden sm:block" />
      Build Faster. Achieve More.
    </h1>

    <p className="
      text-base sm:text-lg md:text-xl lg:text-2xl 
      text-[var(--white-smoke)] opacity-90 
      mb-6 sm:mb-8 lg:mb-10 
      max-w-md sm:max-w-2xl mx-auto px-2 sm:px-0
    ">
      Explore cutting-edge courses and solve real-world coding errors with ease.  
      Your tech journey starts today.
    </p>

    <Link
      to="/categories"
      className="
        px-5 py-3 sm:px-7 sm:py-3 md:px-8 md:py-4 
        bg-gradient-to-r from-[var(--neon-pink)] to-[var(--electric-blue)] 
        text-[var(--white-smoke)] 
        rounded-full font-bold 
        text-base sm:text-lg 
        shadow-[0_0_15px_var(--pink-glow)] 
        hover:scale-105 hover:shadow-[0_0_25px_var(--blue-glow)] 
        transition-transform duration-300
      "
    >
      Explore Categories
    </Link>
  </div>
</section>




      {/* Popular Courses Section */}
      <section className="py-12 sm:py-16 bg-[var(--main-bg)]">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_15px_var(--pink-glow)] text-center mb-8 sm:mb-12">
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
