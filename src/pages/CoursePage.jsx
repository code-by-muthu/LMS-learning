import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Notification from '../components/course/Notification';
import { FaHeart, FaStar } from 'react-icons/fa';

const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true); // Replace with auth check

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

  const startCourse = () => {
    if (!course) {
      setNotification({ message: 'Course data not loaded.', type: 'error' });
      return;
    }
    if (course.price > 0 && !isSubscribed) {
      setNotification({
        message: 'Please subscribe to access this course.',
        type: 'error',
      });
      navigate('/pricing'); // Redirect to pricing page
      return;
    }
    navigate(`/course/${id}/learn`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-[var(--cyber-yellow)] text-[12px]" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-[var(--cyber-yellow)] opacity-60 text-[12px]" />);
      } else {
        stars.push(<FaStar key={i} className="text-[var(--white-smoke)] opacity-30 text-[12px]" />);
      }
    }
    return stars;
  };

  if (!course && !notification.message) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--main-bg)]">
        <div className="text-[var(--white-smoke)] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)]">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />
      {course ? (
        <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-pink)]/20 via-[var(--electric-blue)]/20 to-[var(--acid-green)]/20 animate-pulse"></div>
          <div className="absolute inset-0 backdrop-blur-[2px]"></div>
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl course-details">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
              {/* Left Side: Image and Details */}
              <div className="lg:w-1/3 flex flex-col gap-4">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full rounded-lg shadow-[0_0_15px_var(--pink-glow)] object-cover h-48 sm:h-64"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-[var(--cyber-yellow)]">{course.rating}</span>
                  <div className="flex items-center gap-0.5">{renderStars(course.rating)}</div>
                </div>
                <p className="text-sm text-[var(--white-smoke)] opacity-80">
                  ({course.numMembers} learners)
                </p>
                <p className="text-sm text-[var(--white-smoke)] font-medium">
                  By {course.creator}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[var(--neon-pink)] [text-shadow:0_0_6px_var(--pink-glow)]">
                    ₹{course.discountPrice}
                  </span>
                  {course.discountPrice < course.price && (
                    <span className="text-sm text-[var(--white-smoke)] opacity-80 line-through">
                      ₹{course.price}
                    </span>
                  )}
                </div>
                {course.label && (
                  <span className="bg-[var(--neon-pink)] text-[var(--white-smoke)] text-xs font-bold px-2 py-1 rounded-full inline-block">
                    {course.label}
                  </span>
                )}
                <button
                  onClick={startCourse}
                  className="px-6 py-3 bg-[var(--neon-purple)] text-[var(--white-smoke)] font-semibold rounded-lg hover:bg-[var(--electric-blue)] hover:shadow-[0_0_15px_var(--blue-glow)] transition-all duration-300 w-full sm:w-auto"
                >
                  Start Course
                </button>
                <div>
                  <h3 className="text-lg font-bold text-[var(--electric-blue)] mb-2">
                    Your Progress
                  </h3>
                  <div className="w-full bg-[var(--dark-charcoal)] rounded-full h-2.5">
                    <div
                      className="bg-[var(--neon-purple)] h-2.5 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-[var(--white-smoke)] opacity-80 mt-2">
                    {course.progress}% Complete
                  </p>
                </div>
                <button
                  onClick={toggleBookmark}
                  className={`p-2 rounded-full border border-[var(--aqua-glow)] ${
                    isBookmarked ? 'text-[var(--neon-pink)]' : 'text-[var(--white-smoke)]'
                  } self-start`}
                >
                  <FaHeart />
                </button>
              </div>
              {/* Right Side: Description and Topics */}
              <div className="lg:w-2/3 flex flex-col gap-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_20px_var(--blue-glow)]">
                  {course.title}
                </h1>
                <p className="text-base sm:text-lg text-[var(--white-smoke)] opacity-80">
                  {course.description}
                </p>
                <div>
                  <h3 className="text-lg font-bold text-[var(--electric-blue)] mb-4">
                    Course Content
                  </h3>
                  {course.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="mb-4 bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_10px_var(--blue-glow)]"
                    >
                      <button
                        className="w-full flex justify-between items-center p-4 text-left text-[var(--white-smoke)]"
                        onClick={() => navigate(`/course/${id}/learn?chapter=${chapter.id}`)}
                      >
                        <span className="text-base font-semibold">{chapter.title}</span>
                      </button>
                      <div className="p-4">
                        {chapter.topics.map((topic) => (
                          <div
                            key={topic.id}
                            className="py-2 text-sm text-[var(--white-smoke)] opacity-80"
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
                            className="block mt-2 text-[var(--neon-pink)] hover:text-[var(--electric-blue)]"
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
                  className="px-6 py-3 bg-[var(--neon-purple)] text-[var(--white-smoke)] font-semibold rounded-lg hover:bg-[var(--electric-blue)] hover:shadow-[0_0_15px_var(--blue-glow)] transition-all duration-300 w-full sm:w-auto"
                >
                  Start Course
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-[var(--main-bg)]">
          <div className="text-[var(--neon-red)] text-lg">Error: {notification.message}</div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;