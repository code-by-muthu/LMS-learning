import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { FaDownload, FaShareAlt, FaTrophy, FaUserCircle } from "react-icons/fa";
import { jsPDF } from 'jspdf';

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
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
  const userName = 'Pon Durai'; // Hardcoded or fetch from auth
  const certificateImagePath = '/images/Certificate/Certificate_Template.png';

  useEffect(() => {
    // Fetch course data from JSON file
    fetch('/data/courses.json')
      .then((response) => response.json())
      .then((data) => {
        // Map to certificate format, assuming all are completed
        const completedCourses = data.map(course => ({
          id: course.id,
          title: course.title,
          level: course.level,
          completed: '2025-09-16',
          color: getLevelColor(course.level).split('-')[1],
          creator: course.creator,
          duration: course.hours + ' hours',
        }));
        setCertificates(completedCourses);
      })
      .catch((error) => console.error('Error fetching courses:', error));

    gsap.fromTo(
      '.certificate-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: 'success' });
      }, 3000); // Automatically dismiss after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-500';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 border-blue-500';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 border-purple-500';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-500';
    }
  };

  const getIconColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'text-green-500';
      case 'Intermediate':
        return 'text-blue-500';
      case 'Advanced':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleDownload = (cert) => {
    setLoading(true);

    const img = new Image();
    img.src = certificateImagePath;
    img.onload = () => {
      const templateWidthPx = img.width;
      const templateHeightPx = img.height;
      const mmPerPx = 0.264583;
      const pdfWidth = templateWidthPx * mmPerPx;
      const pdfHeight = templateHeightPx * mmPerPx;

      const doc = new jsPDF({
        orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
      });

      doc.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(75);
      doc.setTextColor(10, 48, 98);
      doc.text(` ${cert.id}`, pdfWidth - 480, 75, { align: 'left' });
      doc.text(`lmsplatform.com/certificate/${cert.id}`, pdfWidth - 610, 125, { align: 'left' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(220);
      doc.setTextColor(10, 47, 97);
      doc.text(userName, 120, 690);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(95);
      doc.setTextColor(10, 47, 97);
      doc.text(`${cert.title}`, pdfWidth - 990, 759, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(100);
      doc.setTextColor(10, 47, 97);
      doc.text(`: ${cert.creator}`, 330, 853);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(95);
      doc.setTextColor(10, 47, 97);
      doc.text(`: ${cert.completed}`, 200, pdfHeight - 101);
      doc.text(`: ${cert.duration}`, 230, pdfHeight - 43);

      const fileName = `Certificate_${cert.id}_${userName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
      doc.save(fileName);

      setTimeout(() => {
        setLoading(false);
        setNotification({ message: `Certificate downloaded successfully!`, type: 'success' });
      }, 1000);
    };

    img.onerror = () => {
      console.error('Failed to load certificate template image.');
      setLoading(false);
      setNotification({ message: 'Failed to load certificate template image.', type: 'error' });
    };
  };

  const handleShare = (cert) => {
    const shareUrl = `https://lmsplatform.com/certificate/${cert.id}`;
    const shareData = {
      title: 'My Certificate',
      text: `Check out my certificate for ${cert.title}!`,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData)
        .then(() => {
          setNotification({ message: 'Certificate shared successfully!', type: 'success' });
        })
        .catch((error) => {
          console.error('Error sharing:', error);
          fallbackCopyToClipboard(shareUrl);
        });
    } else {
      fallbackCopyToClipboard(shareUrl);
    }
  };

  const fallbackCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setNotification({ message: 'Link copied to clipboard!', type: 'success' });
      })
      .catch((err) => {
        console.error('Failed to copy link:', err);
        setNotification({ message: 'Failed to copy link to clipboard.', type: 'error' });
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--main-bg)]">
        <div className="text-[var(--white-smoke)] text-lg font-semibold animate-pulse">Loading Certificates...</div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--main-bg)]  text-[var(--white-smoke)] min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl py-4 lg:py-4 sm:py-8">
        <div className="flex items-center mb-6">
          <FaTrophy className="text-[var(--neon-purple)] text-3xl mr-2 [text-shadow:0_0_10px_var(--pink-glow)]" />
          <h1 className="text-3xl font-bold text-[var(--white-smoke)]">Certificates</h1>
        </div>
        <p className="text-[var(--white-smoke)] opacity-80 mb-8">
          You've earned it! Discover your achievements and download your certificates here.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Earned Certificates Section with Scroll and Hidden Scrollbar, Reduced Size */}
          <div className="md:col-span-2 bg-[var(--dark-charcoal)] p-6 rounded-lg shadow-[0_0_15px_var(--blue-glow)] overflow-y-auto max-h-[70vh] no-scrollbar h-full">
            <h2 className="text-xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_10px_var(--blue-glow)] mb-4">
              Earned Certificates
            </h2>
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="certificate-card flex items-center justify-between bg-[var(--main-bg)] p-4 rounded-lg shadow-[0_0_10px_rgba(0,255,255,0.4)] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full ${getIconColor(cert.level)} bg-[var(--dark-charcoal)] flex items-center justify-center`}>
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[var(--white-smoke)]">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-[var(--white-smoke)] opacity-80">
                        Completed: {cert.completed}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(cert.level)} bg-opacity-20`}>
                      {cert.level}
                    </span>
                    <FaDownload
                      className="text-[var(--white-smoke)] hover:text-[var(--acid-green)] cursor-pointer"
                      onClick={() => handleDownload(cert)}
                      disabled={loading}
                    />
                    <FaShareAlt
                      className="text-[var(--white-smoke)] hover:text-[var(--neon-pink)] cursor-pointer"
                      onClick={() => handleShare(cert)}
                      disabled={loading}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Section */}
          <div className="relative bg-[var(--dark-charcoal)] p-6 rounded-lg shadow-[0_0_15px_var(--blue-glow)] border border-[var(--dark-charcoal)] max-h-[70vh] h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_10px_var(--blue-glow)]">
                Progress
              </h2>
              <FaTrophy className="text-yellow-400 text-2xl drop-shadow-[0_0_8px_gold]" />
            </div>
           
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center gap-4 bg-[var(--dark-charcoal)]/60 shadow-[0_0_12px_var(--purple-glow)] w-full">
                <div className="flex items-center gap-0 ">
                  <div className="p-2 rounded-full inline-flex items-center justify-center">
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
                <p className="text-sm text-[var(--white-smoke)] mt-1">250 XP needed for level 9</p>
              </div>
              <div className="flex flex-col-3 text-center w-full justify-between">
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
                <p className="text-sm text-[var(--white-smoke)] opacity-80">30 minutes of learning</p>
              </div>
            </div>
          </div>
        </div>
        {notification.message && (
          <div className={`fixed bottom-4 right-4 p-4 rounded-lg ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white`}>
            {notification.message}
            <button onClick={() => setNotification({ message: '', type: 'success' })} className="ml-4">&times;</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificate;