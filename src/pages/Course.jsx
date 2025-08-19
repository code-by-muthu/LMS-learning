import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import CourseCard from '../components/Home/CourseCard';

const Course = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    fetch('/data/courseContent.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch course content');
        return response.json();
      })
      .then((data) => {
        const foundCourse = data.find((c) => c.id === id);
        if (foundCourse) setCourse(foundCourse);
        else setError('Course content not found');
      })
      .catch((err) => setError(err.message));

    fetch('/data/courses.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch course details');
        return response.json();
      })
      .then((data) => {
        const foundDetails = data.find((c) => c.id === id);
        if (foundDetails) setCourseDetails(foundDetails);
        else setError('Course details not found');
      })
      .catch((err) => setError(err.message));
  }, [id]);

  useEffect(() => {
    if (course || courseDetails) {
      gsap.fromTo(
        '.course-content',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [course, courseDetails]);

  const handleStartLearning = () => {
    setIsUnlocked(true);
    console.log('Course unlocked');
  };

  const getLabelStyles = (label) => {
    switch (label) {
      case 'Bestseller': return 'bg-[var(--neon-pink)] text-[var(--dark-charcoal)] shadow-[0_0_10px_var(--pink-glow)]';
      case 'Trending': return 'bg-[var(--aqua-glow)] text-[var(--dark-charcoal)] shadow-[0_0_10px_var(--aqua-glow)]';
      case 'Top Rated': return 'bg-[var(--cyber-yellow)] text-[var(--dark-charcoal)] shadow-[0_0_10px_var(--yellow-glow)]';
      case 'Most Popular': return 'bg-[var(--electric-blue)] text-[var(--white-smoke)] shadow-[0_0_10px_var(--blue-glow)]';
      default: return '';
    }
  };

  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)]">
      <section className="relative bg-[var(--dark-charcoal)] py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-pink)]/20 to-[var(--electric-blue)]/20"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-[var(--white-smoke)] [text-shadow:0_0_20px_var(--pink-glow)] mb-6">
            {course ? course.title : 'Course Details'}
          </h1>
          <p className="text-lg sm:text-xl text-center text-[var(--white-smoke)] opacity-80 mb-8 max-w-2xl mx-auto">
            {course ? course.description : 'Learn with our structured courses.'}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[var(--main-bg)]">
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}
        </style>
        <div className="container mx-auto px-4 max-w-7xl">
          {error ? (
            <p className="text-[var(--neon-red)] text-center">Error: {error}</p>
          ) : !course || !courseDetails ? (
            <p className="text-[var(--white-smoke)] text-center">Loading course...</p>
          ) : (
            <div className="course-content">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_15px_var(--pink-glow)] mb-6 text-center">
                  Course Overview
                </h2>
                <div className="relative min-w-[280px] max-w-[280px] mx-auto">
                  <CourseCard course={courseDetails} index={0} />
                  {courseDetails.label && (
                    <div className={`label-stamp absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full transform -rotate-12 ${getLabelStyles(courseDetails.label)}`}>
                      {courseDetails.label}
                    </div>
                  )}
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_15px_var(--pink-glow)] mb-6">
                Course Content
              </h2>
              {!isUnlocked ? (
                <div className="text-center">
                  <p className="text-lg text-[var(--white-smoke)] mb-4">Unlock this course with a subscription or payment.</p>
                  <button
                    onClick={handleStartLearning}
                    className="px-6 py-3 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--electric-blue)] text-[var(--white-smoke)] rounded-full font-extrabold hover:shadow-[0_0_20px_var(--pink-glow)] transition-all duration-300"
                  >
                    Unlock Course
                  </button>
                </div>
              ) : (
                <div>
                  {course.chapters.map((chapter, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="text-2xl font-bold text-[var(--white-smoke)] mb-2">{chapter.title}</h3>
                      <ul className="list-disc pl-6 text-[var(--white-smoke)]">
                        {chapter.topics.map((topic, tIndex) => (
                          <li key={tIndex} className="mb-1">{topic.title}: {topic.content}</li>
                        ))}
                      </ul>
                      {chapter.assessment && (
                        <Link
                          to={`/assessment/${chapter.assessment.id}`}
                          className="inline-block mt-2 px-4 py-2 bg-[var(--neon-pink)] text-[var(--dark-charcoal)] rounded hover:shadow-[0_0_10px_var(--pink-glow)]"
                        >
                          Take {chapter.assessment.title}
                        </Link>
                      )}
                    </div>
                  ))}
                  <div className="mt-8 text-center">
                    <Link
                      to={`/assessment/${course.finalAssessment.id}`}
                      className="px-6 py-3 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--electric-blue)] text-[var(--white-smoke)] rounded-full font-extrabold hover:shadow-[0_0_20px_var(--pink-glow)] transition-all duration-300"
                    >
                      Take Final Assessment
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Course;