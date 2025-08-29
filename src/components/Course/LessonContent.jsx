import React from 'react';
import QuizComponent from './QuizComponent';

const LessonContent = ({ topic, onComplete }) => {
  const handleVideoEnd = () => {
    onComplete();
  };

  const handleTextComplete = () => {
    onComplete();
  };

  const handlePdfComplete = () => {
    // Assume user scrolls to end or clicks complete
    onComplete();
  };

  const handleSlideComplete = () => {
    // Assume user views all slides
    onComplete();
  };

  return (
    <div className="bg-[var(--dark-charcoal)] p-6 rounded-xl border-2 border-[var(--electric-blue)] shadow-[0_0_20px_var(--blue-glow)]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl lg:text-2xl font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_8px_var(--blue-glow)]">
          {topic.title}
        </h3>
        {topic.completed && (
          <span className="text-[var(--acid-green)] font-semibold flex items-center gap-2">
            Completed <span className="text-lg">✔</span>
          </span>
        )}
      </div>
      <div className="relative">
        {topic.type === 'video' && (
          <div className="relative rounded-lg overflow-hidden">
            <video
              src={topic.content}
              controls
              onEnded={handleVideoEnd}
              className="w-full h-auto rounded-lg shadow-[0_0_15px_var(--blue-glow)]"
            />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)]"></div>
          </div>
        )}
        {topic.type === 'text' && (
          <div className="prose prose-invert max-w-none text-[var(--white-smoke)] bg-[var(--main-bg)]/50 p-4 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: topic.content }} />
            {!topic.completed && (
              <button
                onClick={handleTextComplete}
                className="mt-4 py-2 px-6 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)] text-[var(--white-smoke)] font-bold rounded-full hover:shadow-[0_0_20px_var(--blue-glow)] transition-all duration-300"
              >
                Mark as Completed
              </button>
            )}
          </div>
        )}
        {topic.type === 'pdf' && (
          <div className="bg-[var(--main-bg)]/50 p-4 rounded-lg">
            <embed src={topic.content} type="application/pdf" width="100%" height="600px" />
            {!topic.completed && (
              <button
                onClick={handlePdfComplete}
                className="mt-4 py-2 px-6 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)] text-[var(--white-smoke)] font-bold rounded-full hover:shadow-[0_0_20px_var(--blue-glow)] transition-all duration-300"
              >
                Mark as Completed
              </button>
            )}
          </div>
        )}
        {topic.type === 'slide' && (
          <div className="bg-[var(--main-bg)]/50 p-4 rounded-lg">
            {/* Placeholder for slide carousel; use a library like react-slick in production */}
            {topic.slides.map((slide, idx) => (
              <img key={idx} src={slide} alt={`Slide ${idx + 1}`} className="w-full mb-2" />
            ))}
            {!topic.completed && (
              <button
                onClick={handleSlideComplete}
                className="mt-4 py-2 px-6 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)] text-[var(--white-smoke)] font-bold rounded-full hover:shadow-[0_0_20px_var(--blue-glow)] transition-all duration-300"
              >
                Mark as Completed
              </button>
            )}
          </div>
        )}
        {topic.type === 'quiz' && (
          <QuizComponent quiz={topic.quiz} onComplete={onComplete} />
        )}
      </div>
      <p className="text-sm text-[var(--white-smoke)] opacity-80 mt-4">
        Duration: {topic.duration}
      </p>
    </div>
  );
};

export default LessonContent;