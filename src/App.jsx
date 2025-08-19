import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navigation/Navbar';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CertificatePage from './pages/CertificatePage';
import ReviewDetailsPage from './pages/ReviewDetailsPage';
import AllCourses from './pages/AllCourses';
import Categories from './pages/Categories';
import CategoryCourses from './pages/CategoryCourses';
import Course from './pages/Course';
import Assessment from './pages/Assessment';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/certificate/:id" element={<CertificatePage />} />
            <Route path="/review/:id" element={<ReviewDetailsPage />} />
            <Route path="/courses" element={<AllCourses />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryName" element={<CategoryCourses />} />
            <Route path="/category/:categoryName/errors" element={<CategoryCourses />} /> {/* Placeholder until ErrorList is created */}
            <Route path="/course/:id" element={<Course />} />
            <Route path="/assessment/:id" element={<Assessment />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;