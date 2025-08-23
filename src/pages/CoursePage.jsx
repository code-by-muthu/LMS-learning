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
        { scale: 0.9, opacity: 0, rotateY: 10 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
      );
      gsap.fromTo(
        '.right-card',
        { scale: 0.9, opacity: 0, rotateY: -10 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 }
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
    console.log('Start Course clicked for course ID:', id);
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
    console.log('Navigating to /course/', id, '/learn');
    navigate(`/course/${id}/learn`);
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
    console.log('Navigating to /certificate/', id);
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
        stars.push(<FaStar key={i} className="text-[#00B7EB] text-[14px]" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-[#00B7EB] opacity-60 text-[14px]" />);
      } else {
        stars.push(<FaStar key={i} className="text-[#F5F5F5] opacity-30 text-[14px]" />);
      }
    }
    return stars;
  };

  if (!course && !notification.message) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0A0A23]">
        <div className="text-[#F5F5F5] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A23] min-h-screen text-[#F5F5F5]">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />
      {course ? (
        <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9B00FA]/10 via-[#00B7EB]/10 to-[#00FF85]/10 animate-pulse"></div>
          <div className="absolute inset-0 backdrop-blur-[3px]"></div>
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl course-details">
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-10">
              <div className="lg:w-1/3 left-card bg-[#0A0A23] rounded-2xl shadow-[0_0_20px_rgba(0,183,235,0.5)] p-6 flex flex-col gap-6 border-t-4 border-[#9B00FA] hover:shadow-[0_0_30px_rgba(0,183,235,0.7)] transition-all duration-500">
                <div className="relative group">
                  <img
                    src={course.img}
                    alt={course.title}
                    className="w-full rounded-lg object-cover h-48 sm:h-56 lg:h-64 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(0,183,235,0.7)] transition-all duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A23]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-[#0A0A23]/80 rounded-full px-4 py-2 shadow-[0_0_10px_rgba(0,183,235,0.3)]">
                      <span className="text-sm font-extrabold text-[#00B7EB]">{course.rating}</span>
                      <div className="flex items-center gap-1">{renderStars(course.rating)}</div>
                    </div>
                    <button
                      onClick={toggleBookmark}
                      className={`p-3 rounded-full bg-[#0A0A23]/60 border-2 border-[#00B7EB] hover:bg-[#9B00FA] hover:border-[#9B00FA] transition-all duration-300 ${
                        isBookmarked ? 'text-[#FF00A0]' : 'text-[#F5F5F5]'
                      }`}
                    >
                      <FaHeart className="text-xl" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#F5F5F5] opacity-90 tracking-wide">
                      {course.numMembers} learners enrolled
                    </p>
                    <p className="text-sm font-semibold text-[#00B7EB] [text-shadow:0_0_5px_rgba(0,183,235,0.5)]">
                      Created by {course.creator}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-extrabold text-[#9B00FA] [text-shadow:0_0_10px_rgba(155,0,250,0.6)]">
                      ₹{course.discountPrice}
                    </span>
                    {course.discountPrice < course.price && (
                      <span className="text-sm text-[#F5F5F5] opacity-50 line-through font-medium">
                        ₹{course.price}
                      </span>
                    )}
                  </div>
                  {course.label && (
                    <span className="bg-gradient-to-r from-[#9B00FA] to-[#00B7EB] text-[#F5F5F5] text-xs font-bold px-4 py-2 rounded-full inline-block tracking-wider">
                      {course.label}
                    </span>
                  )}
                  <button
                    onClick={startCourse}
                    className="px-6 py-3 bg-gradient-to-r from-[#9B00FA] to-[#00B7EB] text-[#F5F5F5] font-bold rounded-full hover:shadow-[0_0_25px_rgba(0,183,235,0.7)] transition-all duration-500 w-full text-center tracking-wide"
                  >
                    Start Course
                  </button>
                  <button
                    onClick={handleCertificateDownload}
                    disabled={!isCertificateUnlocked()}
                    className={`px-6 py-3 text-[#F5F5F5] font-bold rounded-full w-full text-center tracking-wide transition-all duration-300 ${
                      isCertificateUnlocked()
                        ? 'bg-gradient-to-r from-[#9B00FA] to-[#00FF85] hover:shadow-[0_0_25px_rgba(0,255,133,0.7)]'
                        : 'bg-[#0A0A23]/50 opacity-70 cursor-not-allowed'
                    }`}
                  >
                    Download Certificate
                  </button>
                  <div className="mt-2">
                    <h3 className="text-base font-bold text-[#00B7EB] [text-shadow:0_0_5px_rgba(0,183,235,0.5)] mb-3">
                      Your Progress
                    </h3>
                    <div className="w-full bg-[#0A0A23]/20 rounded-full h-5 overflow-hidden relative">
                      <div
                        className="bg-gradient-to-r from-[#9B00FA] to-[#00FF85] h-5 rounded-full transition-all duration-700"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                      <span className="absolute top-0 right-3 text-xs font-semibold text-[#F5F5F5] opacity-90">
                        {course.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3 right-card bg-[#0A0A23] rounded-2xl shadow-[0_0_20px_rgba(0,183,235,0.5)] p-6 flex flex-col gap-6 border-b-4 border-[#9B00FA] hover:shadow-[0_0_30px_rgba(0,183,235,0.7)] transition-all duration-500">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F5] [text-shadow:0_0_15px_rgba(0,183,235,0.5)] tracking-tight">
                  {course.title}
                </h1>
                <p className="text-base sm:text-lg text-[#F5F5F5] opacity-80 leading-relaxed">
                  {course.description}
                </p>
                <div>
                  <h3 className="text-lg font-bold text-[#00B7EB] [text-shadow:0_0_5px_rgba(0,183,235,0.5)] mb-4">
                    Course Content
                  </h3>
                  {course.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="mb-4 bg-[#0A0A23]/80 rounded-lg shadow-[0_0_15px_rgba(0,183,235,0.3)] hover:shadow-[0_0_20px_rgba(0,183,235,0.5)] transition-all duration-300"
                    >
                      <button
                        className="w-full flex justify-between items-center p-4 text-left text-[#F5F5F5] hover:bg-[#0A0A23]/50 transition-colors duration-200"
                        onClick={() => navigate(`/course/${id}/learn?chapter=${chapter.id}`)}
                      >
                        <span className="text-base font-semibold tracking-wide">{chapter.title}</span>
                      </button>
                      <div className="p-4">
                        {chapter.topics.map((topic) => (
                          <div
                            key={topic.id}
                            className="py-2 text-sm text-[#F5F5F5] opacity-80 hover:text-[#F5F5F5] hover:opacity-100 transition-all duration-200"
                          >
                            <span>{topic.title}</span>
                            <span className="ml-2">({topic.type})</span>
                            {topic.completed && (
                              <span className="ml-2 text-[#00FF85] [text-shadow:0_0_5px_rgba(0,255,133,0.5)]">✔</span>
                            )}
                          </div>
                        ))}
                        {chapter.assessment && (
                          <Link
                            to={`/assessment/${chapter.assessment.id}`}
                            className="block mt-2 text-[#FF00A0] hover:text-[#00B7EB] transition-colors duration-200"
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
                  className="px-6 py-3 bg-gradient-to-r from-[#9B00FA] to-[#00B7EB] text-[#F5F5F5] font-bold rounded-full hover:shadow-[0_0_25px_rgba(0,183,235,0.7)] transition-all duration-500 w-full sm:w-auto text-center tracking-wide"
                >
                  Start Course
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-[#0A0A23]">
          <div className="text-[#FF00A0] text-lg">Error: {notification.message}</div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;