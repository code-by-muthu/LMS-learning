import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navigation/Navbar';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ReviewDetailsPage from './pages/ReviewDetailsPage';
import AllCourses from './pages/AllCourses';
import Categories from './pages/Categories';
import CategoryCourses from './pages/CategoryCourses';
import CoursePage from './pages/CoursePage';
import LearningLayout from './components/Course/LearningLayout';
import Assessment from './pages/Assessment';
import PricingPage from './pages/PricingPage'; // Add this
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Core Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            
            {/* Course Routes */}
            <Route path="/courses" element={<AllCourses />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryName" element={<CategoryCourses />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/course/:id/learn" element={<LearningLayout />} />
            
            {/* Assessment and Certificate Routes */}
            <Route path="/assessment/:id" element={<Assessment />} />
            
            {/* Review Route */}
            <Route path="/review/:id" element={<ReviewDetailsPage />} />
            
            {/* Pricing Route */}
            <Route path="/pricing" element={<PricingPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;