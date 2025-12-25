import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from './api/api';
import logoUniversitas from './assets/logo-universitas.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import Swal from 'sweetalert2'; 

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 1. VALIDASI MANUAL (Penting agar tidak 'hening' saat kosong)
    if (!email || !password) {
      return Swal.fire({
        title: 'Input Kosong!',
        text: 'Harap masukkan email dan password Anda.',
        icon: 'warning',
        confirmButtonColor: '#28a745'
      });
    }

    setIsLoading(true);

    try {
      // Mengirim request login ke backend
      const response = await API.post('/api/auth/login', {
        email: email,
        password: password
      });

      // Simpan token JWT untuk akses Protected Endpoints
      localStorage.setItem('token', response.data.token);

      Swal.fire({
        title: 'Login Berhasil!',
        text: `Selamat datang kembali, ${response.data.user.name}!`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      
      setTimeout(() => {
        navigate('/dashboard'); 
      }, 1500);

    } catch (error) {
      // Menangani error berdasarkan standard kode status HTTP backend
      const errorStatus = error.response?.status;
      let errorMsg = error.response?.data?.msg || 'Terjadi kesalahan pada server';

      // 401: Unauthorized (Kredensial salah), 404: Not Found (User tidak ada)
      if (errorStatus === 401) {
        errorMsg = 'Email atau Password salah. Silakan periksa kembali.';
      } else if (errorStatus === 404) {
        errorMsg = 'Akun tidak ditemukan. Silakan Sign Up terlebih dahulu.';
      }

      Swal.fire({
        title: 'Login Gagal',
        text: errorMsg,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Coba Lagi'
      });
      
      setPassword(''); 

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="login-card">
        <img src={logoUniversitas} alt="Logo" className="university-logo" />
        <h1 className="title">Helpdesk & Ticketing<br/>System FTI</h1>

        <form onSubmit={handleLogin} noValidate> {/* noValidate agar kita pakai validasi Swal */}
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              className="login-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="input-group" style={{ position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="login-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              style={{ width: '100%', paddingRight: '40px' }}
            />
            <span 
              onClick={() => !isLoading && setShowPassword(!showPassword)}
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

          <button 
            type="submit" 
            className="btn-green" 
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? 'Sedang Memproses...' : 'Sign In'}
          </button>
        </form>

        <div className="links-group">
          <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#666' }}>
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