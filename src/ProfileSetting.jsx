// File: src/ProfileSetting.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';      // CSS Layout Utama
import './ProfileSetting.css'; // CSS Khusus Form ini
import Swal from 'sweetalert2';

// Import Icon
import { FaThLarge, FaTicketAlt, FaDatabase, FaCog, FaHistory, FaUser, FaChartBar, FaBell, FaSignOutAlt } from 'react-icons/fa';

const ProfileSetting = () => {
  // --- AMBIL DATA DARI MEMORI BROWSER ---
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'user');

  // Fungsi ganti role dan simpan ke memori
  const handleRoleChange = (e) => {
      const newRole = e.target.value;
      setUserRole(newRole);
      localStorage.setItem('simulatedRole', newRole);
  };

  const handleUpdate = () => {
    Swal.fire({
      title: 'Berhasil!',
      text: 'Informasi akun Anda telah diperbarui.',
      icon: 'success',
      confirmButtonColor: '#00aaff'
    });
  };

  // --- KAMUS BAHASA ---
  const translations = {
    admin: {
      pageTitle: 'User Profile',
      tabTitle: 'Edit Account',
      labels: ['Username', 'Current Password', 'New Password', 'Confirm Password', 'Email', 'Full Name', 'Access Level', 'Project Access'],
      btnText: 'Update User'
    },
    other: { // User, Operation
      pageTitle: 'Profil Pengguna', 
      tabTitle: 'Edit Akun',
      labels: ['Nama Pengguna', 'Kata Sandi Saat Ini', 'Kata Sandi Baru', 'Konfirmasi Kata Sandi', 'Email', 'Nama Lengkap', 'Tingkat Akses', 'Akses Proyek'],
      btnText: 'Perbarui Profil' 
    }
  };

  const t = userRole === 'admin' ? translations.admin : translations.other;

  // --- MENU SIDEBAR (Technical Support Dihapus) ---
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
      {/* SIDEBAR */}
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

        {/* SIMULASI LOGIN (Technical Support Dihapus) */}
        <div style={{padding: '20px', marginTop: 'auto', fontSize: '0.8em'}}>
            <p>Simulasi Login Sebagai:</p>
            <select onChange={handleRoleChange} value={userRole} style={{width: '100%', padding: '5px'}}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
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
          <h2 className="page-title">{t.pageTitle}</h2>

          <div className="setting-container">
            {/* Tab Biru */}
            <div className="tab-header">{t.tabTitle}</div>

            {/* FORM FIELDS */}
            <div className="form-row">
                <div className="form-label">{t.labels[0]}</div>
                <div className="form-input-area"><input type="text" className="form-input" placeholder="Jawir_Ireng" /></div>
            </div>

            <div className="form-row">
                <div className="form-label">{t.labels[1]}</div>
                <div className="form-input-area"><input type="password" className="form-input" /></div>
            </div>

            <div className="form-row">
                <div className="form-label">{t.labels[2]}</div>
                <div className="form-input-area"><input type="password" className="form-input" /></div>
            </div>

            <div className="form-row">
                <div className="form-label">{t.labels[3]}</div>
                <div className="form-input-area"><input type="password" className="form-input" /></div>
            </div>

            <div className="form-row">
                <div className="form-label">{t.labels[4]}</div>
                <div className="form-input-area"><input type="email" className="form-input" placeholder="jawir@email.com" /></div>
            </div>

            <div className="form-row">
                <div className="form-label">{t.labels[5]}</div>
                <div className="form-input-area"><input type="text" className="form-input" placeholder="Nama Lengkap User" /></div>
            </div>

            <div className="form-row">
                <div className="form-label">{t.labels[6]}</div>
                <div className="form-input-area">
                  <input type="text" className="form-input" value={userRole.toUpperCase()} readOnly style={{backgroundColor: '#f5f5f5'}} />
                </div>
            </div>

            <div className="action-row">
                <div className="action-left">
                    <button className="btn-update" onClick={handleUpdate}>{t.btnText}</button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;