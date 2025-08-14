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
    <div className="bg-[var(--main-bg)]">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <CoursePreviewSection />
      
      <CTASection />
      <ErrorLearningSection />
      <ReviewsSection/>
      <Footer />
    </div>
  );
};

export default Home;