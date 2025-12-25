// File: src/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from './api/api'; // Import jembatan API
import './Dashboard.css'; 
import './Profile.css'; 
import Swal from 'sweetalert2';

// Import Icon
import { 
  FaThLarge, FaTicketAlt, FaDatabase, FaCog, FaHistory, FaUser, FaChartBar, FaBell, FaSignOutAlt, FaEdit, FaStar 
} from 'react-icons/fa';

const Profile = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'user');
  const [rating, setRating] = useState(0); 
  const [userData, setUserData] = useState({ name: '', email: '', role: '' }); // State data asli

  // 1. Ambil data profil asli dari Backend saat halaman dibuka
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Menggunakan endpoint GET /api/auth/me sesuai dokumentasi temanmu
        const response = await API.get('/api/auth/me');
        setUserData(response.data);
      } catch (error) {
        console.error("Gagal memuat profil", error);
      }
    };
    fetchProfile();
  }, []);

  const handleRoleChange = (e) => {
      const newRole = e.target.value;
      setUserRole(newRole);
      localStorage.setItem('simulatedRole', newRole);
  };

  const handleFeedback = () => {
    Swal.fire('Terima Kasih!', 'Masukan Anda sangat berarti bagi kami.', 'success');
  };

  // --- DATA MENU (Technical dihapus) ---
  const menus = {
    admin: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Database', icon: <FaDatabase />, link: '/database' },
      { name: 'Setting', icon: <FaCog />, link: '/admin-setting' },
      { name: 'User Log History', icon: <FaHistory />, link: '/user-log' },
    ],
    user: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Buat Tiket', icon: <FaTicketAlt />, link: '/create-ticket' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
    ],
    operation: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Tiket Disetujui', icon: <FaTicketAlt />, link: '#' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
      { name: 'Kinerja', icon: <FaChartBar />, link: '/performance' },
    ]
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {menus[userRole]?.map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className="sidebar-item">
                <span className="sidebar-icon">{item.icon}</span>
                {item.name}
                </li>
            </Link>
          ))}
        </ul>

        <div style={{padding: '20px', marginTop: 'auto', fontSize: '0.8em'}}>
            <p>Simulasi Login Sebagai:</p>
            <select onChange={handleRoleChange} value={userRole} style={{width: '100%', padding: '5px'}}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="operation">Operation Team</option>
            </select>
        </div>
      </aside>

      <div className="main-content">
        <header className="top-header">
          <div className="header-title">Helpdesk & Ticketing System FTI</div>
          <div className="header-icons">
            <FaBell />
            <FaUser color="#FFFF00" /> 
            <Link to="/" onClick={() => localStorage.removeItem('token')} style={{color: 'white'}}><FaSignOutAlt /></Link>
          </div>
        </header>

        <div className="content-padding">
          <h2 className="page-title">{userRole === 'admin' ? 'Admin Profile' : 'Profil Pengguna'}</h2>

          <div className="profile-wrapper">
            
            {/* KARTU 1: PROFIL (Data Asli dari Backend) */}
            <div className="profile-card">
                <Link to="/profile-setting" className="edit-icon"><FaEdit /></Link>
                <div className="profile-avatar-placeholder"><FaUser /></div>

                <div className="profile-details">
                    <p><span className="label-detail">Nama:</span> {userData.name || 'Memuat...'}</p>
                    <p><span className="label-detail">Email:</span> {userData.email || 'Memuat...'}</p>
                    <p><span className="label-detail">Role:</span> {userData.role || 'USER'}</p>
                    <p><span className="label-detail">Dept:</span> FTI - Informatika</p>
                </div>
            </div>

            {/* KARTU 2: FEEDBACK */}
            <div className="feedback-card">
                <div className="feedback-title">Berikan Masukan Anda</div>
                <textarea className="feedback-textarea" placeholder="Tuliskan kritik atau saran Anda di sini..."></textarea>
                
                <div className="star-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar 
                            key={star} 
                            className={star <= rating ? 'star-active' : ''}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>

                <button className="btn-feedback" onClick={handleFeedback}>Kirim Masukan</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;