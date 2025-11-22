// File: src/SignUp.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logoUniversitas from './assets/logo-universitas.png';

const SignUp = () => {
  return (
    <div className="app-container">
      <div className="login-card">
        <img src={logoUniversitas} alt="Logo" className="university-logo" />
        
        <h1 className="title">Helpdesk System</h1>
        <p style={{marginBottom: '20px'}}>Sign up here</p>

        <div className="input-group">
          <input type="text" placeholder="Username" className="login-input" />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" className="login-input" />
        </div>
        <div className="input-group">
          <input type="email" placeholder="Email" className="login-input" />
        </div>

        {/* Tombol Sign Up (Warna Biru) */}
        <button className="btn-blue">Sign Up</button>

        <div className="links-group" style={{justifyContent: 'flex-end', marginTop: '20px'}}>
    <Link to="/" className="link-signin-nav">
        Sign In
    </Link>
</div>
      </div>
    </div>
  );
};

export default SignUp;