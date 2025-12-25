// File: src/AdminSetting.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';    // Layout Utama
import './AdminSetting.css'; // CSS Khusus Halaman Ini

import { FaThLarge, FaDatabase, FaCog, FaHistory, FaUser, FaBell, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';

const AdminSetting = () => {
  // Cek Role - Ambil dari localStorage
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'admin');

  // Fungsi ganti role dan simpan ke memori
  const handleRoleChange = (e) => {
      const newRole = e.target.value;
      setUserRole(newRole);
      localStorage.setItem('simulatedRole', newRole);
  };

  // --- MENU SIDEBAR ---
  const menus = {
    admin: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Database', icon: <FaDatabase />, link: '/database' },
      { name: 'Setting', icon: <FaCog />, link: '/admin-setting' }, 
      { name: 'User Log History', icon: <FaHistory />, link: '/user-log' },
    ],
    // Role lain default kosong karena akses ditolak di halaman ini
    user: [], 
    operation: []
  };

  // --- LOGIKA AKSES (Hanya ADMIN) ---
  if (userRole !== 'admin') {
    return (
        <div style={{padding: '50px', textAlign: 'center'}}>
            <h1>Akses Ditolak</h1>
            <p>Halaman Pengaturan Sistem hanya untuk Admin.</p>
            <Link to="/dashboard">Kembali ke Dashboard</Link>
            
             <div style={{marginTop: '20px'}}>
                <select onChange={handleRoleChange} value={userRole}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="operation">Operation Team</option>
                </select>
            </div>
        </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {menus.admin.map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.name === 'Setting' ? 'active' : ''}`}>
                <span className="sidebar-icon">{item.icon}</span>
                {item.name}
                </li>
            </Link>
          ))}
        </ul>

        {/* SIMULASI LOGIN (Hanya ADMIN, USER, OPERATION) */}
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
          <h2 className="page-title">System Settings</h2>

          <div className="admin-setting-container">
            
            {/* GROUP 1: GENERAL */}
            <div className="setting-group">
                <div className="group-header">
                    General <FaChevronDown size={12}/>
                </div>
                <div className="group-row">
                    <span>Language</span>
                    <div className="lang-toggle">
                        <div className="lang-opt active">ID</div>
                        <div className="lang-opt inactive">EN</div>
                    </div>
                </div>
                <div className="group-row">
                    <span>Auto Data Backup</span>
                    <input type="checkbox" className="custom-checkbox" defaultChecked />
                </div>
            </div>

            {/* GROUP 2: INTEGRATION */}
            <div className="setting-group">
                <div className="group-header">
                    Connect To Backend <FaChevronDown size={12}/>
                </div>
                <div className="group-row">
                    <span>SMTP Email Notification</span>
                    <input type="checkbox" className="custom-checkbox" defaultChecked />
                </div>
                <div className="group-row">
                    <span>Log Activity Tracking</span>
                    <input type="checkbox" className="custom-checkbox" defaultChecked />
                </div>
            </div>

            {/* GROUP 3: AUTHORIZATION (Sesuai Role Backend) */}
            <div className="setting-group">
                <div className="group-header">
                    Access Control <FaChevronDown size={12}/>
                </div>
                <div className="group-row">
                    <span>Allow User Registration</span>
                    <input type="checkbox" className="custom-checkbox" defaultChecked />
                </div>
                <div className="group-row">
                    <span>Default Role for New User</span>
                    <select className="auth-dropdown">
                        <option>USER</option>
                        <option>OPERATIONAL</option>
                    </select>
                </div>
            </div>

            {/* GROUP 4: NOTIFICATION */}
            <div className="setting-group">
                <div className="group-header">
                    Push Notification <FaChevronDown size={12}/>
                </div>
                <div className="group-row">
                    <span>Enable Global Notification</span>
                    <input type="checkbox" className="custom-checkbox" defaultChecked />
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSetting;