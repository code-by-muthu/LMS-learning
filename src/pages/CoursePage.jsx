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
      console.log('Loaded course data:', data);  // Debug log
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
    return course?.chapters?.[chapterIndex]?.topics?.every((topic) => topic.completed) ?? false;
  };

  const areAllPriorQuizzesPassed = (chapterIndex) => {
    return course?.chapters?.slice(0, chapterIndex)?.every((chapter) => chapter.assessment?.passed ?? true) ?? false;
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
    if (course?.chapters?.[chapterIndex]?.assessment?.type === 'final' && !areAllPriorQuizzesPassed(chapterIndex)) {
      setNotification({
        message: 'Pass all previous quizzes to unlock the final assessment.',
        type: 'error',
      });
      return;
    }
    navigate(`/assessment/${assessmentId}`);
  };

  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)] py-8 sm:py-12 lg:py-16">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />
      {course ? (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl course-details">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="left-card">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_20px_var(--blue-glow)]">
                <img
                  src={course.thumbnail || course.img}  // Fallback to provided img
                  alt={course.title}
                  className="w-full h-64 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--main-bg)]/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_12px_var(--pink-glow)] uppercase tracking-wide">
                    {course.title}
                  </h1>
                  <p className="text-base text-[var(--white-smoke)] opacity-80 mt-2 line-clamp-2">
                    {course.description}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-1 text-[var(--aqua-glow)]">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(course.rating ?? 0) ? 'text-[var(--aqua-glow)]' : 'text-[var(--dark-charcoal)]'} />
                  ))}
                  <span className="ml-2 text-sm">{(course.rating ?? 0).toFixed(1)}</span>
                </div>
                <span className="text-sm text-[var(--white-smoke)] opacity-80">
                  {course.numMembers ?? 0} Students
                </span>
                <span className="text-sm text-[var(--white-smoke)] opacity-80">
                  {course.duration ?? 'N/A'}
                </span>
              </div>
              {/* Added more content to left side */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-[var(--aqua-glow)] mb-4">
                  Prerequisites
                </h3>
                <ul className="space-y-2">
                  <li className="text-sm text-[var(--white-smoke)] opacity-80">Basic computer skills</li>
                  <li className="text-sm text-[var(--white-smoke)] opacity-80">No prior programming experience required</li>
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-bold text-[var(--aqua-glow)] mb-4">
                  What You'll Learn (Expanded)
                </h3>
                <ul className="space-y-2">
                  {(course.learningOutcomes ?? []).map((outcome, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-[var(--white-smoke)] opacity-80">
                      <span className="text-[var(--acid-green)]">✔</span>
                      {outcome}
                    </li>
                  ))}
                  {/* Added placeholders */}
                  <li className="flex items-center gap-2 text-sm text-[var(--white-smoke)] opacity-80">
                    <span className="text-[var(--acid-green)]">✔</span>
                    Build real-world projects
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[var(--white-smoke)] opacity-80">
                    <span className="text-[var(--acid-green)]">✔</span>
                    Earn a shareable certificate
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-bold text-[var(--aqua-glow)] mb-4">
                  Instructor Bio
                </h3>
                <p className="text-sm text-[var(--white-smoke)] opacity-80">
                  {course.creator} is a seasoned Python expert with 10+ years of teaching experience. PhD in Computer Science.
                </p>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-bold text-[var(--aqua-glow)] mb-4">
                  Student Reviews
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-[var(--dark-charcoal)] rounded-lg">
                    <p className="text-sm text-[var(--white-smoke)]">"Great course for beginners!" - Student A</p>
                  </div>
                  <div className="p-4 bg-[var(--dark-charcoal)] rounded-lg">
                    <p className="text-sm text-[var(--white-smoke)]">"Hands-on projects were awesome." - Student B</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-card">
              <div className="bg-[var(--dark-charcoal)] rounded-2xl shadow-[0_4px_20px_rgba(0,183,235,0.3)] p-6 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-extrabold text-[var(--acid-green)] [text-shadow:0_0_10px_var(--green-glow)]">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </span>
                  <button
                    onClick={toggleBookmark}
                    className={`text-2xl transition-colors duration-300 ${
                      isBookmarked ? 'text-[var(--neon-pink)]' : 'text-[var(--white-smoke)] opacity-60'
                    }`}
                  >
                    <FaHeart />
                  </button>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[var(--aqua-glow)] mb-4">
                  Course Content
                </h3>
                {(course.chapters ?? []).map((chapter, index) => (
                  <div
                    key={chapter?.id ?? index}
                    className="mb-4 bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_10px_rgba(0,183,235,0.2)]"
                  >
                    <button
                      onClick={() => handleChapterClick(chapter?.id ?? '', index)}
                      disabled={index > 0 && !isChapterCompleted(index - 1)}
                      title={index > 0 && !isChapterCompleted(index - 1) ? 'Complete previous chapter to unlock' : ''}
                      className={`w-full flex justify-between items-center p-4 text-left text-[var(--white-smoke)] hover:bg-[var(--neon-purple)]/20 transition-colors duration-200 ${
                        index > 0 && !isChapterCompleted(index - 1) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <span className="text-base font-semibold">{chapter?.title ?? 'Untitled Chapter'}</span>
                    </button>
                    <div className="p-4">
                      {(chapter?.topics ?? []).map((topic) => (
                        <div
                          key={topic?.id ?? Math.random()}
                          className="py-2 text-sm text-[var(--white-smoke)] opacity-80 hover:opacity-100 transition-all duration-200"
                        >
                          <span>{topic?.title ?? 'Untitled Topic'}</span>
                          <span className="ml-2">({topic?.type ?? 'N/A'})</span>
                          {topic?.completed && (
                            <span className="ml-2 text-[var(--acid-green)]">✔</span>
                          )}
                        </div>
                      ))}
                      {chapter?.assessment && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAssessmentClick(chapter.assessment?.id ?? '', index);
                          }}
                          disabled={!isChapterCompleted(index) || (chapter.assessment?.type === 'final' && !areAllPriorQuizzesPassed(index))}
                          title={!isChapterCompleted(index) ? 'Complete all topics to unlock' : (chapter.assessment?.type === 'final' && !areAllPriorQuizzesPassed(index) ? 'Pass all quizzes to unlock final' : '')}
                          className={`block mt-2 text-[var(--neon-pink)] hover:text-[var(--aqua-glow)] transition-colors duration-200 ${
                            !isChapterCompleted(index) || (chapter.assessment?.type === 'final' && !areAllPriorQuizzesPassed(index)) ? 'opacity-50 pointer-events-none' : ''
                          }`}
                        >
                          {chapter.assessment?.title ?? 'Untitled Assessment'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  onClick={startCourse}
                  className="w-full py-3 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)] text-[var(--white-smoke)] font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,183,235,0.5)] transition-all duration-300 hover:[text-shadow:0_0_10px_var(--pink-glow)]"
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