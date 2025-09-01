import React, { useContext } from 'react';
import { FaCalendarAlt, FaClock, FaTrophy } from 'react-icons/fa';
import { CalendarContext } from '../../context/CalendarContext';
import { Link } from 'react-router-dom';

const Dashboard3Section = () => {
  const { progressData } = useContext(CalendarContext);
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const todaySchedule = progressData.events[todayKey] || [];

  // Study Plan Data (unchanged)
  const plan = {
    current: 'Continue AI Course - Neural Networks Explained (75 min)',
    goals: [
      { title: 'Complete AI Course', due: 'Jan 15' },
      { title: 'Practice design exercises', due: 'Jan 16', completed: true },
    ],
  };

  // Achievements Data (unchanged)
  const achievements = [
    { title: 'Fast Learner', description: 'Complete 3 lessons in a single day', unlocked: true },
    { title: 'Knowledge Seeker', description: 'Enroll in 5 different courses', unlocked: true },
    { title: 'Dedicated Student', description: 'Study for 7 consecutive days', unlocked: false },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 py-8">
      {/* Today's Schedule */}
      <div className="bg-gradient-to-br from-[var(--dark-charcoal)] to-[var(--main-bg)] p-6 rounded-xl border-l-4 border-[var(--electric-blue)] shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_5px_var(--blue-glow)]">Today's Schedule</h3>
          <FaCalendarAlt className="text-[var(--neon-purple)] text-lg" />
        </div>
        <ul className="space-y-4">
          {todaySchedule.length > 0 ? (
            todaySchedule.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-base">
                <span className="text-[var(--neon-purple)] font-semibold">{item.startTime || 'N/A'}</span>
                <span className="flex-1 text-[var(--white-smoke)]">{item.title}</span>
                <span className="text-xs bg-[var(--dark-charcoal)]/50 px-2 py-1 rounded-full">{item.type}</span>
              </li>
            ))
          ) : (
            <li className="text-[var(--white-smoke)] text-base">No events scheduled for today.</li>
          )}
        </ul>
        <Link to="/calendar" className="mt-6 w-full bg-[var(--neon-pink)] text-[var(--dark-charcoal)] rounded-lg py-2 text-base font-semibold hover:bg-[var(--aqua-glow)] hover:text-[var(--dark-charcoal)] transition-all duration-300">
          View Full Schedule
        </Link>
      </div>

      {/* Study Plan */}
      <div className="bg-gradient-to-br from-[var(--dark-charcoal)] to-[var(--main-bg)] p-6 rounded-xl border-l-4 border-[var(--acid-green)] shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[var(--acid-green)] [text-shadow:0_0_5px_var(--green-glow)]">Study Plan</h3>
          <FaClock className="text-[var(--neon-purple)] text-lg" />
        </div>
        <p className="text-base text-[var(--white-smoke)] mb-4">{plan.current}</p>
        <h4 className="text-sm font-semibold text-[var(--neon-purple)] mb-2">Upcoming Goals</h4>
        <ul className="space-y-3">
          {plan.goals.map((goal, index) => (
            <li key={index} className="text-base flex items-center gap-3">
              <span className={goal.completed ? 'text-[var(--acid-green)]' : 'text-gray-500'}>{goal.completed ? '✅' : '⬜'}</span>
              <span className="flex-1 text-[var(--white-smoke)]">{goal.title}</span>
              <span className="text-xs text-[var(--white-smoke)]/70">Due: {goal.due}</span>
            </li>
          ))}
        </ul>
        <button className="mt-6 w-full bg-[var(--neon-pink)] text-[var(--dark-charcoal)] rounded-lg py-2 text-base font-semibold hover:bg-[var(--aqua-glow)] hover:text-[var(--dark-charcoal)] transition-all duration-300">
          Add New Goal
        </button>
      </div>

      {/* Achievements */}
      <div className="bg-gradient-to-br from-[var(--dark-charcoal)] to-[var(--main-bg)] p-6 rounded-xl border-l-4 border-[var(--neon-pink)] shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[var(--neon-pink)] [text-shadow:0_0_5px_var(--pink-glow)]">Achievements</h3>
          <FaTrophy className="text-[var(--neon-purple)] text-lg" />
        </div>
        <ul className="space-y-4">
          {achievements.map((ach, index) => (
            <li key={index} className="text-base flex items-center gap-3">
              <span className={ach.unlocked ? 'text-[var(--acid-green)]' : 'text-gray-500'}>{ach.unlocked ? '🔓' : '🔒'}</span>
              <div className="flex-1">
                <span className="text-[var(--white-smoke)] font-semibold">{ach.title}</span>
                <p className="text-xs text-[var(--white-smoke)]/70">{ach.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-6 w-full bg-[var(--neon-pink)] text-[var(--dark-charcoal)] rounded-lg py-2 text-base font-semibold hover:bg-[var(--aqua-glow)] hover:text-[var(--dark-charcoal)] transition-all duration-300">
          View Achievements Detail
        </button>
      </div>
    </div>
  );
};

export default Dashboard3Section;