// File: src/ProfileSetting.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';      // CSS Layout Utama
import './ProfileSetting.css'; // CSS Khusus Form ini

// Import Icon
import { FaThLarge, FaTicketAlt, FaDatabase, FaCog, FaHistory, FaUser, FaChartBar, FaBell, FaSignOutAlt } from 'react-icons/fa';

const ProfileSetting = () => {
  // --- UPDATE PENTING: AMBIL DATA DARI MEMORI BROWSER ---
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'admin');

  // Fungsi ganti role dan simpan ke memori
  const handleRoleChange = (e) => {
      const newRole = e.target.value;
      setUserRole(newRole);
      localStorage.setItem('simulatedRole', newRole);
  };

  // --- KAMUS BAHASA ---
  const translations = {
    admin: {
      pageTitle: 'User Profile',
      tabTitle: 'Edit Account',
      labels: ['Username', 'Current Password', 'New Password', 'Confirm Password', 'Email', 'Real Name', 'Access Level', 'Project Access Level'],
      btnText: 'Update User'
    },
    other: { // User, Technical, Operation
      pageTitle: 'User Profile', 
      tabTitle: 'Edit Akun',
      labels: ['Nama Pengguna', 'Kata Sandi Saat Ini', 'Kata Sandi Baru', 'Konfirmasi Kata Sandi', 'Email', 'Nama Asli', 'Tingkat Akses', 'Tingkat Akses Proyek'],
      btnText: 'Perbarui Pengguna' 
    }
  };

  // Pilih bahasa
  const t = userRole === 'admin' ? translations.admin : translations.other;

  // --- MENU SIDEBAR ---
  const menus = {
    admin: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Database', icon: <FaDatabase />, link: '#' },
      { name: 'Setting', icon: <FaCog />, link: '/profile-setting' }, // Aktif di sini
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

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {menus[userRole].map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.name === 'Setting' ? 'active' : ''}`}>
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

      {/* MAIN CONTENT */}
      <div className="main-content">
        <header className="top-header">
          <div className="header-title">Helpdesk & Ticketing System FTI</div>
          <div className="header-icons">
            <FaBell />
            <Link to="/profile" style={{color: 'white', display: 'flex', alignItems: 'center'}}><FaUser /></Link>
            <Link to="/" style={{color: 'white'}}><FaSignOutAlt /></Link>
          </div>
        </header>

        <div className="content-padding">
          {/* Judul Halaman */}
          <h2 className="page-title">
            {userRole === 'technical' || userRole === 'operation' ? 'Profil Pengguna' : 'User Profile'}
          </h2>

          <div className="setting-container">
            {/* Tab Biru */}
            <div className="tab-header">{t.tabTitle}</div>

            {/* FORM FIELDS */}
            {/* 1. Username */}
            <div className="form-row">
                <div className="form-label">{t.labels[0]}</div>
                <div className="form-input-area"><input type="text" className="form-input" /></div>
            </div>

            {/* 2. Current Password */}
            <div className="form-row">
                <div className="form-label">{t.labels[1]}</div>
                <div className="form-input-area"><input type="password" className="form-input" /></div>
            </div>

            {/* 3. New Password */}
            <div className="form-row">
                <div className="form-label">{t.labels[2]}</div>
                <div className="form-input-area"><input type="password" className="form-input" /></div>
            </div>

            {/* 4. Confirm Password */}
            <div className="form-row">
                <div className="form-label">{t.labels[3]}</div>
                <div className="form-input-area"><input type="password" className="form-input" /></div>
            </div>

            {/* 5. Email */}
            <div className="form-row">
                <div className="form-label">{t.labels[4]}</div>
                <div className="form-input-area"><input type="email" className="form-input" /></div>
            </div>

            {/* 6. Real Name */}
            <div className="form-row">
                <div className="form-label">{t.labels[5]}</div>
                <div className="form-input-area"><input type="text" className="form-input" /></div>
            </div>

            {/* 7. Access Level */}
            <div className="form-row">
                <div className="form-label">{t.labels[6]}</div>
                <div className="form-input-area"><input type="text" className="form-input" placeholder={userRole.toUpperCase()} readOnly /></div>
            </div>

            {/* 8. Project Access Level */}
            <div className="form-row">
                <div className="form-label">{t.labels[7]}</div>
                <div className="form-input-area"><input type="text" className="form-input" /></div>
            </div>

            {/* TOMBOL UPDATE */}
            <div className="action-row">
                <div className="action-left">
                    <button className="btn-update">{t.btnText}</button>
                </div>
                <div className="action-right"></div> 
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;