import React from 'react';
import Button from '../ui/Button';

const LessonControls = ({ onNext, onPrevious, isFirst, isLast, isTopicCompleted, onAssessmentClick, assessment }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
      <Button
        variant="secondary"
        onClick={onPrevious}
        disabled={isFirst}
        className={`py-3 px-6 rounded-full font-bold transition-all duration-300 ${
          isFirst ? 'opacity-50 cursor-not-allowed bg-[var(--dark-charcoal)]' : 'bg-[var(--dark-charcoal)] hover:bg-[var(--neon-purple)]/20 border-2 border-[var(--aqua-glow)]'
        }`}
      >
        Previous
      </Button>
      {assessment && (
        <Button
          variant="primary"
          onClick={() => onAssessmentClick(assessment.id)}
          disabled={!isTopicCompleted}
          className={`py-3 px-6 rounded-full font-bold transition-all duration-300 ${
            !isTopicCompleted
              ? 'opacity-50 cursor-not-allowed bg-[var(--dark-charcoal)]'
              : 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--acid-green)] hover:shadow-[0_0_20px_var(--green-glow)]'
          }`}
        >
          Take Quiz
        </Button>
      )}
      <Button
        variant="primary"
        onClick={onNext}
        disabled={isLast || !isTopicCompleted}
        className={`py-3 px-6 rounded-full font-bold transition-all duration-300 ${
          isLast || !isTopicCompleted
            ? 'opacity-50 cursor-not-allowed bg-[var(--dark-charcoal)]'
            : 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)] hover:shadow-[0_0_20px_var(--blue-glow)]'
        }`}
      >
        Next
      </Button>
    </div>
  );
};

export default LessonControls;