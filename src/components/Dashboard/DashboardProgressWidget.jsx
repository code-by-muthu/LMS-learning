import React from 'react';

const progressData = {
  coursesEnrolled: 12,
  hoursLearned: 47.5,
  certificates: 8,
  studyStreak: 15,
};

const ProgressStatsWidget = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
      <div className="p-3 rounded-lg text-center border-t-2 border-[var(--electric-blue)] bg-[var(--dark-charcoal)]">
        <p className="text-xs sm:text-sm">Courses Enrolled</p>
        <p className="text-lg sm:text-xl font-bold">{progressData.coursesEnrolled}</p>
        <p className="text-xs text-[var(--neon-purple)]">+2 this month</p>
      </div>
      <div className="p-3 rounded-lg text-center border-t-2 border-[var(--acid-green)] bg-[var(--dark-charcoal)]">
        <p className="text-xs sm:text-sm">Hours Learned</p>
        <p className="text-lg sm:text-xl font-bold">{progressData.hoursLearned}</p>
        <p className="text-xs text-[var(--neon-purple)]">+8.2 this week</p>
      </div>
      <div className="p-3 rounded-lg text-center border-t-2 border-[var(--neon-pink)] bg-[var(--dark-charcoal)]">
        <p className="text-xs sm:text-sm">Certificates</p>
        <p className="text-lg sm:text-xl font-bold">{progressData.certificates}</p>
        <p className="text-xs text-[var(--neon-purple)]">+1 completed</p>
      </div>
      <div className="p-3 rounded-lg text-center border-t-2 border-[var(--hot-orange)] bg-[var(--dark-charcoal)]">
        <p className="text-xs sm:text-sm">Study Streak</p>
        <p className="text-lg sm:text-xl font-bold">{progressData.studyStreak} Days</p>
        <p className="text-xs text-[var(--neon-purple)]">Keep it up!</p>
      </div>
    </div>
  );
};

export default ProgressStatsWidget;