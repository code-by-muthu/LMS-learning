import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const QuizComponent = ({ quiz, onComplete }) => {
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!quiz || !quiz.courseId) {
      setError('Quiz data is missing or invalid.');
      console.error('Quiz prop is invalid:', quiz);
      return;
    }
    console.log('Quiz prop:', quiz);
  }, [quiz]);

  useEffect(() => {
    gsap.fromTo(
      '.question-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 }
    );
    gsap.fromTo(
      '.action-button',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', delay: 0.5 }
    );
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleSubmit = () => {
    const questions = quiz?.quiz?.questions || quiz?.questions || [];
    if (!questions.length) {
      onComplete(null, 'Quiz data is invalid or no questions available.');
      setError('No questions available for this quiz.');
      return;
    }
    if (Object.keys(selectedAnswers).length !== questions.length) {
      onComplete(null, 'Please answer all questions before submitting.');
      setError('Please answer all questions before submitting.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      let correct = 0;
      questions.forEach((question) => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correct += 1;
        }
      });
      const finalScore = (correct / questions.length) * 100;
      setScore(finalScore);
      setSubmitted(true);
      setLoading(false);
      onComplete(Object.values(selectedAnswers), 'Success');
    }, 1000);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
    setError(null);
  };

  const handleNext = () => {
    setLoading(true);
    navigate(`/course/${quiz.courseId}/learn`);
  };

  const isSubmitDisabled = () => {
    const questions = quiz?.quiz?.questions || quiz?.questions || [];
    return (
      loading ||
      !questions.length ||
      Object.keys(selectedAnswers).length !== questions.length ||
      questions.some((question) => !selectedAnswers[question.id])
    );
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0A0A23]">
        <div className="text-[#FF00A0] text-lg font-medium [text-shadow:0_0_8px_rgba(255,0,160,0.5)]">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!quiz || (!quiz.quiz && !quiz.questions)) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0A0A23]">
        <div className="text-[#FF00A0] text-lg font-medium [text-shadow:0_0_8px_rgba(255,0,160,0.5)]">
          No quiz data available.
        </div>
      </div>
    );
  }

  const questions = quiz.quiz?.questions || quiz.questions || [];

  return (
    <div className="min-h-screen bg-[#0A0A23] text-[#F5F5F5] py-8 sm:py-12 lg:py-16">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9B00FA]/10 via-[#00B7EB]/10 to-[#00FF85]/10 animate-pulse"></div>
        <div className="relative z-10">
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <div
                key={question.id}
                className="question-item mb-8 pb-6 border-b border-[#9B00FA]/50"
              >
                <p className="text-base sm:text-lg font-semibold text-[#F5F5F5] mb-4 [text-shadow:0_0_5px_rgba(0,183,235,0.3)]">
                  {index + 1}. {question.text}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerSelect(question.id, option)}
                      disabled={submitted}
                      className={`p-3 rounded-md text-left text-[#F5F5F5] transition-all duration-300 ${
                        selectedAnswers[question.id] === option
                          ? 'bg-gradient-to-r from-[#9B00FA]/50 to-[#00B7EB]/50 border border-[#00B7EB] shadow-[0_0_10px_rgba(0,183,235,0.5)]'
                          : 'bg-[#0A0A23]/30 hover:bg-gradient-to-r hover:from-[#9B00FA]/20 hover:to-[#00B7EB]/20 hover:shadow-[0_0_8px_rgba(0,183,235,0.3)]'
                      } ${submitted ? 'cursor-not-allowed opacity-70' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {submitted && (
                  <p
                    className={`mt-3 text-sm font-medium ${
                      selectedAnswers[question.id] === question.correctAnswer
                        ? 'text-[#00FF85] [text-shadow:0_0_6px_rgba(0,255,133,0.5)]'
                        : 'text-[#FF00A0] [text-shadow:0_0_6px_rgba(255,0,160,0.5)]'
                    }`}
                  >
                    {selectedAnswers[question.id] === question.correctAnswer
                      ? 'Correct!'
                      : `Incorrect. Correct answer: ${question.correctAnswer}`}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="text-[#FF00A0] text-lg font-medium [text-shadow:0_0_8px_rgba(255,0,160,0.5)]">
              No questions available for this quiz.
            </div>
          )}
          {!submitted && (
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitDisabled()}
              loading={loading}
              className="action-button w-full sm:w-auto mb-8 sm:mb-8 lg:mb-0 mt-6 bg-gradient-to-r from-[#9B00FA] to-[#00B7EB] text-[#F5F5F5] font-bold rounded-full hover:shadow-[0_0_25px_rgba(0,183,235,0.7)] transition-all duration-300"
            >
              Submit Quiz
            </Button>
          )}
          {submitted && (
            <div className="mt-6 p-6 bg-[#0A0A23]/80 rounded-lg shadow-[0_0_15px_rgba(0,183,235,0.5)]">
              <p className="text-lg sm:text-xl font-extrabold text-[#00FF85] [text-shadow:0_0_10px_rgba(0,255,133,0.5)]">
                Your Score: {score?.toFixed(2)}%
              </p>
              <p className="text-sm sm:text-base text-[#F5F5F5] opacity-80 mt-2">
                {score >= 70 ? 'Great job! Proceed to the next topic.' : 'Please review and try again.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4 ">
                {score >= 70 ? (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={loading}
                    loading={loading}
                    className="action-button w-full sm:w-auto bg-gradient-to-r from-[#9B00FA] to-[#00B7EB] text-[#F5F5F5] font-bold rounded-full hover:shadow-[0_0_25px_rgba(0,183,235,0.7)] transition-all duration-300"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={handleRetry}
                    disabled={loading}
                    loading={loading}
                    className="action-button w-full sm:w-auto bg-[#0A0A23]/50 border-2 border-[#00B7EB] text-[#F5F5F5] hover:bg-[#00B7EB]/30 transition-all duration-300"
                  >
                    Retry
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;