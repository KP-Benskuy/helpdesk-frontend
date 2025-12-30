// File: src/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt, FaShieldAlt, FaClock, FaUserCheck } from 'react-icons/fa';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* --- NAVBAR --- */}
      <nav className="landing-nav">
        <div className="nav-logo">FTI Helpdesk</div>
        <div className="nav-links">
          {/* PERBAIKAN: Diubah ke /login */}
          <Link to="/login" className="btn-login-nav">Sign In</Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Solusi Cepat Terintegrasi Untuk Masalah IT Anda</h1>
          <p>
            Platform Helpdesk resmi Fakultas Teknologi Informasi. 
            Sampaikan kendala Anda, dan tim operasional kami akan segera membantu.
          </p>
          <div className="hero-buttons">
            {/* PERBAIKAN: Diubah ke /login */}
            <Link to="/login" className="btn-primary-lg">Mulai Sekarang</Link>
            <a href="#features" className="btn-secondary-lg">Pelajari Fitur</a>
          </div>
        </div>
        <div className="hero-image">
           <FaTicketAlt size={200} color="white" style={{opacity: 0.8}} />
        </div>
      </header>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="features-section">
        <h2 className="section-title">Mengapa Menggunakan Helpdesk FTI?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaClock className="feat-icon" />
            <h3>Respon Cepat</h3>
            <p>Tiket Anda akan langsung masuk ke sistem antrean tim operasional secara real-time.</p>
          </div>
          <div className="feature-card">
            <FaShieldAlt className="feat-icon" />
            <h3>Keamanan Data</h3>
            <p>Privasi laporan Anda terjaga dengan sistem otentikasi JWT yang aman.</p>
          </div>
          <div className="feature-card">
            <FaUserCheck className="feat-icon" />
            <h3>Transparan</h3>
            <p>Pantau status perbaikan tiket Anda mulai dari 'Pending' hingga 'Solved'.</p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="landing-footer">
        <p>&copy; 2025 Fakultas Teknologi Informasi. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;