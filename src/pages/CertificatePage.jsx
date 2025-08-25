import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { gsap } from 'gsap';
import Notification from '../components/Course/Notification';
import Button from '../components/ui/Button';

const CertificatePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [loading, setLoading] = useState(false);

  // Dummy data with specific values
  const dummyCourse = {
    id: '101 ouwdiougwfiugiy', // Fixed course number
    title: '123 React for Beginners', // Fixed course title
    duration: '15 hours',
  };
  const userName = 'Pon Dhuri'; // Replace with actual user data if available
  const instructorName = 'Jon Joe'; // Fixed instructor name
  const certificateImagePath = '/images/Certificate/Certificate_Template.png'; // Ensure this matches your public folder

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotification({ message: '', type: 'success' });
    }, 1000);
  }, [courseId]);

  useEffect(() => {
    gsap.fromTo(
      '.certificate-container',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo(
      '.action-button',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', delay: 0.5 }
    );
  }, []);

  const handleDownload = () => {
    setLoading(true);

    const img = new Image();
    img.src = certificateImagePath;
    img.onload = () => {
      // Get actual image size in pixels
      const templateWidthPx = img.width;
      const templateHeightPx = img.height;

      // Convert pixels → millimeters (1px = 0.264583 mm)
      const mmPerPx = 0.264583;
      const pdfWidth = templateWidthPx * mmPerPx;
      const pdfHeight = templateHeightPx * mmPerPx;

      // Create PDF with exact same size as image
      const doc = new jsPDF({
        orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
      });

      // Add image exactly covering full page
      doc.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);

      
      for (let y = 50; y < pdfHeight; y += 50) {
        doc.setFontSize(10);
        doc.text(`${y}`, 20, y);
      }
      for (let x = 50; x < pdfWidth; x += 50) {
        doc.setFontSize(10);
        doc.text(`${x}`, x, 20);
      }
     

      // === Add Text Overlay (adjust X/Y to align perfectly with template) ===
      doc.setFont('helvetica', 'normal');

      // Certificate Number & URL (top-right)
      doc.setFontSize(75);
      doc.setTextColor(10, 48, 98); // #0a3062 in RGB
      doc.text(` ${dummyCourse.id}`, pdfWidth - 480, 75, { align: 'left' });
      doc.text(`lmsplatform.com/certificate/${dummyCourse.id}`, pdfWidth - 610, 125, { align: 'left' });

      // Student name (big & bold, neon-pink)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(220); // Larger font for prominence
      doc.setTextColor(255, 0, 255); // --neon-pink (#FF00FF)
      doc.text(userName, 120, 690);

      // Course title (slightly smaller, electric-blue)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(95); // Moderate size
      doc.setTextColor(0, 255, 255); // --electric-blue (#00FFFF)
      doc.text(`${dummyCourse.title} `, pdfWidth - 960, 758, { align: 'center' });

      // Instructor (smaller, acid-green)
      doc.setFontSize(25); // Smaller size
      doc.setTextColor(57, 255, 20); // --acid-green (#39FF14)
      doc.text(`Instructor: ${instructorName}`, 350, 850);

      // Date & Duration (bottom-left, original black)
      doc.setFontSize(22);
      doc.setTextColor(0, 0, 0); // Black for readability
      doc.text(`Date: 25-09-2025`, 200, pdfHeight - 200);
      doc.text(`Length: ${dummyCourse.duration}`, 200, pdfHeight - 160);

      // Save file
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0A0A23] to-[#1A1A2E]">
        <div className="text-[#F5F5F5] text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A23] to-[#1A1A2E] text-[#F5F5F5] py-16 lg:py-20">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9B00FA]/20 via-[#00B7EB]/20 to-[#00FF85]/20 animate-pulse rounded-xl"></div>
        <div className="relative z-10 p-10 bg-[#0A0A23]/80 rounded-xl shadow-[0_0_30px_rgba(0,183,235,0.6)] border border-[#00B7EB]/30 backdrop-blur-md">
          <h1 className="text-5xl font-extrabold text-[#00B7EB] [text-shadow:0_0_25px_rgba(0,183,235,0.9)] text-center mb-12">
            Certificate Preview
          </h1>
          <div className="text-center mb-12">
            <p className="text-3xl font-semibold text-[#00FF85] [text-shadow:0_0_10px_rgba(0,255,133,0.7)]">
              Presented to: {userName}
            </p>
          </div>
          <div className="flex justify-center gap-8">
            <Button
              variant="primary"
              onClick={handleDownload}
              disabled={loading}
              loading={loading}
              className="px-10 py-4 bg-gradient-to-r from-[#9B00FA] to-[#00FF85] text-[#F5F5F5] font-bold rounded-xl shadow-lg hover:shadow-[0_0_40px_rgba(155,0,250,0.8)] transition-all duration-300 text-xl"
            >
              Download Certificate
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate(`/course/${courseId || '101'}`)}
              disabled={loading}
              className="px-10 py-4 bg-gradient-to-r from-[#9B00FA] to-[#00FF85] text-[#F5F5F5] font-bold rounded-xl shadow-lg hover:shadow-[0_0_40px_rgba(155,0,250,0.8)] transition-all duration-300 text-xl"
            >
              Back to Course
            </Button>
          </div>
        </div>
      </div>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />
    </div>
  );
};

export default CertificatePage;