import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ChapterAccordion = ({ chapters, courseId }) => {
  const [openChapter, setOpenChapter] = useState(null);

  const toggleChapter = (chapterId) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-[var(--electric-blue)] mb-4">
        Course Content
      </h3>
      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          className="mb-4 bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_10px_var(--blue-glow)]"
        >
          <button
            className="w-full flex justify-between items-center p-4 text-left text-[var(--white-smoke)]"
            onClick={() => toggleChapter(chapter.id)}
          >
            <span className="text-base font-semibold">{chapter.title}</span>
            {openChapter === chapter.id ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openChapter === chapter.id && (
            <div className="p-4">
              {chapter.topics.map((topic) => (
                <div
                  key={topic.id}
                  className="py-2 text-sm text-[var(--white-smoke)] opacity-80"
                >
                  <span>{topic.title}</span>
                  <span className="ml-2">({topic.type})</span>
                  {topic.completed && (
                    <span className="ml-2 text-[var(--acid-green)]">✔</span>
                  )}
                </div>
              ))}
              {chapter.assessment && (
                <Link
                  to={`/assessment/${chapter.assessment.id}`}
                  className="block mt-2 text-[var(--neon-pink)] hover:text-[var(--electric-blue)]"
                >
                  {chapter.assessment.title}
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChapterAccordion;