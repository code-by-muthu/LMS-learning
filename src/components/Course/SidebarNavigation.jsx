import React from 'react';
import Card from '../UI/Card';

const SidebarNavigation = ({
  chapters,
  currentChapterIndex,
  currentTopicIndex,
  setCurrentTopic,
  setCurrentChapterIndex,
  setCurrentTopicIndex,
  progress,
}) => {
  return (
    <Card className="w-64 bg-[var(--dark-charcoal)] p-4 h-screen overflow-y-auto">
      <h3 className="text-lg font-extrabold text-[var(--neon-purple)] [text-shadow:0_0_10px_var(--pink-glow)] mb-4">
        Course Content
      </h3>
      {chapters.map((chapter, chapterIdx) => (
        <div key={chapter.id} className="mb-4">
          <h4 className="text-base font-bold text-[var(--white-smoke)]">
            {chapter.title}
          </h4>
          <ul className="ml-4 space-y-2">
            {chapter.topics.map((topic, topicIdx) => (
              <li
                key={topic.id}
                className={`cursor-pointer text-sm ${
                  chapterIdx === currentChapterIndex && topicIdx === currentTopicIndex
                    ? 'text-[var(--aqua-glow)] [text-shadow:0_0_5px_var(--blue-glow)]'
                    : 'text-[var(--white-smoke)] opacity-80'
                } hover:text-[var(--aqua-glow)] transition-all duration-300`}
                onClick={() => {
                  setCurrentChapterIndex(chapterIdx);
                  setCurrentTopicIndex(topicIdx);
                  setCurrentTopic(topic);
                }}
              >
                {topic.title}
                {topic.completed && (
                  <span className="ml-2 text-[var(--acid-green)]">✔</span>
                )}
              </li>
            ))}
            {chapter.assessment && (
              <li className="text-sm text-[var(--neon-pink)] hover:text-[var(--aqua-glow)] cursor-pointer">
                {chapter.assessment.title}
              </li>
            )}
          </ul>
        </div>
      ))}
      <div className="mt-4">
        <p className="text-sm text-[var(--white-smoke)]">
          Progress: {Math.round(progress)}%
        </p>
      </div>
    </Card>
  );
};

export default SidebarNavigation;