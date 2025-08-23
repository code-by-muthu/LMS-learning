import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Notification from '../components/Course/Notification';
import Button from '../components/ui/Button';

const CertificatePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/data/courses/course_${courseId}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch course data: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.progress !== 100) {
          setNotification({
            message: 'Complete all course sections and assessments to unlock the certificate.',
            type: 'error',
          });
          navigate(`/course/${courseId}`);
          return;
        }
        setCourse(data);
        setNotification({ message: '', type: 'success' });
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setNotification({ message: err.message, type: 'error' });
      });
  }, [courseId, navigate]);

  useEffect(() => {
    if (course) {
      gsap.fromTo(
        '.certificate-container',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.action-button',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', delay: 0.5 }
      );
    }
  }, [course]);

  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => {
      console.log('Downloading certificate for course:', courseId);
      setNotification({ message: 'Certificate downloaded successfully!', type: 'success' });
      setLoading(false);
    }, 1000);
  };

  if (!course && !notification.message) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0A0A23]">
        <div className="text-[#F5F5F5] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A23] text-[#F5F5F5] py-8 sm:py-12 lg:py-16">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl certificate-container">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9B00FA]/10 via-[#00B7EB]/10 to-[#00FF85]/10 animate-pulse"></div>
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00B7EB] [text-shadow:0_0_10px_rgba(0,183,235,0.7)] mb-8 flex items-center gap-2">
            Certificate of Completion <span className="text-[#9B00FA] tracking-wider">&gt;&gt;&gt;</span>
          </h2>
          {course ? (
            <div className="p-6 bg-[#0A0A23]/80 rounded-lg shadow-[0_0_15px_rgba(0,183,235,0.5)]">
              <p className="text-lg sm:text-xl font-semibold text-[#F5F5F5] mb-4 [text-shadow:0_0_5px_rgba(0,183,235,0.3)]">
                Congratulations on completing <span className="text-[#00FF85]">{course.title}</span>!
              </p>
              <p className="text-sm sm:text-base text-[#F5F5F5] opacity-80 mb-6">
                Issued on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <Button
                variant="primary"
                onClick={handleDownload}
                disabled={loading}
                loading={loading}
                className="action-button w-full sm:w-auto bg-gradient-to-r from-[#9B00FA] to-[#00FF85] text-[#F5F5F5] font-bold rounded-full hover:shadow-[0_0_25px_rgba(0,255,133,0.7)] transition-all duration-300"
              >
                Download Certificate
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate(`/course/${courseId}`)}
                disabled={loading}
                className="action-button w-full sm:w-auto mt-4 bg-[#0A0A23]/50 border-2 border-[#00B7EB] text-[#F5F5F5] hover:bg-[#00B7EB]/30 transition-all duration-300"
              >
                Back to Course
              </Button>
            </div>
          ) : (
            <div className="text-[#FF00A0] text-lg font-medium [text-shadow:0_0_8px_rgba(255,0,160,0.5)]">
              Error: {notification.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;