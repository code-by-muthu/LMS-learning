import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const [signInData, setSignInData] = useState({ identifier: '', password: '' });

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignIn = () => {
    // Placeholder for sign-in logic
    console.log('Sign In:', signInData);
  };

  return (
    <div className="bg-[var(--main-bg)] min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="relative w-full max-w-md bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_20px_var(--blue-glow)] p-6 sm:p-8">
        {/* Background Glow Effects */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-[var(--neon-purple)] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[var(--electric-blue)] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

        {/* Sign In Form */}
        <div className="relative z-10 flex flex-col space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_15px_var(--blue-glow)] text-center">
            Welcome Back
          </h2>
          <div>
            <label className="text-[var(--white-smoke)] text-sm sm:text-base">Username or Email</label>
            <input
              type="text"
              name="identifier"
              value={signInData.identifier}
              onChange={handleSignInChange}
              className="w-full mt-1 p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus:shadow-[0_0_15px_var(--pink-glow)] focus:outline-none"
              placeholder="Enter username or email"
            />
          </div>
          <div>
            <label className="text-[var(--white-smoke)] text-sm sm:text-base">Password</label>
            <input
              type="password"
              name="password"
              value={signInData.password}
              onChange={handleSignInChange}
              className="w-full mt-1 p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus:shadow-[0_0_15px_var(--pink-glow)] focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handleSignIn}
            className="w-full py-2 bg-[var(--acid-green)] text-[var(--dark-charcoal)] rounded-md text-base font-semibold hover:bg-[var(--cyber-yellow)] hover:shadow-[0_0_15px_var(--green-glow)] transition-all duration-300"
          >
            Sign In
          </button>
          <p className="text-[var(--white-smoke)] text-sm text-center">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)]"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;