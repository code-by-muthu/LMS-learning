import React, { useState, useEffect } from 'react';
import { FaQuestionCircle, FaEnvelope, FaClock, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Try static import, with fallback to fetch
let faqs = [];
try {
  faqs = require('../data/faqs.json'); // Static import for Vite
} catch (error) {
  console.warn('Static import of faqs.json failed:', error);
}

const SupportPage = () => {
  // State for FAQs
  const [openFaq, setOpenFaq] = useState(null);
  const [faqData, setFaqData] = useState(faqs);

  // Fallback to fetch if static import fails
  useEffect(() => {
    if (faqData.length === 0) {
      fetch('/data/faqs.json')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch faqs.json');
          return res.json();
        })
        .then((data) => setFaqData(data))
        .catch((err) => console.error('Error fetching FAQs:', err));
    }
  }, []);

  // State for contact form
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });


  const handleFaqToggle = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Please fill in all fields.');
      return;
    }
    alert('Contact form submitted! We will get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-[var(--main-bg)] text-[var(--white-smoke)] min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--neon-pink)] [text-shadow:0_0_12px_var(--pink-glow)]">
            Support Center
          </h1>
          <p className="text-base sm:text-lg text-[var(--white-smoke)]/80 mt-2">
            Get help with your LMS journey, from subscriptions to certificates.
          </p>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_8px_var(--blue-glow)] mb-4 sm:mb-6 flex items-center gap-2">
            <FaQuestionCircle className="text-[var(--neon-purple)]" /> Frequently Asked Questions
          </h2>
          {faqData.length === 0 ? (
            <p className="text-sm sm:text-base text-[var(--white-smoke)]/80">
              Loading FAQs...
            </p>
          ) : (
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-[var(--dark-charcoal)] p-4 rounded-xl border-l-4 border-[var(--neon-purple)] shadow-[0_0_8px_rgba(155,89,255,0.4)] hover:shadow-[0_0_12px_rgba(155,89,255,0.6)] transition-shadow duration-300"
                >
                  <button
                    onClick={() => handleFaqToggle(index)}
                    className="w-full text-left text-base sm:text-lg font-semibold text-[var(--white-smoke)] flex justify-between items-center"
                  >
                    {faq.question}
                    <span>{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <div
                      className="mt-2 text-[var(--white-smoke)]/80 text-sm sm:text-base"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subscription Status */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--acid-green)] [text-shadow:0_0_8px_var(--green-glow)] mb-4 sm:mb-6 flex items-center gap-2">
            <FaUsers className="text-[var(--neon-purple)]" /> Subscription Status
          </h2>
          <div className="bg-[var(--dark-charcoal)] p-4 sm:p-6 rounded-xl border-l-4 border-[var(--acid-green)] shadow-[0_0_8px_rgba(155,89,255,0.4)]">
            <p className="text-[var(--white-smoke)]/80 text-sm sm:text-base mb-4">
              Check your subscription status on the <Link to="/profile" className="text-[var(--neon-pink)] hover:underline">Profile</Link> page. During the 15-day free trial, you have access to basic courses. To unlock advanced courses, assessments, and certificate downloads, upgrade your plan on the <Link to="/pricing" className="text-[var(--neon-pink)] hover:underline">Pricing Page</Link>.
            </p>
            <Link
              to="/pricing"
              className="inline-block px-4 py-2 bg-[var(--neon-pink)] text-[var(--dark-charcoal)] rounded-lg text-sm sm:text-base font-semibold hover:bg-[var(--aqua-glow)] hover:text-[var(--dark-charcoal)] transition-all duration-300 min-h-[44px]"
            >
              Upgrade Now
            </Link>
          </div>
        </div>

        {/* Support Hours */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_8px_var(--blue-glow)] mb-4 sm:mb-6 flex items-center gap-2">
            <FaClock className="text-[var(--neon-purple)]" /> Support Hours
          </h2>
          <div className="bg-[var(--dark-charcoal)] p-4 sm:p-6 rounded-xl border-l-4 border-[var(--electric-blue)] shadow-[0_0_8px_rgba(155,89,255,0.4)]">
            <p className="text-[var(--white-smoke)]/80 text-sm sm:text-base">
              Our support team is available to assist you:
              <br />
              <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM IST
              <br />
              <strong>Saturday:</strong> 10:00 AM - 2:00 PM IST
              <br />
              <strong>Sunday:</strong> Closed
              <br />
              For urgent issues, use the contact form below or email{' '}
              <a href="mailto:support@example.com" className="text-[var(--neon-pink)] hover:underline">
                support@example.com
              </a>.
            </p>
          </div>
        </div>

        {/* Contact Support */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_8px_var(--blue-glow)] mb-4 sm:mb-6 flex items-center gap-2">
            <FaEnvelope className="text-[var(--neon-purple)]" /> Contact Support
          </h2>
          <div className="bg-[var(--dark-charcoal)] p-4 sm:p-6 rounded-xl border-l-4 border-[var(--electric-blue)] shadow-lg">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-[var(--white-smoke)] mb-1 block">
                  Name
                </label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  placeholder="Your Name"
                  className="w-full p-2 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded-lg text-[var(--white-smoke)] text-sm focus:outline-none focus:shadow-[0_0_8px_rgba(255,0,255,0.4)] min-h-[44px]"
                />
              </div>
              <div>
                <label className="text-sm text-[var(--white-smoke)] mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  placeholder="Your Email"
                  className="w-full p-2 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded-lg text-[var(--white-smoke)] text-sm focus:outline-none focus:shadow-[0_0_8px_rgba(255,0,255,0.4)] min-h-[44px]"
                />
              </div>
              <div>
                <label className="text-sm text-[var(--white-smoke)] mb-1 block">
                  Message
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  placeholder="Describe your issue..."
                  className="w-full p-2 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded-lg text-[var(--white-smoke)] text-sm focus:outline-none focus:shadow-[0_0_8px_rgba(255,0,255,0.4)] min-h-[120px]"
                  rows="5"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--neon-pink)] text-[var(--dark-charcoal)] rounded-lg py-2 text-sm sm:text-base font-semibold hover:bg-[var(--aqua-glow)] hover:text-[var(--dark-charcoal)] transition-all duration-300 min-h-[44px]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;