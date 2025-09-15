import React, { useState } from 'react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Course Reminder',
      message: 'Your "Advanced JavaScript" course deadline is tomorrow at 11:59 PM.',
      type: 'reminder',
      timestamp: '2025-09-14 10:00 AM',
      read: false,
    },
    {
      id: 2,
      title: 'Certificate Available',
      message: 'Certificate for "Python Basics" is ready to download.',
      type: 'success',
      timestamp: '2025-09-14 09:30 AM',
      read: false,
    },
    {
      id: 3,
      title: 'Error Alert',
      message: 'SyntaxError reported in Module 3 of "Web Development 101".',
      type: 'error',
      timestamp: '2025-09-13 03:15 PM',
      read: false,
    },
  ]);
  const [filter, setFilter] = useState('all');

  // Handle dismissing a notification
  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Handle marking a notification as read
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Handle marking all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  // Filter notifications based on type
  const filteredNotifications = notifications.filter((notif) =>
    filter === 'all' ? true : notif.type === filter
  );

  return (
    <div className="min-h-screen bg-[var(--main-bg)] text-[var(--white-smoke)] p-6 no-scrollbar">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-[var(--acid-green)] tracking-tight animate-float">
            Notifications
          </h1>
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 rounded-md bg-[var(--dark-charcoal)] text-[var(--white-smoke)] border border-[var(--neon-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--pink-glow)] month-picker"
            >
              <option value="all">All</option>
              <option value="reminder">Reminders</option>
              <option value="success">Success</option>
              <option value="error">Errors</option>
            </select>
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 bg-[var(--electric-blue)] text-[var(--dark-charcoal)] rounded-md hover:bg-[var(--neon-pink)] hover:text-[var(--white-smoke)] transition shadow-[0_0_10px_var(--blue-glow)]"
            >
              Mark All as Read
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif, index) => (
              <div
                key={notif.id}
                className={`p-6 rounded-lg shadow-[0_0_15px_var(--${
                  notif.type === 'reminder'
                    ? 'blue-glow'
                    : notif.type === 'success'
                    ? 'green-glow'
                    : 'pink-glow'
                })] transform hover:scale-[1.02] transition-transform duration-200 animate-float ${
                  index % 2 === 1 ? 'animation-delay-1000' : ''
                } ${
                  notif.type === 'reminder'
                    ? 'bg-[var(--midnight-blue)]/80 border-l-4 border-[var(--neon-blue)]'
                    : notif.type === 'success'
                    ? 'bg-[var(--midnight-blue)]/80 border-l-4 border-[var(--acid-green)]'
                    : 'bg-[var(--midnight-blue)]/80 border-l-4 border-[var(--neon-red)]'
                } ${notif.read ? 'opacity-70' : 'opacity-100'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-full ${
                        notif.type === 'reminder'
                          ? 'bg-[var(--neon-blue)]'
                          : notif.type === 'success'
                          ? 'bg-[var(--acid-green)]'
                          : 'bg-[var(--neon-red)]'
                      } shadow-[0_0_8px_var(--${
                        notif.type === 'reminder'
                          ? 'blue-glow'
                          : notif.type === 'success'
                          ? 'green-glow'
                          : 'pink-glow'
                      })]`}
                    >
                      <svg
                        className="w-6 h-6 text-[var(--dark-charcoal)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {notif.type === 'reminder' ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        ) : notif.type === 'success' ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        )}
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[var(--white-smoke)]">
                        {notif.title}
                      </h2>
                      <p className="text-sm text-[var(--soft-ivory)]">{notif.message}</p>
                      <p className="text-xs text-[var(--soft-violet)] mt-2">{notif.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!notif.read && (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="text-[var(--soft-violet)] hover:text-[var(--acid-green)] transition"
                        aria-label="Mark as read"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => handleDismiss(notif.id)}
                      className="text-[var(--soft-violet)] hover:text-[var(--neon-red)] transition"
                      aria-label="Dismiss notification"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-[var(--soft-ivory)] py-10">
              <p>No notifications available for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;