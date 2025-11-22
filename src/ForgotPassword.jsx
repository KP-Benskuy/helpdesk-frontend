// File: src/ForgotPassword.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logoUniversitas from './assets/logo-universitas.png';

const ForgotPassword = () => {
  return (
    <div className="app-container">
      <div className="login-card">
        <img src={logoUniversitas} alt="Logo" className="university-logo" />
        
        <p className="description">
          Don't worry, Enter your email below and we will send you a link to change password.
        </p>

        <div className="input-group">
          <input type="email" placeholder="Email" className="login-input" />
        </div>

        {/* Tombol Submit (Hijau) */}
        <button className="btn-green" style={{marginBottom: '10px'}}>Submit</button>
        
        {/* Tombol Sign In (Biru) */}
        <Link to="/" style={{width: '100%'}}>
            <button className="btn-blue">Sign In</button>
        </Link>

      </div>
    </div>
  );
};

export default ForgotPassword;