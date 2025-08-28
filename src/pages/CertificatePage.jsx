import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { gsap } from 'gsap';
import Notification from '../components/Course/Notification';
import Button from '../components/ui/Button';
import certificateData from '../../public/data/certificateData.json'; // adjust path as needed

const CertificatePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [loading, setLoading] = useState(false);

  // Load data from JSON
  const { dummyCourse, userName, instructorName, certificateImagePath, completedOn } = certificateData;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotification({ message: '', type: 'success' });
    }, 1000);
  }, [courseId]);

  useEffect(() => {
    gsap.fromTo('.content-container', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    gsap.fromTo('.action-button', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', delay: 0.3 });
  }, []);

  const handleDownload = () => {
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
      doc.text(` ${dummyCourse.id}`, pdfWidth - 480, 75, { align: 'left' });
      doc.text(`lmsplatform.com/certificate/${dummyCourse.id}`, pdfWidth - 610, 125, { align: 'left' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(220);
      doc.setTextColor(10, 47, 97);
      doc.text(userName, 120, 690);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(95);
      doc.setTextColor(10, 47, 97);
      doc.text(`${dummyCourse.title}`, pdfWidth - 990, 759, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(100);
      doc.setTextColor(10, 47, 97);
      doc.text(`: ${instructorName}`, 330, 853);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(95);
      doc.setTextColor(10, 47, 97);
      doc.text(`: ${completedOn}`, 200, pdfHeight - 101);
      doc.text(`: ${dummyCourse.duration}`, 230, pdfHeight - 43);

      const fileName = `Certificate_${dummyCourse.id}_${userName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
      doc.save(fileName);

      setTimeout(() => {
        setNotification({ message: `Certificate downloaded successfully!`, type: 'success' });
        setLoading(false);
      }, 1000);
    };

    img.onerror = () => {
      setNotification({ message: 'Failed to load certificate template image.', type: 'error' });
      setLoading(false);
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--main-bg)]">
        <div className="text-[var(--white-smoke)] text-lg font-semibold animate-pulse">Loading Certificate...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--main-bg)] text-[var(--white-smoke)] py-12 sm:py-16">
      <div className="content-container container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="bg-[var(--dark-charcoal)] rounded-lg p-6 sm:p-8 border border-[var(--neon-purple)]/30 shadow-[0_0_10px_var(--pink-glow)]">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--neon-pink)] mb-6 text-center">
            Congratulations on Your Achievement!
          </h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg sm:text-xl text-[var(--white-smoke)] mb-4">
              We're thrilled to celebrate your completion of{' '}
              <span className="text-[var(--electric-blue)] font-semibold">{dummyCourse.title}</span>!
            </p>
            <p className="text-base sm:text-lg text-[var(--white-smoke)] opacity-80 mb-4">
              Awarded to: <span className="text-[var(--acid-green)]">{userName}</span>
            </p>
            <p className="text-base sm:text-lg text-[var(--white-smoke)] opacity-80 mb-4">
              Instructor: <span className="text-[var(--acid-green)]">{instructorName}</span>
            </p>
            <p className="text-base sm:text-lg text-[var(--white-smoke)] opacity-80 mb-6">
              Completed on: <span className="text-[var(--acid-green)]">{completedOn}</span> | Duration:{' '}
              <span className="text-[var(--acid-green)]">{dummyCourse.duration}</span>
            </p>
            <p className="text-base sm:text-lg text-[var(--white-smoke)] opacity-80 mb-8">
              Your certificate is ready for download. Share your achievement with your network and continue your learning journey with us!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Button
              variant="primary"
              onClick={handleDownload}
              disabled={loading}
              loading={loading}
              className="action-button px-6 py-3 bg-[var(--neon-pink)] text-[var(--dark-charcoal)] font-semibold rounded-md hover:bg-[var(--electric-blue)] hover:text-[var(--white-smoke)] transition-all duration-300"
            >
              Download Certificate
            </Button>
            <button
              onClick={() => navigate(`/course/${courseId || '101'}`)}
              disabled={loading}
              className="action-button px-6 py-3 text-[var(--aqua-glow)] font-semibold hover:text-[var(--neon-purple)] transition-all duration-300"
            >
              Back to Course
            </button>
          </div>
        </div>
      </div>
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: 'success' })} />
    </div>
  );
};

export default CertificatePage;
