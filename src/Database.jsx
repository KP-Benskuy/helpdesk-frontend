// File: src/Database.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Layout Utama
import './Database.css';  // CSS Khusus Database
import { FaThLarge, FaTicketAlt, FaDatabase, FaCog, FaHistory, FaBell, FaUser, FaSignOutAlt, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

const Database = () => {
  // 1. Cek Peran (Wajib Admin) - UPDATE: Ambil dari localStorage
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'admin');
  
  // 2. State untuk Tab Aktif (Default: Technical Support sesuai gambar)
  const [activeTab, setActiveTab] = useState('technical'); 

  // Fungsi ganti role dan simpan ke memori (Agar sinkron)
  const handleRoleChange = (e) => {
      const newRole = e.target.value;
      setUserRole(newRole);
      localStorage.setItem('simulatedRole', newRole);
  };

  // --- DATA DUMMY ---
  const dataTechnical = [
    { id: 'ABC123', name: 'Abu', dept: 'IT', speciality: 'Software' },
    { id: 'ABC124', name: 'Ahmad', dept: 'Software', speciality: 'Networking' },
    { id: 'ABC125', name: 'Ali', dept: 'Technical', speciality: 'Hardware' },
  ];

  const dataOperation = [
    { id: 'OPS001', name: 'Budi', dept: 'Ops', speciality: 'Ticketing' },
    { id: 'OPS002', name: 'Siti', dept: 'Ops', speciality: 'Monitoring' },
  ];

  const dataUser = [
    { id: 'USR999', name: 'Jawir', dept: 'Informatika', speciality: 'Mahasiswa' },
    { id: 'USR888', name: 'Citra', dept: 'Sistem Informasi', speciality: 'Dosen' },
  ];

  // Helper: Pilih data berdasarkan tab
  const getCurrentData = () => {
    if (activeTab === 'technical') return dataTechnical;
    if (activeTab === 'operation') return dataOperation;
    return dataUser;
  };

  // --- MENU SIDEBAR (Sama seperti Dashboard) ---
  const menus = {
    admin: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Database', icon: <FaDatabase />, link: '/database' }, // Aktif
      { name: 'Setting', icon: <FaCog />, link: '/admin-setting' }, // Arahkan ke Admin Setting
      { name: 'User Log History', icon: <FaHistory />, link: '/user-log' },
    ],
    // ... (Role lain biarkan kosong/default karena akses ditolak) ...
    user: [], technical: [], operation: []
  };

  // --- JIKA BUKAN ADMIN, TOLAK AKSES ---
  if (userRole !== 'admin') {
    return (
      <div style={{padding: '50px', textAlign: 'center'}}>
          <h1>Akses Ditolak</h1>
          <p>Halaman Database hanya untuk Admin.</p>
          <Link to="/dashboard">Kembali ke Dashboard</Link>
          {/* Dropdown ganti role agar tidak terjebak */}
          <div style={{marginTop: '20px'}}>
              <select onChange={handleRoleChange} value={userRole}>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="technical">Technical Support</option>
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
                <li className={`sidebar-item ${item.name === 'Database' ? 'active' : ''}`}>
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
          <h2 className="page-title">Database</h2>

          {/* --- TABS NAVIGATION --- */}
          <div className="db-tabs">
            <div 
                className={`db-tab-item ${activeTab === 'user' ? 'active' : ''}`}
                onClick={() => setActiveTab('user')}
            >
                User
            </div>
            <div 
                className={`db-tab-item ${activeTab === 'operation' ? 'active' : ''}`}
                onClick={() => setActiveTab('operation')}
            >
                Operation Team
            </div>
            <div 
                className={`db-tab-item ${activeTab === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveTab('technical')}
            >
                Technical Support
            </div>
          </div>

          {/* --- CONTROLS (Search & Entries) --- */}
          <div className="db-controls">
             <div className="search-box" style={{background: '#ddd', padding: '8px 15px', borderRadius: '5px', display: 'flex', alignItems: 'center', width: '250px'}}>
                 <FaSearch color="#666" />
                 <input type="text" placeholder="Find ticket..." style={{border:'none', background:'transparent', outline:'none', marginLeft:'10px', width:'100%'}} />
             </div>
             <div>
                 Show: <select style={{padding: '5px'}}><option>10</option></select> Entries
             </div>
          </div>

          {/* --- TABLE --- */}
          <div className="db-table-wrapper">
            <table className="db-table">
                <thead>
                    <tr>
                        <th className="checkbox-cell"></th>
                        <th>Staff ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Speciality</th>
                        <th>Setting</th>
                    </tr>
                </thead>
                <tbody>
                    {getCurrentData().map((item, idx) => (
                        <tr key={idx}>
                            <td className="checkbox-cell">
                                <input type="checkbox" className="custom-checkbox" />
                            </td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.dept}</td>
                            <td>{item.speciality}</td>
                            <td>
                                <div className="action-icons">
                                    <FaEdit title="Edit" />
                                    <FaTrash title="Delete" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>

          <div style={{marginTop: '15px', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between'}}>
             <span>Showing 1 to {getCurrentData().length} of {getCurrentData().length} entries</span>
             <div style={{cursor: 'pointer'}}> {'<<'} 1 {'>>'} </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Database;