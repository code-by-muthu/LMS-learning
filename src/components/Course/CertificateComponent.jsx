import React from 'react';
import Button from '../UI/Button';

const CertificateComponent = ({ course }) => {
  return (
    <div className="text-center">
      <h3 className="text-xl font-extrabold text-[var(--acid-green)] [text-shadow:0_0_10px_var(--green-glow)] mb-4">
        Certificate of Completion
      </h3>
      <p className="text-base text-[var(--white-smoke)] mb-4">
        Congratulations on completing {course.title}!
      </p>
      <div className="p-6 bg-[var(--dark-charcoal)] rounded-lg border-2 border-[var(--acid-green)] shadow-[0_0_15px_var(--green-glow)]">
        <p className="text-lg font-bold text-[var(--white-smoke)]">
          Awarded to [Your Name]
        </p>
        <p className="text-sm text-[var(--white-smoke)] opacity-80">
          For successfully completing the {course.title} course on {new Date().toLocaleDateString()}.
        </p>
      </div>
      <Button
        variant="primary"
        className="mt-4 bg-[var(--acid-green)] text-[var(--dark-charcoal)]"
      >
        Download Certificate
      </Button>
    </div>
  );
};

export default CertificateComponent;