import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuizComponent from '../components/Course/QuizComponent';
import FinalAssessment from '../components/Course/FinalAssessment';
import Loader from '../components/Course/Loader';
import Notification from '../components/Course/Notification';

const Assessment = () => {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    // Fetch assessment data (adjust endpoint as needed)
    fetch(`/data/assessments/${id}.json`)
      .then((response) => response.json())
      .then((data) => {
        setAssessment(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  const handleComplete = () => {
    Notification.show('Assessment completed successfully!', 'success');
    // Navigate to certificate or next step if needed
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="text-[var(--neon-red)] text-center py-16">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      {assessment.type === 'final' ? (
        <FinalAssessment onComplete={handleComplete} />
      ) : (
        <QuizComponent quiz={assessment} />
      )}
    </div>
  );
};

export default Assessment;