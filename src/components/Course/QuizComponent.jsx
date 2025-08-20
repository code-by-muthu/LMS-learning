import React, { useState } from 'react';
import Button from '../ui/Button';
import Notification from '../Course/Notification';

const QuizComponent = ({ quiz }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct += 1;
      }
    });
    setScore((correct / quiz.questions.length) * 100);
    setSubmitted(true);
    Notification.show(`Quiz submitted! Your score: ${correct}/${quiz.questions.length}`, 'success');
  };

  return (
    <div className="space-y-4">
      {quiz.questions.map((question) => (
        <div
          key={question.id}
          className="p-4 bg-[var(--main-bg)] rounded-md border-2 border-[var(--neon-pink)]"
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
          Submit Quiz
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

export default QuizComponent;