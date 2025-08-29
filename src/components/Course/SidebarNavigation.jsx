import React, { useState } from 'react';
import Card from '../UI/Card';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const SidebarNavigation = ({
  chapters,
  currentChapterIndex,
  currentTopicIndex,
  setCurrentTopic,
  setCurrentChapterIndex,
  setCurrentTopicIndex,
  progress,
  onAssessmentClick,
}) => {
  const [openChapter, setOpenChapter] = useState(currentChapterIndex);

  const toggleChapter = (chapterIdx) => {
    setOpenChapter(openChapter === chapterIdx ? null : chapterIdx);
  };

  const isChapterUnlocked = (chapterIdx) => {
    if (chapterIdx === 0) return true;
    return chapters[chapterIdx - 1].topics.every((topic) => topic.completed);
  };

  const isAssessmentUnlocked = (chapterIdx) => {
    return chapters[chapterIdx].topics.every((topic) => topic.completed);
  };

  const handleTopicClick = (chapterIdx, topicIdx) => {
    if (!isChapterUnlocked(chapterIdx) || (chapterIdx === currentChapterIndex && topicIdx > currentTopicIndex && !chapters[chapterIdx].topics[currentTopicIndex].completed)) {
      return; // Prevent navigation to locked topics
    }
    setCurrentChapterIndex(chapterIdx);
    setCurrentTopicIndex(topicIdx);
    setCurrentTopic(chapters[chapterIdx].topics[topicIdx]);
  };

  return (
    <Card className="w-72 bg-[var(--dark-charcoal)] p-6 h-screen overflow-y-auto shadow-[0_4px_20px_rgba(0,183,235,0.3)]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-extrabold text-[var(--neon-purple)] [text-shadow:0_0_10px_var(--pink-glow)]">
          Course Content
        </h3>
        <span className="text-sm text-[var(--white-smoke)] opacity-80">
          {chapters.length} Chapters
        </span>
      </div>
      {chapters.map((chapter, chapterIdx) => (
        <div key={chapter.id} className="mb-4">
          <button
            onClick={() => toggleChapter(chapterIdx)}
            disabled={!isChapterUnlocked(chapterIdx)}
            title={!isChapterUnlocked(chapterIdx) ? 'Complete previous chapter to unlock' : ''}
            className={`w-full flex justify-between items-center p-3 text-left rounded-lg transition-all duration-300 ${
              !isChapterUnlocked(chapterIdx)
                ? 'opacity-50 cursor-not-allowed text-[var(--white-smoke)]'
                : 'text-[var(--white-smoke)] hover:bg-[var(--neon-purple)]/20'
            }`}
          >
            <span className="text-base font-semibold">{chapter.title}</span>
            {openChapter === chapterIdx ? (
              <FaChevronUp className="text-[var(--aqua-glow)]" />
            ) : (
              <FaChevronDown className="text-[var(--aqua-glow)]" />
            )}
          </button>
          {openChapter === chapterIdx && (
            <ul className="ml-4 mt-2 space-y-2">
              {chapter.topics.map((topic, topicIdx) => (
                <li
                  key={topic.id}
                  onClick={() => handleTopicClick(chapterIdx, topicIdx)}
                  title={
                    !isChapterUnlocked(chapterIdx) ||
                    (chapterIdx === currentChapterIndex &&
                      topicIdx > currentTopicIndex &&
                      !chapters[chapterIdx].topics[currentTopicIndex].completed)
                      ? 'Complete previous topic to unlock'
                      : ''
                  }
                  className={`cursor-pointer text-sm p-2 rounded transition-all duration-300 ${
                    !isChapterUnlocked(chapterIdx) ||
                    (chapterIdx === currentChapterIndex &&
                      topicIdx > currentTopicIndex &&
                      !chapters[chapterIdx].topics[currentTopicIndex].completed)
                      ? 'opacity-50 cursor-not-allowed text-[var(--white-smoke)]'
                      : chapterIdx === currentChapterIndex && topicIdx === currentTopicIndex
                      ? 'text-[var(--aqua-glow)] [text-shadow:0_0_5px_var(--blue-glow)] bg-[var(--neon-purple)]/10'
                      : 'text-[var(--white-smoke)] hover:text-[var(--aqua-glow)] hover:bg-[var(--neon-purple)]/10'
                  }`}
                >
                  <span>{topic.title}</span>
                  {topic.completed && (
                    <span className="ml-2 text-[var(--acid-green)]">✔</span>
                  )}
                </li>
              ))}
              {chapter.assessment && (
                <li
                  onClick={() => isAssessmentUnlocked(chapterIdx) && onAssessmentClick(chapter.assessment.id)}
                  title={!isAssessmentUnlocked(chapterIdx) ? 'Complete all topics to unlock assessment' : ''}
                  className={`cursor-pointer text-sm p-2 rounded transition-all duration-300 ${
                    !isAssessmentUnlocked(chapterIdx)
                      ? 'opacity-50 cursor-not-allowed text-[var(--neon-pink)]'
                      : 'text-[var(--neon-pink)] hover:text-[var(--aqua-glow)] hover:bg-[var(--neon-purple)]/10'
                  }`}
                >
                  {chapter.assessment.title}
                  {chapter.assessment.passed && (
                    <span className="ml-2 text-[var(--acid-green)]">✔</span>
                  )}
                </li>
              )}
            </ul>
          )}
        </div>
      ))}
      <div className="mt-6">
        <p className="text-sm font-semibold text-[var(--white-smoke)]">
          Progress: {Math.round(progress)}%
        </p>
        <div className="w-full bg-[var(--main-bg)] rounded-full h-3 mt-2">
          <div
            className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--aqua-glow)] h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </Card>
  );
};

export default SidebarNavigation;