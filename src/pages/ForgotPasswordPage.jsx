import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email+CAPTCHA+OTP, 2: New Password, 3: Success
  const [email, setEmail] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [otpSentCount, setOtpSentCount] = useState(0);
  const [resendTimer, setResendTimer] = useState(0);

  // Timer effect for Resend OTP
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setNotification({ message: '', type: '' });
  };

  const handleCaptchaChange = (e) => {
    setCaptchaChecked(e.target.checked);
    setNotification({ message: '', type: '' });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setNotification({ message: '', type: '' });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setNotification({ message: '', type: '' });
  };

  const handleSendOtp = () => {
    try {
      if (!email.includes('@')) {
        throw new Error('Invalid email address');
      }
      if (!captchaChecked) {
        throw new Error('Please complete the CAPTCHA');
      }
      if (otpSentCount >= 3) {
        throw new Error('Maximum OTP requests reached. Try again later.');
      }
      // Placeholder for sending OTP (replace with API call)
      console.log('Sending OTP to:', email);
      setOtpSentCount(otpSentCount + 1);
      setShowOtpField(true); // Show OTP input field
      setCaptchaChecked(false); // Hide CAPTCHA
      setResendTimer(60); // Start 60-second timer
      setNotification({ message: 'OTP sent to your email!', type: 'success' });
    } catch (err) {
      setNotification({ message: `Failed to send OTP: ${err.message}`, type: 'error' });
      console.error('Send OTP error:', err.message);
    }
  };

  const handleResendOtp = () => {
    try {
      if (otpSentCount >= 3) {
        throw new Error('Maximum OTP requests reached. Try again later.');
      }
      // Placeholder for resending OTP (replace with API call)
      console.log('Resending OTP to:', email);
      setOtpSentCount(otpSentCount + 1);
      setResendTimer(60); // Restart 60-second timer
      setNotification({ message: 'OTP resent to your email!', type: 'success' });
    } catch (err) {
      setNotification({ message: `Failed to resend OTP: ${err.message}`, type: 'error' });
      console.error('Resend OTP error:', err.message);
    }
  };

  const handleVerifyOtp = () => {
    try {
      // Placeholder for OTP verification (replace with API call)
      console.log('Verifying OTP:', otp);
      if (otp.length !== 6 || isNaN(otp)) {
        throw new Error('Invalid OTP: Must be a 6-digit number');
      }
      setNotification({ message: 'OTP verified successfully!', type: 'success' });
      setTimeout(() => {
        setStep(2); // Move to password reset step
        setNotification({ message: '', type: '' });
      }, 2000); // Show notification for 2 seconds
    } catch (err) {
      setNotification({ message: `OTP verification failed: ${err.message}`, type: 'error' });
      console.error('OTP verification error:', err.message);
    }
  };

  const handleResetPassword = () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('New password and confirm password do not match');
      }
      if (passwordData.newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long');
      }
      // Placeholder for password reset (replace with API call)
      console.log('Resetting password:', passwordData);
      setNotification({ message: 'Password reset successfully!', type: 'success' });
      setStep(3); // Move to success step
      setTimeout(() => {
        navigate('/signin'); // Redirect to sign-in page after 3 seconds
      }, 3000);
    } catch (err) {
      setNotification({ message: `Password reset failed: ${err.message}`, type: 'error' });
      console.error('Password reset error:', err.message);
    }
  };

  return (
    <div className="bg-[var(--main-bg)] min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className="relative w-full max-w-md bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_20px_var(--blue-glow)] p-6 sm:p-8">
        {/* Background Glow Effects */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-[var(--neon-purple)] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[var(--electric-blue)] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

        {/* Forgot Password Form */}
        <div className="relative z-10 flex flex-col space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_15px_var(--blue-glow)] text-center">
            {step === 1 ? 'Reset Password' : step === 2 ? 'Set New Password' : 'Password Reset'}
          </h2>

          {step === 1 && (
            <>
              <div>
                <label className="text-[var(--white-smoke)] text-sm sm:text-base">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full mt-1 p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus:shadow-[0_0_15px_var(--pink-glow)] focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              {!showOtpField && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={captchaChecked}
                    onChange={handleCaptchaChange}
                    className="w-5 h-5 accent-[var(--neon-pink)]"
                  />
                  <label className="text-[var(--white-smoke)] text-sm">I'm not a robot</label>
                </div>
              )}
              {showOtpField && (
                <div>
                  <label className="text-[var(--white-smoke)] text-sm sm:text-base">OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    className="w-full mt-1 p-2 rounded-md bg-[var(--main-bg)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus:shadow-[0_0_15px_var(--pink-glow)] focus:outline-none"
                    placeholder="Enter 6-digit OTP"
                  />
                </div>
              )}
              <div className="flex space-x-4">
                {!showOtpField ? (
                  <button
                    onClick={handleSendOtp}
                    className="flex-1 py-2 bg-[var(--neon-pink)] text-[var(--dark-charcoal)] rounded-md text-base font-semibold hover:bg-[var(--aqua-glow)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300"
                  >
                    Send OTP
                  </button>
                ) : (
                  <button
                    onClick={handleVerifyOtp}
                    className="flex-1 py-2 bg-[var(--neon-pink)] text-[var(--dark-charcoal)] rounded-md text-base font-semibold hover:bg-[var(--aqua-glow)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300"
                  >
                    Verify OTP
                  </button>
                )}
                <button
                  onClick={handleResendOtp}
                  disabled={otpSentCount === 0 || otpSentCount >= 3 || resendTimer > 0}
                  className="flex-1 py-2 bg-[var(--dark-charcoal)] text-[var(--white-smoke)] rounded-md text-base font-semibold border-2 border-[var(--neon-purple)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                </button>
              </div>
            </>
          )}

          {step === 2 && (
  <>
    {/* New Password */}
    <div className="relative">
      <label className="text-[var(--white-smoke)] text-sm sm:text-base">
        New Password
      </label>
      <input
        type={showNewPassword ? "text" : "password"}
        name="newPassword"
        value={passwordData.newPassword}
        onChange={handlePasswordChange}
        className="w-full mt-1 p-2 pr-10 rounded-md bg-[var(--dark-charcoal)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus:shadow-[0_0_15px_var(--pink-glow)] focus:outline-none"
        placeholder="Enter new password"
      />
      {passwordData.newPassword && ( // 👈 only show when user types
        <button
          onClick={() => setShowNewPassword(!showNewPassword)}
          className="absolute right-2 top-9"
          aria-label={showNewPassword ? "Hide password" : "Show password"}
        >
          <img
            src={
              showNewPassword
                ? "https://img.icons8.com/material-outlined/24/visible.png"
                : "https://img.icons8.com/material-outlined/24/invisible.png"
            }
            alt={showNewPassword ? "Hide password" : "Show password"}
            className="w-5 h-5"
            style={{
              filter:
                "invert(67%) sepia(92%) saturate(7480%) hue-rotate(140deg) brightness(101%) contrast(101%)",
            }}
          />
        </button>
      )}
    </div>

    {/* Confirm Password */}
    <div className="relative">
      <label className="text-[var(--white-smoke)] text-sm sm:text-base">
        Confirm New Password
      </label>
      <input
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        value={passwordData.confirmPassword}
        onChange={handlePasswordChange}
        className="w-full mt-1 p-2 pr-10 rounded-md bg-[var(--dark-charcoal)] text-[var(--white-smoke)] text-base shadow-[inset_0_0_10px_var(--blue-glow)] focus:shadow-[0_0_15px_var(--pink-glow)] focus:outline-none"
        placeholder="Confirm new password"
      />
      {passwordData.confirmPassword && ( // 👈 only show when user types
        <button
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-2 top-9"
          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
        >
          <img
            src={
              showConfirmPassword
                ? "https://img.icons8.com/material-outlined/24/visible.png"
                : "https://img.icons8.com/material-outlined/24/invisible.png"
            }
            alt={showConfirmPassword ? "Hide password" : "Show password"}
            className="w-5 h-5"
            style={{
              filter:
                "invert(67%) sepia(92%) saturate(7480%) hue-rotate(140deg) brightness(101%) contrast(101%)",
            }}
          />
        </button>
      )}
    </div>

    {/* Reset Button */}
    <button
      onClick={handleResetPassword}
      className="w-full py-2 bg-[var(--neon-pink)] text-[var(--dark-charcoal)] rounded-md text-base font-semibold hover:bg-[var(--aqua-glow)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300"
    >
      Reset Password
    </button>
  </>
)}

          {step === 3 && (
            <div className="text-center text-[var(--white-smoke)] text-sm">
              Redirecting to Sign In...
            </div>
          )}

          {step !== 3 && (
            <p className="text-[var(--white-smoke)] text-sm text-center">
              Back to{' '}
              <Link
                to="/signin"
                className="text-[var(--neon-pink)] hover:[text-shadow:0_0_10px_var(--pink-glow)]"
              >
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;