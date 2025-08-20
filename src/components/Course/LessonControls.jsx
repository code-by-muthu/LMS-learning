import React from 'react';
import Button from '../ui/Button';

const LessonControls = ({ onNext, onPrevious, isFirst, isLast }) => {
  return (
    <div className="flex justify-between mt-4">
      <Button
        variant="secondary"
        onClick={onPrevious}
        disabled={isFirst}
        className={`${isFirst ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Previous
      </Button>
      <Button
        variant="primary"
        onClick={onNext}
        disabled={isLast}
        className={`${isLast ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Next
      </Button>
    </div>
  );
};

export default LessonControls;