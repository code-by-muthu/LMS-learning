import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Course/Notification';
import { gsap } from 'gsap';

const PricingPage = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [isSubscribed, setIsSubscribed] = useState(false); // Replace with auth check
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      // Simulated API call (replace with your backend endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      setIsSubscribed(true);
      setNotification({
        message: isSubscribed ? 'Already subscribed!' : 'Subscription successful! You now have access to premium courses.',
        type: 'success',
      });
      setTimeout(() => navigate('/courses'), 2000); // Redirect to courses
    } catch (err) {
      console.error('Subscription error:', err);
      setNotification({ message: 'Failed to subscribe. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    gsap.fromTo(
      '.pricing-card',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)] py-8 sm:py-12 lg:py-16">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-pink)]/20 via-[var(--electric-blue)]/20 to-[var(--acid-green)]/20 animate-pulse"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_20px_var(--blue-glow)] mb-6">
            Subscription Plans
          </h1>
          <p className="text-base sm:text-lg text-[var(--white-smoke)] opacity-80 mb-8">
            Unlock premium courses, assessments, and certificates with our subscription plan.
          </p>
          <div className="flex justify-center">
            <div className="pricing-card bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_15px_var(--blue-glow)] p-6 sm:p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold text-[var(--neon-purple)] mb-4">
                Individual Plan
              </h2>
              <p className="text-lg text-[var(--white-smoke)] opacity-80 mb-4">
                15-day free trial, then ₹999/month
              </p>
              <ul className="text-sm text-[var(--white-smoke)] opacity-80 mb-6 space-y-2">
                <li>✔ Access to all premium courses</li>
                <li>✔ Downloadable certificates</li>
                <li>✔ Advanced assessments</li>
                <li>✔ Priority support</li>
              </ul>
              <button
                onClick={handleSubscribe}
                disabled={isLoading || isSubscribed}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isLoading || isSubscribed
                    ? 'bg-[var(--dark-charcoal)] text-[var(--white-smoke)] opacity-50 cursor-not-allowed'
                    : 'bg-[var(--neon-purple)] text-[var(--white-smoke)] hover:bg-[var(--electric-blue)] hover:shadow-[0_0_15px_var(--blue-glow)]'
                }`}
              >
                {isLoading
                  ? 'Processing...'
                  : isSubscribed
                  ? 'Subscribed'
                  : 'Start Free Trial'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;