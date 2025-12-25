import React, { useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom'; 

// Import Icon dari React Icons
import { FaThLarge, FaTicketAlt, FaDatabase, FaCog, FaHistory, FaUser, FaChartBar, FaBell, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
  // --- AMBIL DATA DARI MEMORI BROWSER ---
  // Default diubah menjadi 'user' agar lebih aman
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'user'); 

  // Fungsi ganti role dan simpan ke memori
  const handleRoleChange = (e) => {
      const newRole = e.target.value;
      setUserRole(newRole);
      localStorage.setItem('simulatedRole', newRole); 
  };

  // --- DATA MENU BERDASARKAN PERAN (Sesuai API: ADMIN, OPERATIONAL, USER) ---
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
    // Menggunakan peran OPERATIONAL sesuai dokumentasi backend teman kamu
    operation: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Tiket Disetujui', icon: <FaTicketAlt />, link: '/ticket-approval' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
      { name: 'Kinerja', icon: <FaChartBar />, link: '/performance' }, 
    ]
  };

  return (
    <div className="dashboard-container">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {/* Cek apakah menu untuk role tersebut ada sebelum mapping */}
          {menus[userRole] && menus[userRole].map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.name === 'Dashboard' ? 'active' : ''}`}>
                    <span className="sidebar-icon">{item.icon}</span>
                    {item.name}
                </li>
            </Link>
          ))}
        </ul>

        {/* SIMULASI GANTI PERAN (Hanya ADMIN, USER, OPERATION) */}
        <div style={{padding: '20px', marginTop: 'auto', fontSize: '0.8em'}}>
            <p>Simulasi Login Sebagai:</p>
            <select onChange={handleRoleChange} value={userRole} style={{width: '100%', padding: '5px'}}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
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
            <Link to="/profile" style={{color: 'white', display: 'flex', alignItems: 'center'}}>
                <FaUser />
            </Link>
            <Link to="/" style={{color: 'white'}}><FaSignOutAlt /></Link>
          </div>
        </header>

        <div className="content-padding">
          <h2 className="page-title">Dashboard ({userRole.toUpperCase()})</h2>

          <div className="stats-grid">
            <div className="stat-card card-blue">
              <h3>Total Tickets</h3>
              <h1>12</h1>
            </div>
            <div className="stat-card card-green">
              <h3>Total Solved</h3>
              <h1>8</h1>
            </div>
            <div className="stat-card card-red">
              <h3>{userRole === 'admin' ? 'Awaiting Approval' : 'Pending'}</h3>
              <h1>2</h1>
            </div>
            <div className="stat-card card-yellow">
              <h3>In Progress</h3>
              <h1>2</h1>
            </div>
          </div>

          {/* BAGIAN BAWAH (Hanya muncul untuk Admin & Operation) */}
          {userRole !== 'user' && (
            <div className="bottom-section">
              <div className="chart-area">
                <FaChartBar size={100} style={{opacity: 0.5}} />
                <p>Statistik Tiket Bulanan</p>
              </div>

              <div className="info-sidebar">
                <div className="staff-info">
                    {/* Technical Support dihapus, diganti info umum staff */}
                    <div>
                        <FaCog size={30} />
                        <p>7 <br/>Total Staff</p>
                    </div>
                </div>
                <div className="feedback-area">
                    <h4>Customer Feedback</h4>
                    <div style={{fontSize: '1.5rem'}}>⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>
          )}
          
          {userRole === 'user' && (
             <div style={{textAlign: 'center', padding: '50px', color: '#888'}}>
                <p>Silakan pilih menu "Buat Tiket" untuk melaporkan masalah.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;