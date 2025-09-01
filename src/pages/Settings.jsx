import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const Settings = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'User Name',
    email: 'user@example.com',
    bio: 'Developer passionate about learning.',
  });
  const [subscription, setSubscription] = useState({
    status: 'Active (Premium)',
    trialEnds: 'September 16, 2025',
    nextBilling: 'October 01, 2025',
  });
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    courseReminders: true,
    errorPosts: false,
  });
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [theme, setTheme] = useState('dark');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Animate sections on load
    gsap.fromTo(
      '.settings-section',
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
      }
    );
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    // Placeholder: Implement theme switching logic
    setSuccess('Theme updated successfully!');
    setError(null);
  };

  const saveProfile = (e) => {
    e.preventDefault();
    // Placeholder: API call to save profile
    setSuccess('Profile updated successfully!');
    setError(null);
  };

  const saveNotifications = (e) => {
    e.preventDefault();
    // Placeholder: API call to save notifications
    setSuccess('Notification preferences updated!');
    setError(null);
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      setError('New passwords do not match.');
      return;
    }
    // Placeholder: API call to change password
    setSuccess('Password changed successfully!');
    setError(null);
    setPassword({ current: '', new: '', confirm: '' });
  };

  const handleLogout = () => {
    // Placeholder: Implement actual logout (e.g., clear tokens, call auth API)
    console.log('Logging out...');
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      // Placeholder: Implement account deletion logic
      setSuccess('Account deletion requested. Check your email for confirmation.');
      setError(null);
      navigate('/login');
    }
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
        <h1 className="text-base sm:text-lg lg:text-xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_20px_var(--pink-glow)] text-center">
          Account Settings
        </h1>

        {error && (
          <p className="text-xs sm:text-sm lg:text-base text-[var(--neon-red)] [text-shadow:0_0_5px_var(--pink-glow)] text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="text-xs sm:text-sm lg:text-base text-[var(--acid-green)] [text-shadow:0_0_5px_var(--green-glow)] text-center">
            {success}
          </p>
        )}

        {/* Profile Section */}
        <section className="settings-section bg-[var(--dark-charcoal)] rounded-tl-3xl rounded-br-3xl p-3 sm:p-4 lg:p-6 border-l-4 border-b-4 border-[var(--neon-pink)] shadow-[0_0_20px_var(--pink-glow)]">
          <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_8px_var(--pink-glow)] mb-3 sm:mb-4">
            Profile Information
          </h2>
          <form onSubmit={saveProfile}>
            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm text-[var(--white-smoke)] mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full p-2 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded text-[var(--white-smoke)] text-xs sm:text-sm"
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm text-[var(--white-smoke)] mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full p-2 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded text-[var(--white-smoke)] text-xs sm:text-sm"
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm text-[var(--white-smoke)] mb-2">Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                className="w-full p-2 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded text-[var(--white-smoke)] text-xs sm:text-sm"
                rows="3"
              />
            </div>
            <button
              type="submit"
              className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--aqua-glow)] text-[var(--white-smoke)] rounded-full text-xs sm:text-sm font-bold hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300 transform hover:scale-105"
            >
              Save Profile
            </button>
          </form>
        </section>

        {/* Subscription Section */}
        <section className="settings-section bg-[var(--dark-charcoal)] rounded-tr-3xl rounded-bl-3xl p-3 sm:p-4 lg:p-6 border-r-4 border-t-4 border-[var(--neon-purple)] shadow-[0_0_20px_var(--blue-glow)]">
          <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_8px_var(--pink-glow)] mb-3 sm:mb-4">
            Subscription Details
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] mb-2">
            Status: <span className="font-semibold text-[var(--acid-green)]">{subscription.status}</span>
          </p>
          <p className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] mb-2">
            Trial Ends: <span className="text-[var(--aqua-glow)]">{subscription.trialEnds}</span>
          </p>
          <p className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] mb-3 sm:mb-4">
            Next Billing: <span className="text-[var(--aqua-glow)]">{subscription.nextBilling}</span>
          </p>
          <button
            className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-[var(--hot-orange)] to-[var(--aqua-glow)] text-[var(--white-smoke)] rounded-full text-xs sm:text-sm font-bold hover:shadow-[0_0_15px_var(--green-glow)] transition-all duration-300 transform hover:scale-105"
          >
            Manage Subscription
          </button>
        </section>

        {/* Notifications Section */}
        <section className="settings-section bg-[var(--dark-charcoal)] rounded-tl-3xl rounded-br-3xl p-3 sm:p-4 lg:p-6 border-l-4 border-b-4 border-[var(--hot-orange)] shadow-[0_0_20px_var(--green-glow)]">
          <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_8px_var(--pink-glow)] mb-3 sm:mb-4">
            Notification Preferences
          </h2>
          <form onSubmit={saveNotifications}>
            <div className="mb-3 sm:mb-4 flex items-center">
              <input
                type="checkbox"
                name="emailUpdates"
                checked={notifications.emailUpdates}
                onChange={handleNotificationChange}
                className="mr-2 w-4 h-4"
              />
              <label className="text-xs sm:text-sm text-[var(--white-smoke)]">Email Updates</label>
            </div>
            <div className="mb-3 sm:mb-4 flex items-center">
              <input
                type="checkbox"
                name="courseReminders"
                checked={notifications.courseReminders}
                onChange={handleNotificationChange}
                className="mr-2 w-4 h-4"
              />
              <label className="text-xs sm:text-sm text-[var(--white-smoke)]">Course Reminders</label>
            </div>
            <div className="mb-3 sm:mb-4 flex items-center">
              <input
                type="checkbox"
                name="errorPosts"
                checked={notifications.errorPosts}
                onChange={handleNotificationChange}
                className="mr-2 w-4 h-4"
              />
              <label className="text-xs sm:text-sm text-[var(--white-smoke)]">Error Post Notifications</label>
            </div>
            <button
              type="submit"
              className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-[var(--aqua-glow)] to-[var(--neon-pink)] text-[var(--white-smoke)] rounded-full text-xs sm:text-sm font-bold hover:shadow-[0_0_15px_var(--blue-glow)] transition-all duration-300 transform hover:scale-105"
            >
              Save Preferences
            </button>
          </form>
        </section>

        {/* Theme Selection */}
        <section className="settings-section bg-[var(--dark-charcoal)] rounded-tr-3xl rounded-bl-3xl p-3 sm:p-4 lg:p-6 border-r-4 border-t-4 border-[var(--aqua-glow)] shadow-[0_0_20px_var(--blue-glow)]">
          <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_8px_var(--pink-glow)] mb-3 sm:mb-4">
            Theme Preference
          </h2>
          <div className="mb-3 sm:mb-4">
            <label className="block text-xs sm:text-sm text-[var(--white-smoke)] mb-2">Select Theme</label>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="w-full p-2 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded text-[var(--white-smoke)] text-xs sm:text-sm"
            >
              <option value="dark">Dark (Default)</option>
              <option value="light">Light</option>
            </select>
          </div>
        </section>

        {/* Password Section */}
        <section className="settings-section bg-[var(--dark-charcoal)] rounded-tl-3xl rounded-br-3xl p-3 sm:p-4 lg:p-6 border-l-4 border-b-4 border-[var(--neon-red)] shadow-[0_0_20px_var(--pink-glow)]">
          <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_8px_var(--pink-glow)] mb-3 sm:mb-4">
            Change Password
          </h2>
          <form onSubmit={changePassword}>
            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm text-[var(--white-smoke)] mb-2">Current Password</label>
              <input
                type="password"
                name="current"
                value={password.current}
                onChange={handlePasswordChange}
                className="w-full p-2 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded text-[var(--white-smoke)] text-xs sm:text-sm"
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm text-[var(--white-smoke)] mb-2">New Password</label>
              <input
                type="password"
                name="new"
                value={password.new}
                onChange={handlePasswordChange}
                className="w-full p-2 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded text-[var(--white-smoke)] text-xs sm:text-sm"
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm text-[var(--white-smoke)] mb-2">Confirm New Password</label>
              <input
                type="password"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                className="w-full p-2 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded text-[var(--white-smoke)] text-xs sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-[var(--neon-red)] to-[var(--aqua-glow)] text-[var(--white-smoke)] rounded-full text-xs sm:text-sm font-bold hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300 transform hover:scale-105"
            >
              Change Password
            </button>
          </form>
        </section>

        {/* Logout Section */}
        <section className="settings-section bg-[var(--dark-charcoal)] rounded-tr-3xl rounded-bl-3xl p-3 sm:p-4 lg:p-6 border-r-4 border-t-4 border-[var(--aqua-glow)] shadow-[0_0_20px_var(--blue-glow)]">
          <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_8px_var(--pink-glow)] mb-3 sm:mb-4">
            Logout
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] opacity-80 mb-3 sm:mb-4">
            Sign out of your account.
          </p>
          <button
            onClick={handleLogout}
            className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-[var(--neon-red)] to-[var(--aqua-glow)] text-[var(--white-smoke)] rounded-full text-xs sm:text-sm font-bold hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300 transform hover:scale-105"
          >
            Sign Out
          </button>
        </section>

        {/* Delete Account Section */}
        <section className="settings-section bg-[var(--dark-charcoal)] rounded-tl-3xl rounded-br-3xl p-3 sm:p-4 lg:p-6 border-l-4 border-b-4 border-[var(--neon-red)] shadow-[0_0_20px_var(--pink-glow)]">
          <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_8px_var(--pink-glow)] mb-3 sm:mb-4">
            Delete Account
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[var(--white-smoke)] opacity-80 mb-3 sm:mb-4">
            Permanently delete your account. This action cannot be undone.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-[var(--neon-red)] to-[var(--hot-orange)] text-[var(--white-smoke)] rounded-full text-xs sm:text-sm font-bold hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300 transform hover:scale-105"
          >
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
};

export default Settings;