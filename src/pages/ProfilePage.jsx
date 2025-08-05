import React from 'react';
import { FaUserCircle, FaTrophy, FaCertificate, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: null,
    totalPoints: 1250,
    subscription: {
      plan: 'Intermediate',
      startDate: '2025-06-01',
      endDate: '2026-06-01',
      benefits: [
        'Access to Beginner & Intermediate Error Videos',
        'Certificates for Completed Courses',
        'Priority Support',
      ],
    },
    courses: [
      { id: 1, title: 'React Router Error', points: 300, progress: 100, completed: true, level: 'Beginner' },
      { id: 2, title: 'Django HTTPS Error', points: 400, progress: 100, completed: true, level: 'Intermediate' },
      { id: 3, title: 'GraphQL Query Error', points: 250, progress: 60, completed: false, level: 'Intermediate' },
      { id: 4, title: 'Webpack Bundle Error', points: 300, progress: 100, completed: true, level: 'Beginner' },
      { id: 5, title: 'TypeScript Type Error', points: 0, progress: 30, completed: false, level: 'Advanced' },
    ],
    certificates: [
      { id: 1, course: 'React Router Error', date: '2025-07-15' },
      { id: 2, course: 'Django HTTPS Error', date: '2025-06-20' },
      { id: 3, course: 'Webpack Bundle Error', date: '2025-05-10' },
    ],
  };

  return (
    <div className="bg-[var(--main-bg)] min-h-screen p-3 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-2 h-2 bg-[var(--neon-pink)] rounded-full top-10 left-10 animate-float"></div>
        <div className="absolute w-2 h-2 bg-[var(--electric-blue)] rounded-full bottom-20 right-20 animate-float animation-delay-1000"></div>
        <div className="absolute w-2 h-2 bg-[var(--acid-green)] rounded-full top-1/3 left-1/4 animate-float animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
        {/* User Details */}
        <div className="bg-[var(--dark-charcoal)] rounded-tl-3xl rounded-br-3xl p-3 sm:p-4 lg:p-6 border-l-4 border-b-4 border-[var(--neon-pink)] shadow-[0_0_20px_var(--pink-glow)]">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-3 sm:gap-4 lg:gap-6">
            <div className="relative group">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover border-3 border-[var(--electric-blue)] group-hover:shadow-[0_0_20px_var(--blue-glow)] transition-all duration-300"
                />
              ) : (
                <FaUserCircle className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[var(--white-smoke)] group-hover:text-[var(--electric-blue)] group-hover:[text-shadow:0_0_10px_var(--blue-glow)] transition-all duration-300" />
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-base sm:text-lg lg:text-xl font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_8px_var(--neon-pink)]">
                {user.name}
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] opacity-80 mt-1">
                {user.email}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <FaTrophy className="text-[var(--acid-green)] text-sm sm:text-base lg:text-lg" />
                <span className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] [text-shadow:0_0_5px_var(--green-glow)]">
                  {user.totalPoints} Points
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Status (Only if Active) */}
        {user.subscription && (
          <div className="bg-[var(--dark-charcoal)] rounded-tr-3xl rounded-bl-3xl p-3 sm:p-4 lg:p-6 border-r-4 border-t-4 border-[var(--neon-purple)] shadow-[0_0_20px_var(--blue-glow)]">
            <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_8px_var(--pink-glow)] mb-3 sm:mb-4 flex items-center gap-2">
              Subscription
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-xs sm:text-sm lg:text-base font-semibold text-[var(--white-smoke)]">
                Plan: {user.subscription.plan}
              </h4>
              <p className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] opacity-80">
                Active: {user.subscription.startDate} - {user.subscription.endDate}
              </p>
              <ul className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] opacity-80 space-y-1">
                {user.subscription.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-[var(--acid-green)]">•</span> {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* In-Progress Courses */}
        <div className="bg-[var(--dark-charcoal)] rounded-tl-3xl rounded-br-3xl p-3 sm:p-4 lg:p-6 border-l-4 border-b-4 border-[var(--hot-orange)] shadow-[0_0_20px_var(--green-glow)]">
          <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_8px_var(--pink-glow)] mb-3 sm:mb-4 flex items-center gap-2">
            <FaChartLine className="text-sm sm:text-base lg:text-lg" /> In-Progress Courses
          </h3>
          {user.courses.filter(c => !c.completed).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {user.courses
                .filter(c => !c.completed)
                .map((course) => (
                  <div
                    key={course.id}
                    className="bg-[var(--main-bg)] rounded-tl-2xl rounded-br-2xl p-2 sm:p-3 border-l-2 border-[var(--neon-purple)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] truncate">
                        {course.title}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--white-smoke)] opacity-80">
                        Points: {course.points} | Level: {course.level}
                      </p>
                      <div className="mt-2">
                        <div className="w-full bg-[var(--dark-charcoal)] rounded-full h-1 sm:h-1.5 lg:h-2">
                          <div
                            className="bg-gradient-to-r from-[var(--acid-green)] to-[var(--neon-pink)] h-full rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--white-smoke)] opacity-80 mt-1">
                          {course.progress}%
                        </p>
                      </div>
                    </div>
                    <span className="block text-center mt-2 text-xs sm:text-sm px-2 py-1 bg-[var(--neon-red)] text-[var(--white-smoke)] rounded-full">
                      Active
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-xs sm:text-sm lg:text-base text-[var(--neon-red)]">
              No courses in progress.
            </p>
          )}
        </div>

        {/* Total Points */}
        <div className="bg-[var(--dark-charcoal)] rounded-tr-3xl rounded-bl-3xl p-3 sm:p-4 lg:p-6 border-r-4 border-t-4 border-[var(--aqua-glow)] shadow-[0_0_20px_var(--blue-glow)]">
          <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_8px_var(--pink-glow)] mb-3 sm:mb-4 flex items-center gap-2">
            <FaTrophy className="text-sm sm:text-base lg:text-lg" /> Total Points
          </h3>
          <p className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] [text-shadow:0_0_5px_var(--green-glow)]">
            {user.totalPoints} Points
          </p>
        </div>

        {/* Certificates */}
        <div className="bg-[var(--dark-charcoal)] rounded-tl-3xl rounded-br-3xl p-3 sm:p-4 lg:p-6 border-l-4 border-b-4 border-[var(--electric-blue)] shadow-[0_0_20px_var(--blue-glow)]">
          <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_8px_var(--pink-glow)] mb-3 sm:mb-4 flex items-center gap-2">
            <FaCertificate className="text-sm sm:text-base lg:text-lg" /> Certificates
          </h3>
          {user.certificates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {user.certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="bg-[var(--main-bg)] rounded-tl-2xl rounded-br-2xl p-2 sm:p-3 border-l-2 border-[var(--neon-pink)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300"
                >
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <FaCertificate className="text-[var(--acid-green)] text-sm sm:text-base lg:text-lg flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] truncate">
                        {certificate.course}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--white-smoke)] opacity-80">
                        Earned: {certificate.date}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/certificate/${certificate.id}`}
                    className="block text-center mt-2 px-3 py-1 text-xs sm:text-sm bg-gradient-to-r from-[var(--neon-pink)] to-[var(--electric-blue)] text-[var(--white-smoke)] rounded-full hover:bg-[var(--aqua-glow)] hover:shadow-[0_0_10px_var(--blue-glow)] transition-all duration-300 transform hover:scale-105"
                  >
                    View Certificate
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs sm:text-sm lg:text-base text-[var(--neon-red)]">
              No certificates earned yet.
            </p>
          )}
        </div>

        {/* Completed Courses */}
        <div className="bg-[var(--dark-charcoal)] rounded-tr-3xl rounded-bl-3xl p-3 sm:p-4 lg:p-6 border-r-4 border-t-4 border-[var(--neon-purple)] shadow-[0_0_20px_var(--pink-glow)]">
          <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_8px_var(--pink-glow)] mb-3 sm:mb-4 flex items-center gap-2">
            <FaChartLine className="text-sm sm:text-base lg:text-lg" /> Completed Courses
          </h3>
          {user.courses.filter(c => c.completed).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {user.courses
                .filter(c => c.completed)
                .map((course) => (
                  <div
                    key={course.id}
                    className="bg-[var(--main-bg)] rounded-tl-2xl rounded-br-2xl p-2 sm:p-3 border-l-2 border-[var(--acid-green)] hover:shadow-[0_0_15px_var(--green-glow)] transition-all duration-300"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] truncate">
                        {course.title}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--white-smoke)] opacity-80">
                        Points: {course.points} | Level: {course.level}
                      </p>
                    </div>
                    <span className="block text-center mt-2 text-xs sm:text-sm px-2 py-1 bg-[var(--acid-green)] text-[var(--dark-charcoal)] rounded-full">
                      Done
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-xs sm:text-sm lg:text-base text-[var(--neon-red)]">
              No courses completed yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;