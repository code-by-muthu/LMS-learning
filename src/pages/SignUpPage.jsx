import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({ 
    username: '', 
    email: '', 
    password: '',
    confirmPassword: ''   
  });
  const [error, setError] = useState(null);

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    try {
      console.log('Sign Up:', signUpData);
    } catch (err) {
      setError('Sign-up failed: Invalid input');
      console.error('Sign-up error:', err.message);
    }
  };

  const handleSocialLogin = (provider) => {
    try {
      console.log(`Initiating ${provider} sign-up`);
    } catch (err) {
      setError(`Failed to initiate ${provider} sign-up`);
      console.error(`${provider} sign-up error:`, err.message);
    }
  };

  return (
    <div className="bg-[var(--main-bg)] min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="relative w-full max-w-md bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_20px_var(--blue-glow)] p-6 sm:p-8">
        
        <div className="absolute top-0 left-0 w-48 h-48 bg-[var(--neon-purple)] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[var(--electric-blue)] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

        {/* Sign Up Form */}
        <div className="relative z-10 flex flex-col space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_15px_var(--blue-glow)] text-center">
            Create Account
          </h2>
          {error && (
            <div className="text-[var(--neon-red)] text-sm text-center animate-fade-in-up">
              {error}
            </div>
          )}
          
          {/* Username */}
          <div>
            <label className="text-[var(--white-smoke)] text-sm sm:text-base">Username</label>
            <input
              type="text"
              name="username"
              value={signUpData.username}
              onChange={handleSignUpChange}
              className="w-full mt-1 p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus:shadow-[0_0_15px_var(--pink-glow)] focus:outline-none"
              placeholder="Enter your username"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-[var(--white-smoke)] text-sm sm:text-base">Email</label>
            <input
              type="email"
              name="email"
              value={signUpData.email}
              onChange={handleSignUpChange}
              className="w-full mt-1 p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus:shadow-[0_0_15px_var(--pink-glow)] focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-[var(--white-smoke)] text-sm sm:text-base">Password</label>
            <input
              type="password"
              name="password"
              value={signUpData.password}
              onChange={handleSignUpChange}
              className="w-full mt-1 p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus:shadow-[0_0_15px_var(--pink-glow)] focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

        
          <div>
            <label className="text-[var(--white-smoke)] text-sm sm:text-base">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={signUpData.confirmPassword}
              onChange={handleSignUpChange}
              className="w-full mt-1 p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus:shadow-[0_0_15px_var(--pink-glow)] focus:outline-none"
              placeholder="Re-enter your password"
            />
          </div>
          
          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            className="w-full py-2 bg-[var(--neon-purple)] text-[var(--white-smoke)] rounded-md text-base font-semibold hover:bg-[var(--soft-violet)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300"
          >
            Sign Up
          </button>

          {/* Social Buttons */}
          <div className="text-center text-[var(--white-smoke)] text-sm">Or sign up with</div>
          <div className="flex justify-center gap-4">
            <button onClick={() => handleSocialLogin('Google')} className="w-10 h-10 bg-[var(--dark-charcoal)] border-2 border-[var(--neon-pink)] rounded-full shadow-[0_0_10px_var(--pink-glow)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300" aria-label="Sign up with Google">
              <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" className="w-6 h-6 mx-auto" />
            </button>
            <button onClick={() => handleSocialLogin('Facebook')} className="w-10 h-10 bg-[var(--dark-charcoal)] border-2 border-[var(--electric-blue)] rounded-full shadow-[0_0_10px_var(--blue-glow)] hover:shadow-[0_0_15px_var(--blue-glow)] transition-all duration-300" aria-label="Sign up with Facebook">
              <img src="https://img.icons8.com/color/24/facebook-new.png" alt="Facebook" className="w-6 h-6 mx-auto" />
            </button>
            <button onClick={() => handleSocialLogin('LinkedIn')} className="w-10 h-10 bg-[var(--dark-charcoal)] border-2 border-[var(--aqua-glow)] rounded-full shadow-[0_0_10px_var(--blue-glow)] hover:shadow-[0_0_15px_var(--blue-glow)] transition-all duration-300" aria-label="Sign up with LinkedIn">
              <img src="https://img.icons8.com/color/24/linkedin.png" alt="LinkedIn" className="w-6 h-6 mx-auto" />
            </button>
            <button onClick={() => handleSocialLogin('Twitter')} className="w-10 h-10 bg-[var(--dark-charcoal)] border-2 border-[var(--cyber-yellow)] rounded-full shadow-[0_0_10px_var(--green-glow)] hover:shadow-[0_0_15px_var(--green-glow)] transition-all duration-300" aria-label="Sign up with Twitter">
              <img src="https://img.icons8.com/color/24/twitter--v1.png" alt="Twitter" className="w-6 h-6 mx-auto" />
            </button>
            <button onClick={() => handleSocialLogin('GitHub')} className="w-10 h-10 bg-[var(--dark-charcoal)] border-2 border-[var(--neon-purple)] rounded-full shadow-[0_0_10px_var(--pink-glow)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300" aria-label="Sign up with GitHub">
              <img src="https://img.icons8.com/color/24/github.png" alt="GitHub" className="w-6 h-6 mx-auto" />
            </button>
          </div>

          {/* Redirect */}
          <p className="text-[var(--white-smoke)] text-sm text-center">
            Already have an account?{' '}
            <Link to="/signin" className="text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
