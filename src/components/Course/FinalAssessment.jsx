import React, { useState } from 'react';
import Button from '../ui/Button';
import Notification from '../Course/Notification';

const FinalAssessment = ({ onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      text: 'What is the primary purpose of this course?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
    },
    // Add more questions as neede
  ];

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct += 1;
      }
    });
    setScore((correct / questions.length) * 100);
    setSubmitted(true);
    if (correct / questions.length >= 0.7) {
      Notification.show('Congratulations! You passed the final assessment!', 'success');
      onComplete();
    } else {
      Notification.show('You need at least 70% to pass. Try again!', 'error');
    }
  };

  return (
    <div className="p-6 bg-[var(--dark-charcoal)] rounded-lg border-2 border-[var(--neon-pink)] shadow-[0_0_15px_var(--pink-glow)]">
      <h3 className="text-xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_10px_var(--pink-glow)] mb-4">
        Final Assessment
      </h3>
      {questions.map((question) => (
        <div
          key={question.id}
          className="p-4 bg-[var(--main-bg)] rounded-md border-2 border-[var(--neon-purple)] mb-4"
        >
          <p className="text-base text-[var(--white-smoke)] mb-2">{question.text}</p>
          {question.options.map((option) => (
            <label key={option} className="block text-[var(--white-smoke)]">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={selectedAnswers[question.id] === option}
                onChange={() => handleAnswerSelect(question.id, option)}
                disabled={submitted}
                className="mr-2"
              />
              {option}
            </label>
          ))}
          {submitted && (
            <p
              className={`text-sm mt-2 ${
                selectedAnswers[question.id] === question.correctAnswer
                  ? 'text-[var(--acid-green)]'
                  : 'text-[var(--neon-red)]'
              }`}
            >
              {selectedAnswers[question.id] === question.correctAnswer
                ? 'Correct!'
                : `Incorrect. Correct answer: ${question.correctAnswer}`}
            </p>
          )}
        </div>
      ))}
      {!submitted && (
        <Button
          variant="primary"
          onClick={handleSubmit}
          className="bg-[var(--neon-purple)]"
        >
          Submit Assessment
        </Button>
      )}
      {submitted && (
        <p className="text-lg text-[var(--acid-green)]">
          Your Score: {score.toFixed(2)}%
        </p>
      )}
    </div>
  );
};

export default FinalAssessment;