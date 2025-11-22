// File: src/SignIn.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logoUniversitas from './assets/logo-universitas.png';

const SignIn = () => {
  return (
    <div className="app-container">
      <div className="login-card">
        <img src={logoUniversitas} alt="Logo" className="university-logo" />
        
        {/* Judul Halaman */}
        <h1 className="title">Helpdesk & Ticketing<br/>System FTI</h1>

        {/* Inputan */}
        <div className="input-group">
          <input type="text" placeholder="Username" className="login-input" />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" className="login-input" />
        </div>

        {/* Tombol Sign In (Warna Hijau) */}
        <button className="btn-green">Sign In</button>

        {/* Link di bawah */}

<div className="links-group">
  
  <Link to="/forgot-password" className="link-forgot">
    Forgot password
  </Link>
  
  <Link to="/signup" className="link-signup">
    Sign Up
  </Link>
</div>
</div>
</div>
  );
};

export default SignIn;