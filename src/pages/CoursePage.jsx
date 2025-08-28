import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Notification from '../components/Course/Notification';
import { FaHeart, FaStar } from 'react-icons/fa';

const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);

  useEffect(() => {
    fetch(`/data/courses/course_${id}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch course data: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setCourse(data);
        setNotification({ message: '', type: 'success' });
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setNotification({ message: err.message, type: 'error' });
      });
  }, [id]);

  useEffect(() => {
    if (course) {
      gsap.fromTo(
        '.course-details',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.left-card',
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.right-card',
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.3 }
      );
    }
  }, [course]);

  const toggleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
    setNotification({
      message: isBookmarked ? 'Course removed from bookmarks' : 'Course bookmarked!',
      type: 'success',
    });
  };

  const isChapterCompleted = (chapterIndex) => {
    return course?.chapters[chapterIndex]?.topics.every((topic) => topic.completed);
  };

  const startCourse = () => {
    if (!course) {
      setNotification({ message: 'Course data not loaded.', type: 'error' });
      console.error('Course data is null');
      return;
    }
    if (course.price > 0 && !isSubscribed) {
      setNotification({
        message: 'Please subscribe to access this course.',
        type: 'error',
      });
      console.log('Redirecting to /pricing due to subscription required');
      navigate('/pricing');
      return;
    }
    navigate(`/course/${id}/learn`);
  };

  const handleChapterClick = (chapterId, chapterIndex) => {
    if (chapterIndex > 0 && !isChapterCompleted(chapterIndex - 1)) {
      setNotification({
        message: 'Complete the previous chapter to unlock this one.',
        type: 'error',
      });
      return;
    }
    navigate(`/course/${id}/learn?chapter=${chapterId}`);
  };

  const handleAssessmentClick = (assessmentId, chapterIndex) => {
    if (!isChapterCompleted(chapterIndex)) {
      setNotification({
        message: 'Complete all topics in this chapter to unlock the assessment.',
        type: 'error',
      });
      return;
    }
    navigate(`/assessment/${assessmentId}`);
  };

  const handleCertificateDownload = () => {
    if (!course) {
      setNotification({ message: 'Course data not loaded.', type: 'error' });
      console.error('Course data is null');
      return;
    }
    if (course.progress !== 100) {
      setNotification({
        message: 'Complete all course sections and assessments to unlock the certificate.',
        type: 'error',
      });
      return;
    }
    navigate(`/certificate/${id}`);
  };

  const isCertificateUnlocked = () => {
    return course && course.progress === 100;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-[var(--aqua-glow)]" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-[var(--aqua-glow)] opacity-60" />);
      } else {
        stars.push(<FaStar key={i} className="text-[var(--white-smoke)] opacity-30" />);
      }
    }
    return stars;
  };

  if (!course && !notification.message) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--main-bg)]">
        <div className="text-[var(--white-smoke)] text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--main-bg)] text-[var(--white-smoke)]">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />
      {course ? (
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl course-details">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="left-card bg-[var(--dark-charcoal)] rounded-2xl shadow-[0_4px_20px_rgba(0,183,235,0.3)] p-6 flex flex-col gap-6 border-t-4 border-[var(--neon-purple)]">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full rounded-lg object-cover h-56 hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 bg-[var(--dark-charcoal)] rounded-full px-4 py-2 shadow-[0_0_10px_rgba(0,183,235,0.3)]">
                    <span className="text-sm font-bold text-[var(--aqua-glow)]">{course.rating}</span>
                    <div className="flex gap-1">{renderStars(course.rating)}</div>
                  </div>
                  <button
                    onClick={toggleBookmark}
                    className={`p-2 rounded-full bg-[var(--dark-charcoal)] border-2 border-[var(--aqua-glow)] hover:bg-[var(--neon-purple)] transition-all duration-300 ${
                      isBookmarked ? 'text-[var(--neon-pink)]' : 'text-[var(--white-smoke)]'
                    }`}
                  >
                    <FaHeart className="text-lg" />
                  </button>
                </div>
                <p className="text-sm text-[var(--white-smoke)] opacity-80">
                  {course.numMembers} learners enrolled
                </p>
                <p className="text-sm font-semibold text-[var(--aqua-glow)]">
                  Created by {course.creator}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-[var(--neon-purple)]">
                    ₹{course.discountPrice}
                  </span>
                  {course.discountPrice < course.price && (
                    <span className="text-sm text-[var(--white-smoke)] opacity-50 line-through">
                      ₹{course.price}
                    </span>
                  )}
                </div>
                {course.label && (
                  <span className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)] text-[var(--white-smoke)] text-xs font-bold px-3 py-1 rounded-full">
                    {course.label}
                  </span>
                )}
                <button
                  onClick={startCourse}
                  className="py-3 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)] text-[var(--white-smoke)] font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,183,235,0.5)] transition-all duration-300"
                >
                  Start Course
                </button>
                <button
                  onClick={handleCertificateDownload}
                  disabled={!isCertificateUnlocked()}
                  className={`py-3 rounded-full font-bold transition-all duration-300 ${
                    isCertificateUnlocked()
                      ? 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--acid-green)] hover:shadow-[0_0_20px_rgba(0,255,133,0.5)]'
                      : 'bg-[var(--dark-charcoal)] opacity-50 cursor-not-allowed'
                  }`}
                >
                  Download Certificate
                </button>
                <div className="mt-4">
                  <h3 className="text-base font-bold text-[var(--aqua-glow)] mb-2">
                    Your Progress
                  </h3>
                  <div className="w-full bg-[var(--dark-charcoal)] rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--acid-green)] h-4 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                    <span className="text-xs font-semibold text-[var(--white-smoke)] mt-1 block text-right">
                      {course.progress}% Complete
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 right-card bg-[var(--dark-charcoal)] rounded-2xl shadow-[0_4px_20px_rgba(0,183,235,0.3)] p-6 flex flex-col gap-6 border-b-4 border-[var(--neon-purple)]">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_10px_rgba(0,183,235,0.3)]">
                  {course.title}
                </h1>
                <p className="text-base text-[var(--white-smoke)] opacity-80 leading-relaxed">
                  {course.description}
                </p>
                <div>
                  <h3 className="text-lg font-bold text-[var(--aqua-glow)] mb-4">
                    Course Content
                  </h3>
                  {course.chapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      className="mb-4 bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_10px_rgba(0,183,235,0.2)]"
                    >
                      <button
                        onClick={() => handleChapterClick(chapter.id, index)}
                        disabled={index > 0 && !isChapterCompleted(index - 1)}
                        className={`w-full flex justify-between items-center p-4 text-left text-[var(--white-smoke)] hover:bg-[var(--neon-purple)]/20 transition-colors duration-200 ${
                          index > 0 && !isChapterCompleted(index - 1) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <span className="text-base font-semibold">{chapter.title}</span>
                      </button>
                      <div className="p-4">
                        {chapter.topics.map((topic) => (
                          <div
                            key={topic.id}
                            className="py-2 text-sm text-[var(--white-smoke)] opacity-80 hover:opacity-100 transition-all duration-200"
                          >
                            <span>{topic.title}</span>
                            <span className="ml-2">({topic.type})</span>
                            {topic.completed && (
                              <span className="ml-2 text-[var(--acid-green)]">✔</span>
                            )}
                          </div>
                        ))}
                        {chapter.assessment && (
                          <Link
                            to={`/assessment/${chapter.assessment.id}`}
                            onClick={() => handleAssessmentClick(chapter.assessment.id, index)}
                            className={`block mt-2 text-[var(--neon-pink)] hover:text-[var(--aqua-glow)] transition-colors duration-200 ${
                              !isChapterCompleted(index) ? 'opacity-50 pointer-events-none' : ''
                            }`}
                          >
                            {chapter.assessment.title}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={startCourse}
                  className="py-3 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)] text-[var(--white-smoke)] font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,183,235,0.5)] transition-all duration-300"
                >
                  Start Course
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-[var(--main-bg)]">
          <div className="text-[var(--neon-pink)] text-lg">{notification.message}</div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;