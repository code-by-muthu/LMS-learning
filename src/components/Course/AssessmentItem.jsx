import React from 'react';
import Button from '../UI/Button';

const AssessmentItem = ({ assessment }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-[var(--main-bg)] rounded-md">
      <div className="flex items-center gap-4">
        <span className="text-[var(--neon-pink)]">📝</span>
        <p className="text-base text-[var(--white-smoke)]">{assessment.title}</p>
      </div>
      <Button
        variant="secondary"
        className="text-[var(--aqua-glow)]"
      >
        Take Assessment
      </Button>
    </div>
  );
};

export default AssessmentItem;