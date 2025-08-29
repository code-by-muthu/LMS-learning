import React, { useState } from 'react';
import { FaCalendarAlt, FaCheckCircle, FaClock, FaStar, FaSyncAlt } from 'react-icons/fa';

const LearningCalendar = () => {
  const [view, setView] = useState('daily');
  const [progressData] = useState({
    courses: [
      { id: 1, title: 'JavaScript Advanced Concepts', progress: 75, daysStudied: [29, 30, 31] },
      { id: 2, title: 'AI Course - Neural Networks', progress: 40, daysStudied: [28, 29] },
    ],
    goals: { daily: 1, weekly: 5, completedDaily: 1, completedWeekly: 3 },
    reminders: [
      { time: '10:00 AM', title: 'JavaScript Class' },
      { time: '2:00 PM', title: 'React Assignment' },
    ],
    milestones: [
      { title: 'AI Course Completion', date: 'Jan 15, 2026', status: 'Suggested' },
      { title: 'Data Structures Quiz Unlock', date: 'Jan 10, 2026', status: 'Locked' },
    ],
    streakDays: [25, 26, 27, 28, 29],
  });

  const currentDate = new Date();
  const daysInMonth = new Array(31).fill().map((_, i) => i + 1);

  return (
    <div className="bg-[var(--main-bg)] text-[var(--white-smoke)] p-6 rounded-lg shadow-[0_0_15px_var(--blue-glow)]">
      <h2 className="text-2xl font-bold text-[var(--neon-pink)] [text-shadow:0_0_10px_var(--pink-glow)] mb-4">Learning Calendar</h2>
      
      {/* View Toggle */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${view === 'daily' ? 'bg-[var(--neon-purple)] text-[var(--dark-charcoal)]' : 'bg-[var(--dark-charcoal)] border border-[var(--neon-purple)]'}`}
          onClick={() => setView('daily')}
        >
          Daily
        </button>
        <button
          className={`px-4 py-2 rounded-full ${view === 'weekly' ? 'bg-[var(--neon-purple)] text-[var(--dark-charcoal)]' : 'bg-[var(--dark-charcoal)] border border-[var(--neon-purple)]'}`}
          onClick={() => setView('weekly')}
        >
          Weekly
        </button>
        <button
          className={`px-4 py-2 rounded-full ${view === 'monthly' ? 'bg-[var(--neon-purple)] text-[var(--dark-charcoal)]' : 'bg-[var(--dark-charcoal)] border border-[var(--neon-purple)]'}`}
          onClick={() => setView('monthly')}
        >
          Monthly
        </button>
      </div>

      {/* Calendar Content */}
      {view === 'monthly' && (
        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map(day => (
            <div
              key={day}
              className={`p-2 text-center rounded-lg ${progressData.streakDays.includes(day) ? 'bg-[var(--acid-green)] text-[var(--dark-charcoal)]' : 'bg-[var(--dark-charcoal)]'}`}
            >
              <span>{day}</span>
              {progressData.streakDays.includes(day) && <FaCheckCircle className="inline ml-1 text-[var(--neon-purple)]" />}
            </div>
          ))}
        </div>
      )}

      {/* Course Progress */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-[var(--electric-blue)] mb-2">Course Progress</h3>
        {progressData.courses.map(course => (
          <div key={course.id} className="mb-4">
            <div className="flex justify-between mb-1">
              <span>{course.title}</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-[var(--dark-charcoal)] rounded-full h-2.5">
              <div
                className="bg-[var(--neon-pink)] h-2.5 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Goals */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-[var(--acid-green)] mb-2">Learning Goals</h3>
        <p>Daily: {progressData.goals.completedDaily}/{progressData.goals.daily} lessons</p>
        <p>Weekly: {progressData.goals.completedWeekly}/{progressData.goals.weekly} videos</p>
      </div>

      {/* Reminders */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-[var(--neon-pink)] mb-2">Study Reminders</h3>
        <ul className="space-y-2">
          {progressData.reminders.map((reminder, index) => (
            <li key={index} className="flex items-center gap-2">
              <FaClock className="text-[var(--electric-blue)]" />
              <span>{reminder.time} - {reminder.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Milestones */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-[var(--neon-purple)] mb-2">Milestones & Deadlines</h3>
        <ul className="space-y-2">
          {progressData.milestones.map((milestone, index) => (
            <li key={index} className="flex items-center gap-2">
              <FaStar className={milestone.status === 'Locked' ? 'text-gray-500' : 'text-[var(--acid-green)]'} />
              <span>{milestone.title} - {milestone.date} ({milestone.status})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sync & Export */}
      <div className="mt-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--dark-charcoal)] border border-[var(--neon-purple)] rounded-full hover:bg-[var(--neon-purple)] hover:text-[var(--dark-charcoal)] transition-all duration-300">
          <FaSyncAlt />
          <span>Sync with Google/Outlook</span>
        </button>
      </div>
    </div>
  );
};

export default LearningCalendar;