import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navigation/Navbar';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CertificatePage from './pages/CertificatePage';
import './App.css';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/certificate/:id" element={<CertificatePage />} />
        <Route path="/courses" element={<div className="text-[var(--white-smoke)] p-4">Courses Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;