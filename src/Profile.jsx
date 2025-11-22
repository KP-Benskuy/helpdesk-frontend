// File: src/Profile.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Pinjam CSS Layout Dashboard
import './Profile.css';   // CSS Khusus Profile
// import logoUniversitas from './assets/logo-universitas.png'; // (Opsional jika tidak dipakai bisa dihapus)

// Import Icon
import { 
  FaThLarge, FaTicketAlt, FaDatabase, FaCog, FaHistory, FaUser, FaChartBar, FaBell, FaSignOutAlt, FaEdit, FaStar 
} from 'react-icons/fa';

const Profile = () => {
  // --- UPDATE PENTING: AMBIL DATA DARI MEMORI BROWSER ---
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'admin');
  const [rating, setRating] = useState(0); 

  // Fungsi ganti role dan simpan ke memori
  const handleRoleChange = (e) => {
      const newRole = e.target.value;
      setUserRole(newRole);
      localStorage.setItem('simulatedRole', newRole);
  };

  // --- DATA MENU (Sesuai Mockup Profile) ---
  const menus = {
    admin: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Database', icon: <FaDatabase />, link: '#' },
      { name: 'Setting', icon: <FaCog />, link: '/profile-setting' },
      { name: 'User Log History', icon: <FaHistory />, link: '#' },
    ],
    user: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Buat Tiket', icon: <FaTicketAlt />, link: '#' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
    ],
    technical: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
      { name: 'Kinerja', icon: <FaChartBar />, link: '/performance' },
    ],
    operation: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Tiket Disetujui', icon: <FaTicketAlt />, link: '#' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
      { name: 'Kinerja', icon: <FaChartBar />, link: '/performance' },
    ]
  };

  // Helper: Teks Judul Halaman berdasarkan peran
  const getPageTitle = () => {
    return userRole === 'admin' ? 'User Profile' : 'Profil Pengguna';
  };

  // Helper: Teks Feedback berdasarkan peran
  const getFeedbackTitle = () => {
    return userRole === 'admin' ? 'Give Your Feedback' : 'Berikan Masukan';
  };

  const getButtonText = () => {
     return userRole === 'admin' ? 'Submit Feedback' : 'Kirim Umpan Balik';
  }

  return (
    <div className="dashboard-container">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {menus[userRole].map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className="sidebar-item">
                <span className="sidebar-icon">{item.icon}</span>
                {item.name}
                </li>
            </Link>
          ))}
        </ul>

        {/* SIMULASI LOGIN */}
        <div style={{padding: '20px', marginTop: 'auto', fontSize: '0.8em'}}>
            <p>Simulasi Login Sebagai:</p>
            {/* UPDATE: Gunakan handleRoleChange */}
            <select onChange={handleRoleChange} value={userRole} style={{width: '100%', padding: '5px'}}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="technical">Technical Support</option>
                <option value="operation">Operation Team</option>
            </select>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="main-content">
        <header className="top-header">
          <div className="header-title">Helpdesk & Ticketing System FTI</div>
          <div className="header-icons">
            <FaBell />
            {/* Icon User aktif karena kita di halaman Profile */}
            <FaUser color="#FFFF00" /> 
            <Link to="/" style={{color: 'white'}}><FaSignOutAlt /></Link>
          </div>
        </header>

        <div className="content-padding">
          <h2 className="page-title">{getPageTitle()}</h2>

          {/* AREA BIRU BESAR */}
          <div className="profile-wrapper">
            
            {/* KARTU 1: PROFIL */}
            <div className="profile-card">
                
                {/* Link ke Profile Setting */}
                <Link to="/profile-setting" className="edit-icon">
                    <FaEdit />
                </Link>
                
                <div className="profile-avatar-placeholder">
                    <FaUser />
                </div>

                <div className="profile-details">
                    <p><span className="label-detail">Username:</span> Jawir_Ireng</p>
                    <p><span className="label-detail">Contact:</span> 0812-3456-7890</p>
                    <p><span className="label-detail">Email:</span> Jawir@student.unsap.ac.id</p>
                    <p><span className="label-detail">Dept:</span> Informatika</p>
                </div>
            </div>

            {/* KARTU 2: FEEDBACK */}
            <div className="feedback-card">
                <div className="feedback-title">{getFeedbackTitle()}</div>
                
                <textarea className="feedback-textarea" placeholder="[Lorem Ipsum]"></textarea>
                
                <div className="star-container">
                    {[1, 2, 3, 4, 5, 6].map((star) => (
                        <FaStar 
                            key={star} 
                            className={star <= rating ? 'star-active' : ''}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>

                <button className="btn-feedback">{getButtonText()}</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;