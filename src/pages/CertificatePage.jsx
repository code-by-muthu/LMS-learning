import React from 'react';
import { useParams } from 'react-router-dom';

const CertificatePage = () => {
  const { id } = useParams();
  return (
    <div className="bg-[var(--main-bg)] min-h-screen p-3 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-2 h-2 bg-[var(--neon-pink)] rounded-full top-10 left-10 animate-float"></div>
        <div className="absolute w-2 h-2 bg-[var(--electric-blue)] rounded-full bottom-20 right-20 animate-float animation-delay-1000"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-base sm:text-lg lg:text-xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_8px_var(--pink-glow)]">
          Certificate {id}
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] opacity-80 mt-2">
          This is a placeholder for the certificate view page.
        </p>
      </div>
    </div>
  );
};

export default CertificatePage;