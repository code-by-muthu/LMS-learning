import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import CourseCard from '../components/Home/CourseCard';
import Notification from '../components/Course/Notification';

const CategoryCourses = () => {
  const { categoryName } = useParams();
  const [courses, setCourses] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: 'error' });

  useEffect(() => {
    // Fetch courses for this category
    fetch('/data/courses.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch courses');
        return response.json();
      })
      .then((data) =>
        setCourses(data.filter((course) => course.category === decodeURIComponent(categoryName)))
      )
      .catch((err) => setNotification({ message: err.message, type: 'error' }));
  }, [categoryName]);

  useEffect(() => {
    gsap.fromTo(
      '.course-card',
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    );
  }, [courses]);

  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)]">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'error' })}
      />
      {/* Header Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-pink)]/20 via-[var(--electric-blue)]/20 to-[var(--acid-green)]/20 animate-pulse"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--white-smoke)] mb-4 sm:mb-6 [text-shadow:0_0_20px_var(--blue-glow)]">
            {decodeURIComponent(categoryName)}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--white-smoke)] opacity-90 max-w-3xl mx-auto mb-6 sm:mb-8">
            Explore curated{" "}
            <span className="text-[var(--electric-blue)] font-semibold">Courses</span>{" "}
            tailored for your learning journey.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[var(--main-bg)]">
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
              {courses.length === 0 ? (
                <p className="text-[var(--white-smoke)] text-center text-base sm:text-lg">
                  No courses available for this category.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 justify-items-center">
                  {courses.map((course, index) => (
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
    </div>
  );
};

export default CategoryCourses;