import React from 'react';

const TopicItem = ({ topic }) => {
  return (
    <div className="flex items-center gap-4 p-2 bg-[var(--main-bg)] rounded-md">
      <span className="text-[var(--aqua-glow)]">▶</span>
      <p className="text-base text-[var(--white-smoke)]">{topic.title}</p>
      {topic.completed && (
        <span className="text-[var(--acid-green)]">✔</span>
      )}
    </div>
  );
};

export default TopicItem;