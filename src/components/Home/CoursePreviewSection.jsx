
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';
import aiImage from '../../assets/images/AI.png';
import cloudImage from '../../assets/images/Cloud.png';
import cybersecurityImage from '../../assets/images/Cybersecurity.png';
import javaScriptImage from '../../assets/images/JavaScript.png';
import nodejsImage from '../../assets/images/Node-js.png';
import pythonImage from '../../assets/images/Python.png';
import reactImage from '../../assets/images/React.png';
import webdevImage from '../../assets/images/web-dev.png';


const CoursePreviewSection = () => {
  const dummyCourses = [
    { id: "1", title: "JavaScript Basics", level: "Beginner", img: javaScriptImage },
    { id: "2", title: "Python Essentials", level: "Intermediate", img: pythonImage },
    { id: "3", title: "Web Dev 101", level: "All Levels", img: webdevImage },
    { id: "4", title: "React Fundamentals", level: "Advanced", img: reactImage},
    { id: "5", title: "Node.js Crash Course", level: "Intermediate", img: nodejsImage},
    { id: "6", title: "AI Introduction", level: "Advanced", img: aiImage },
    { id: "7", title: "Cloud Essentials", level: "Beginner", img: cloudImage },
    { id: "8", title: "Cybersecurity Intro", level: "All Levels", img: cybersecurityImage },
  ];
 
  useEffect(() => {
    gsap.fromTo(
      '.course-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <section className="py-2 sm:py-8 lg:py-2 bg-[--main-bg]">
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
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#D81BFF] [text-shadow:0_0_20px_rgba(216,27,255,0.4)] text-center mb-5 sm:mb-3 md-mb-5 lg:mb-5 ">
          Launch Your Learning Quest
        </h2>
        <div className="flex overflow-x-auto hide-scrollbar py-4 sm:py-0  lg:p-4 gap-6 ">
          {dummyCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
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
