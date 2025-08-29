import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

const QuizComponent = ({ quiz, onComplete, maxRetries = Infinity }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [retryCount, setRetryCount] = useState(0);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      setNotification({ message: 'Please select an answer.', type: 'error' });
      return;
    }

    const isCorrect = selectedAnswer === quiz.questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      const finalScore = ((score + (isCorrect ? 1 : 0)) / quiz.questions.length) * 100;
      setQuizCompleted(true);
      if (finalScore >= 60) {  // Changed to 60%
        quiz.passed = true;
        onComplete(finalScore);
      } else {
        setNotification({
          message: `You scored ${Math.round(finalScore)}%. A score of 60% or higher is required to pass.`,
          type: 'error',
        });
        onComplete(finalScore);
      }
    }
  };

  const handleRetry = () => {
    if (retryCount >= maxRetries) {
      setNotification({ message: 'Maximum retries reached. Please review the material.', type: 'error' });
      return;
    }
    setRetryCount(retryCount + 1);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setNotification({ message: '', type: 'success' });
  };

  const handleReturnToCourse = () => {
    navigate(`/course/${quiz.courseId}/learn`);
  };

  return (
    <div className="max-w-3xl mx-auto bg-[var(--dark-charcoal)] rounded-2xl shadow-[0_4px_20px_rgba(0,183,235,0.3)] p-6">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />
      {!quizCompleted ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[var(--white-smoke)]">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </h3>
            <div className="w-1/3 bg-[var(--main-bg)] rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)] h-2 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="text-base text-[var(--white-smoke)] mb-4">
            {quiz.questions[currentQuestionIndex].text}
          </p>
          <div className="grid gap-4">
            {quiz.questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`p-4 rounded-lg text-left text-[var(--white-smoke)] border-2 transition-all duration-300 ${
                  selectedAnswer === option
                    ? 'border-[var(--aqua-glow)] bg-gradient-to-r from-[var(--neon-purple)]/20 to-[var(--aqua-glow)]/20'
                    : 'border-[var(--main-bg)] hover:bg-[var(--neon-purple)]/20'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 py-3 px-6 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)] text-[var(--white-smoke)] font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,183,235,0.5)] transition-all duration-300"
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-bold text-[var(--white-smoke)] mb-4">
            Quiz Completed!
          </h3>
          <p className="text-base text-[var(--white-smoke)] mb-4">
            Your score: {Math.round((score / quiz.questions.length) * 100)}%
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRetry}
              className="py-3 px-6 bg-[var(--dark-charcoal)] text-[var(--neon-pink)] font-bold rounded-full hover:bg-[var(--neon-purple)]/20 transition-all duration-300"
            >
              Retry Quiz
            </button>
            <button
              onClick={handleReturnToCourse}
              className="py-3 px-6 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)] text-[var(--white-smoke)] font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,183,235,0.5)] transition-all duration-300"
            >
              Return to Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;