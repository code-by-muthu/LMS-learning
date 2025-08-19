import React from 'react';
import Navbar from '../navigation/Navbar';
import Hero from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import CoursePreviewSection from '../components/Home/CoursePreviewSection';
import ErrorLearningSection from '../components/Home/ErrorLearningSection';
import CTASection from '../components/Home/CTASection';
import Footer from '../components/Home/Footer';
import ReviewsSection from '../components/Home/ReviewsSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-[var(--main-bg)] overflow-x-hidden">
      <style>
        {`
          html, body {
            overflow-x: hidden;
            max-width: 100vw;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          * {
            box-sizing: border-box;
          }
        `}
      </style>
      {/* <Navbar /> */}
      <main className="w-full overflow-x-hidden">
        <Hero />
        <FeaturesSection />
        <CTASection />
        <CoursePreviewSection />
        
        <ErrorLearningSection />
        <ReviewsSection />
        <Footer />
      </main>
    </div>
  );
};

export default Home;