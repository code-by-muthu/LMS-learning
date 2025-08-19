import React from 'react';
import { Link } from 'react-router-dom';

const ErrorLearningSection = () => {
  const sampleErrors = [
    { title: 'TypeError: null is not an object', description: 'JavaScript error. Learn to add null checks in our course.' },
    { title: 'ModuleNotFoundError: pandas', description: 'Python error. Master installing dependencies like `pip install pandas`.' },
    { title: 'SyntaxError: Unexpected token', description: 'JavaScript error. Understand proper syntax and debugging techniques.' },
    { title: 'KeyError: column_name', description: 'Python error. Learn to handle missing dictionary keys effectively.' },
  ];

  return (
    <section className="py-5 sm:py-3 lg:py-3 mb-5 bg-gradient-to-b from-[var(--dark-charcoal)] to-[var(--main-bg)] bg-cover bg-center relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-4 md:px-4 lg:px-6 max-w-5xl lg:max-w-6xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_20px_var(--pink-glow)] text-center mb-8 sm:mb-9 lg:mb-12 animate-fade-in-up">
          Master Error Handling with Our Course
        </h2>
        <div className="relative flex flex-row md:flex-nowrap justify-start items-stretch gap-4 sm:gap-4 md:gap-4 lg:gap-8 overflow-x-auto no-scrollbar">
          <div className="absolute top-1/2 w-full h-1 bg-[var(--neon-purple)] shadow-[0_0_12px_var(--pink-glow)] hidden md:block"></div>
          {sampleErrors.map((error, index) => (
            <div
              key={index}
              className="relative w-64 sm:w-64 md:w-56 lg:w-72 bg-[var(--dark-charcoal)] p-5 rounded-xl border-2 border-[var(--aqua-glow)] shadow-[0_0_15px_var(--blue-glow)] hover:shadow-[0_0_30px_var(--blue-glow)] transition-all duration-300 transform hover:-translate-y-[2px] animate-fade-in-up min-h-[180px] flex flex-col justify-between text-center flex-shrink-0"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-5 h-5 rounded-full bg-[var(--acid-green)] shadow-[0_0_12px_var(--green-glow)] animate-pulse"></div>
                <h3 className="text-xl font-bold text-[var(--white-smoke)] [text-shadow:0_0_8px_var(--blue-glow)] mb-2">{error.title}</h3>
                <p className="text-base text-[var(--white-smoke)] opacity-85 leading-relaxed mb-3">{error.description}</p>
              </div>
              <div className="flex justify-center">
                <Link
                  to="/error-learning-course"
                  className="inline-block text-[var(--neon-pink)] font-semibold text-lg hover:text-[var(--aqua-glow)] hover:[text-shadow:0_0_12px_var(--pink-glow)] transition-all duration-300"
                >
                  Explore Course
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 mx-auto max-w-md">
          <Link
            to="/error-learning-course"
            className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--electric-blue)] text-[var(--white-smoke)] rounded-full font-semibold text-sm sm:text-base lg:text-lg hover:shadow-[0_0_25px_var(--pink-glow)] transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
          >
            Enroll in Error Handling Course
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorLearningSection;