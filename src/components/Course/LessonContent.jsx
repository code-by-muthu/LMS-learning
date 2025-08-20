import React from 'react';
import QuizComponent from './QuizComponent';

const LessonContent = ({ topic }) => {
  return (
    <div className="bg-[var(--dark-charcoal)] p-6 rounded-lg border-2 border-[var(--electric-blue)] shadow-[0_0_15px_var(--blue-glow)]">
      <h3 className="text-xl font-extrabold text-[var(--white-smoke)] mb-4">
        {topic.title}
      </h3>
      {topic.type === 'video' && (
        <video
          src={topic.content}
          controls
          className="w-full rounded-md shadow-[0_0_10px_var(--blue-glow)]"
        />
      )}
      {topic.type === 'text' && (
        <div className="text-base text-[var [

System: --white-smoke)] prose prose-invert max-w-none">
          {topic.content}
        </div>
      )}
      {topic.type === 'quiz' && <QuizComponent quiz={topic.quiz} />}
    </div>
  );
};

export default LessonContent;