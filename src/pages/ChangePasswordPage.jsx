import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChangePasswordPage = () => {
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('New password and confirm password do not match');
      }
      // Placeholder for password change logic (replace with API call)
      console.log('Password change requested:', passwordData);
      setSuccess('Password changed successfully!');
      setError(null);
    } catch (err) {
      setError(`Password change failed: ${err.message}`);
      setSuccess(null);
      console.error('Password change error:', err.message);
    }
  };

  return (
    <div className="bg-[var(--main-bg)] min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="relative w-full max-w-md bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_20px_var(--blue-glow)] p-6 sm:p-8">
        {/* Background Glow Effects */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-[var(--neon-purple)] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[var(--electric-blue)] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

        {/* Change Password Form */}
        <div className="relative z-10 flex flex-col space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_15px_var(--blue-glow)] text-center">
            Change Password
          </h2>
          {error && (
            <div className="text-[var(--neon-red)] text-sm text-center animate-fade-in-up">
              {error}
            </div>
          )}
          {success && (
            <div className="text-[var(--acid-green)] text-sm text-center animate-fade-in-up">
              {success}
            </div>
          )}
          <div>
            <label className="text-[var(--white-smoke)] text-sm sm:text-base">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full mt-1 p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus:shadow-[0_0_15px_var(--pink-glow)] focus:outline-none"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="text-[var(--white-smoke)] text-sm sm:text-base">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full mt-1 p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus:shadow-[0_0_15px_var(--pink-glow)] focus:outline-none"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="text-[var(--white-smoke)] text-sm sm:text-base">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full mt-1 p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus:shadow-[0_0_15px_var(--pink-glow)] focus:outline-none"
              placeholder="Confirm new password"
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="w-full py-2 bg-[var(--neon-purple)] text-[var(--white-smoke)] rounded-md text-base font-semibold hover:bg-[var(--soft-violet)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300"
          >
            Change Password
          </button>
          <p className="text-[var(--white-smoke)] text-sm text-center">
            Back to{' '}
            <Link
              to="/profile"
              className="text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)]"
            >
              Profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;