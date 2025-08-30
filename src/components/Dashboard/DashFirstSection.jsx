
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaBookOpen, FaChalkboardTeacher,FaTrophy , FaMedal,FaUserCircle ,FaBolt,FaChartLine} from "react-icons/fa";
import { GiLevelEndFlag } from "react-icons/gi";
 
 
 
const DashFirstSection = () => {
  const [courses, setCourses] = useState([
    { id: "1", title: "Python for Everybody", progress: 20, duration: "15 hours", img: "/images/technology.png", points: 10 },
    { id: "2", title: "JavaScript Basics", progress: 50, duration: "10 hours", img: "/images/science-engineering.png", points: 8 },
    { id: "3", title: "React Fundamentals", progress: 75, duration: "12 hours", img: "/images/design.png", points: 12 },
    { id: "ai101", title: "AI Introduction", progress: 30, duration: "20 hours", img: "/images/data-science.png", points: 15 },
    { id: "web101", title: "Web Development", progress: 60, duration: "18 hours", img: "/images/personal-development.png", points: 10 },
  ]);
 
  const userProgress = {
    level: 8,
    experiencePoints: 2750,
    pointsNeeded: 3000,
    courses: 3,
    lessons: 12,
    badges: 3,
    dailyGoal: 20,
    dailyGoalTotal: 30,
  };
 
  useEffect(() => {
    gsap.fromTo(
      '.continue-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);
 
  return (
    <div className="bg-[var(--main-bg)] text-[var(--white-smoke)]">
      <div className="container mx-auto px-4 max-w-7xl py-12 lg:py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Continue Learning Section */}
          <div className="md:col-span-2 p-4 shadow-[0_0_15px_var(--blue-glow)]">
            <div className="flex justify-between items-center mb-4 ">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_10px_var(--blue-glow)]">
                Continue Learning
              </h2>
              <Link to="/courses" className="text-sm text-[var(--neon-pink)] hover:text-[var(--aqua-glow)] hover:[text-shadow:0_0_10px_var(--pink-glow)] transition-all duration-300">
                View all →
              </Link>
            </div>
            <div className="flex space-x-4 overflow-x-auto no-scrollbar">
                {courses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.id}`}
                    className="continue-card flex-none w-64 bg-[var(--dark-charcoal)] rounded-lg overflow-hidden shadow-[0_0_10px_rgba(0,255,255,0.4)] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-all duration-300"
                  >
                    <img
                      src={course.img}
                      alt={course.title}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-base font-bold text-[var(--white-smoke)] mb-1 truncate">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[var(--white-smoke)] opacity-80 mb-2">
                        Points: {course.points}
                      </p>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-[var(--acid-green)] h-2.5 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-[var(--white-smoke)] opacity-80 mt-1">
                        {course.progress}% Completed
                      </p>
                      <p className="text-xs text-[var(--white-smoke)] opacity-80">
                        Duration: {course.duration}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
 
          </div>
 
          {/* Progress Section */}
         <div className="relative bg-[var(--dark-charcoal)] p-6 rounded-lg shadow-[0_0_15px_var(--blue-glow)] border border-[var(--dark-charcoal)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_10px_var(--blue-glow)]">
                Progress
              </h2>
              <FaTrophy className="text-yellow-400 text-2xl drop-shadow-[0_0_8px_gold]" />
            </div>
           
            <div className="flex flex-col items-center space-y-4">
         <div className="flex items-center justify-center gap-4 bg-[var(--dark-charcoal)]/60   shadow-[0_0_12px_var(--purple-glow)] w-full">
            <div className="flex items-center gap-0 ">
                <div className="p-2 rounded-full  inline-flex items-center justify-center">
                  <FaUserCircle className="text-4xl text-[var(--neon-purple)] drop-shadow-[0_0_6px_var(--purple-glow)]" />
                </div>
                <p className="text-lg font-bold text-[var(--white-smoke)]">
                  Current Level <span className="text-[var(--neon-purple)]">{userProgress.level}</span>
                </p>
              </div>
          </div>
              <div className="w-full">
                <p className="text-sm text-[var(--white-smoke)]">Experience Points</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(userProgress.experiencePoints / userProgress.pointsNeeded) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-right text-[var(--white-smoke)]">
                  {userProgress.experiencePoints}/{userProgress.pointsNeeded} XP
                </p>
                <p className="text-sm text-[var(--white-smoke)]  mt-1">250 XP needed for level 9</p>
              </div>
              <div className="flex flex-col-3  text-center w-full justify-between">
               <div className="flex w-full justify-between gap-3">
                    <div className="flex-1 border-2 border-[var(--acid-green)] rounded-lg p-3 bg-[var(--dark-charcoal)]/70 shadow-[0_0_10px_var(--green-glow)] text-center">
                      <p className="text-sm text-[var(--white-smoke)]">Courses</p>
                      <p className="text-lg font-bold text-[var(--acid-green)]">{userProgress.courses}</p>
                    </div>
                    <div className="flex-1 border-2 border-[var(--neon-purple)] rounded-lg p-3 bg-[var(--dark-charcoal)]/70 shadow-[0_0_10px_var(--purple-glow)] text-center">
                      <p className="text-sm text-[var(--white-smoke)]">Lessons</p>
                      <p className="text-lg font-bold text-[var(--neon-purple)]">{userProgress.lessons}</p>
                    </div>
                    <div className="flex-1 border-2 border-[var(--neon-pink)] rounded-lg p-3 bg-[var(--dark-charcoal)]/70 shadow-[0_0_10px_var(--pink-glow)] text-center">
                      <p className="text-sm text-[var(--white-smoke)]">Badges</p>
                      <p className="text-lg font-bold text-[var(--neon-pink)]">{userProgress.badges}</p>
                    </div>
                  </div>
              </div>
              <div className="w-full">
                <p className="text-sm text-[var(--white-smoke)]">Daily Goal</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-[var(--neon-pink)] h-2.5 rounded-full"
                    style={{ width: `${(userProgress.dailyGoal / userProgress.dailyGoalTotal) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-right text-[var(--white-smoke)]">{userProgress.dailyGoal}/{userProgress.dailyGoalTotal} min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default DashFirstSection;