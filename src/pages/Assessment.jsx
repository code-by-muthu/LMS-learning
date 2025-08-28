import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Notification from '../components/Course/Notification';
import QuizComponent from '../components/Course/QuizComponent';
import FinalAssessment from '../components/Course/FinalAssessment';
import Loader from '../components/Course/Loader';

const Assessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [score, setScore] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('/data/assessments/assessments_1.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch assessments: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const foundAssessment = data.find((a) => a.id === id);
        if (!foundAssessment) {
          throw new Error(`Assessment with ID ${id} not found`);
        }
        setAssessment(foundAssessment);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setNotification({ message: err.message, type: 'error' });
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (assessment) {
      gsap.fromTo(
        '.assessment-container',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [assessment]);

  const handleComplete = (finalScore) => {
    if (!assessment) return;

    setScore(finalScore);

    console.log('Submitting score:', { assessmentId: id, score: finalScore });

    setNotification({
      message: `Assessment completed! Your score: ${finalScore.toFixed(2)}%`,
      type: finalScore >= 70 ? 'success' : 'error',
    });

    if (finalScore >= 70) {
      setTimeout(() => navigate(`/course/${assessment.courseId}/learn`), 2000);
      if (assessment.type === 'final') {
        setTimeout(() => navigate(`/certificate/${assessment.courseId}`), 2000);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--main-bg)]">
        <Loader />
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--main-bg)]">
        <div className="text-[var(--neon-red)] text-lg">Error: {notification.message}</div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)] py-8 sm:py-12 lg:py-16">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl assessment-container">
        {/* Hero Section */}
        <section className="mb-8 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)] rounded-2xl shadow-[0_0_20px_rgba(0,183,235,0.5)] p-6 text-center">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_12px_var(--pink-glow)] uppercase tracking-wide">
            {assessment.title}
          </h1>
          <p className="text-base text-[var(--white-smoke)] opacity-80 mt-2">
            Test your {assessment.type === 'quiz' ? 'chapter knowledge' : 'course mastery'}! Score 70% or higher to pass.
          </p>
        </section>
        {assessment.type === 'final' ? (
          <FinalAssessment assessment={assessment} onComplete={handleComplete} />
        ) : (
          <QuizComponent quiz={assessment} onComplete={handleComplete} />
        )}
        {score !== null && (
          <div className="mt-6 p-4 sm:p-5 bg-[var(--dark-charcoal)] rounded-lg border-2 border-[var(--neon-pink)] shadow-[0_0_12px_var(--pink-glow)]">
            <p className="text-lg sm:text-xl font-extrabold text-[var(--acid-green)] [text-shadow:0_0_8px_var(--blue-glow)]">
              Your Score: {score.toFixed(2)}%
            </p>
            <p className="text-sm sm:text-base text-[var(--white-smoke)] opacity-80 mt-2">
              {score >= 70 ? 'Congratulations! You passed.' : 'Please review and try again.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;