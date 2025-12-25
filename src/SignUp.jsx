import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from './api/api';
import logoUniversitas from './assets/logo-universitas.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
// 1. Import SweetAlert2
import Swal from 'sweetalert2';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/auth/register', {
        name: name,
        email: email,
        password: password
      });

      // 2. Ganti alert biasa dengan SweetAlert2 yang keren
      Swal.fire({
        title: 'Registrasi Berhasil!',
        text: 'Akun kamu sudah terdaftar. Silakan login untuk melanjutkan.',
        icon: 'success',
        confirmButtonColor: '#28a745', // Warna hijau sesuai tema kamu
        confirmButtonText: 'Tutup & Login'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/'); 
        }
      });

    } catch (error) {
      // 3. Popup Error jika pendaftaran gagal
      Swal.fire({
        title: 'Registrasi Gagal',
        text: error.response?.data?.msg || 'Terjadi kesalahan sistem',
        icon: 'error',
        confirmButtonColor: '#d33'
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="app-container">
      <div className="login-card">
        <img src={logoUniversitas} alt="Logo" className="university-logo" />
        <h1 className="title">Helpdesk System</h1>
        <p style={{marginBottom: '20px'}}>Sign up here</p>

        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Nama Lengkap" 
              className="login-input" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              className="login-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group" style={{ position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password (min. 6 karakter)" 
              className="login-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', paddingRight: '40px' }} 
            />
            <span 
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          <button type="submit" className="btn-blue">Sign Up</button>
        </form>

        <div className="links-group" style={{justifyContent: 'flex-end', marginTop: '20px'}}>
          <Link to="/" className="link-signin-nav">
            Sudah punya akun? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;