// File: src/UserLogHistory.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';      // Layout Utama
import './UserLogHistory.css'; // CSS Khusus Halaman Ini

import { FaThLarge, FaDatabase, FaCog, FaHistory, FaUser, FaBell, FaSignOutAlt } from 'react-icons/fa';

const UserLogHistory = () => {
  // 1. Cek Peran (Hanya Admin yang memiliki akses penuh ke log sistem)
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'admin');

  // Fungsi ganti role simulasi
  const handleRoleChange = (e) => {
      const newRole = e.target.value;
      setUserRole(newRole);
      localStorage.setItem('simulatedRole', newRole);
  };

  // --- DATA DUMMY ---
  const logs = [
    { no: 1, signIn: '130821 / 0800', staffId: 'XL000001', dept: 'IT OPS', activity: 'Login System', signOut: '130821 / 0815' },
    { no: 2, signIn: '130821 / 0805', staffId: 'XL000005', dept: 'ADMIN', activity: 'Update Category', signOut: '130821 / 0810' },
    { no: 3, signIn: '', staffId: '', dept: '', activity: '', signOut: '' }, 
    { no: 4, signIn: '', staffId: '', dept: '', activity: '', signOut: '' },
    { no: 5, signIn: '', staffId: '', dept: '', activity: '', signOut: '' },
  ];

  // --- MENU SIDEBAR ---
  const menus = {
    admin: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Database', icon: <FaDatabase />, link: '/database' },
      { name: 'Setting', icon: <FaCog />, link: '/admin-setting' },
      { name: 'User Log History', icon: <FaHistory />, link: '/user-log' },
    ],
    user: [], 
    operation: []
  };

  // --- PROTEKSI HALAMAN (Hanya ADMIN) ---
  if (userRole !== 'admin') {
    return (
        <div style={{padding: '50px', textAlign: 'center'}}>
            <h1>Akses Ditolak</h1>
            <p>Halaman User Log History hanya untuk Admin.</p>
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
                <li className={`sidebar-item ${item.name === 'User Log History' ? 'active' : ''}`}>
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
          <h2 className="page-title">User Activity Logs</h2>

          <div className="log-container">
            <div className="log-controls">
                Show: <select style={{padding: '5px'}}><option>10</option></select> Entries
            </div>

            <div className="log-table-wrapper">
                <table className="log-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Date/Sign In Time</th>
                            <th>Staff ID</th>
                            <th>Department</th>
                            <th>Activity</th>
                            <th>Date/Sign Out Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={index}>
                                <td>{log.no}.</td>
                                <td>{log.signIn}</td>
                                <td>{log.staffId}</td>
                                <td>{log.dept}</td>
                                <td>{log.activity}</td>
                                <td>{log.signOut}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="log-footer">
                <span>Showing {logs.filter(l => l.signIn).length} active entries</span>
                <div className="pagination-arrows">{'<<'} 1 {'>>'}</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogHistory;