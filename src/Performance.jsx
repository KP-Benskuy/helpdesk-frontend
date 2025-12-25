// File: src/Performance.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';   
import './Performance.css'; 
import { FaThLarge, FaTicketAlt, FaChartBar, FaBell, FaSignOutAlt, FaStar, FaUser } from 'react-icons/fa';

const Performance = () => {
  // --- AMBIL DATA DARI MEMORI BROWSER ---
  // Role 'technical' dihapus, default disesuaikan ke 'operation'
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'operation');

  const handleRoleChange = (e) => {
      const newRole = e.target.value;
      setUserRole(newRole);
      localStorage.setItem('simulatedRole', newRole);
  };

  // --- MENU SIDEBAR (Sesuai dokumentasi backend: ADMIN, OPERATIONAL, USER) ---
  const menus = {
    admin: [], 
    user: [], 
    operation: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Tiket Disetujui', icon: <FaTicketAlt />, link: '/ticket-approval' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
      { name: 'Kinerja', icon: <FaChartBar />, link: '/performance' }, 
    ]
  };

  // --- LOGIKA AKSES DITOLAK (Technical dihapus) ---
  if (userRole === 'admin' || userRole === 'user') {
    return (
        <div style={{padding: '50px', textAlign: 'center', fontFamily: 'sans-serif'}}>
            <h1>Akses Ditolak</h1>
            <p>Halaman Kinerja hanya dapat diakses oleh Operation Team (OPERATIONAL).</p>
            <Link to="/dashboard" style={{color: 'blue', textDecoration: 'underline'}}>Kembali ke Dashboard</Link>
            
            <div style={{marginTop: '30px', border: '1px solid #ccc', padding: '10px', display: 'inline-block'}}>
                <p style={{fontSize: '0.8rem'}}>Ganti Role untuk simulasi:</p>
                <select onChange={handleRoleChange} value={userRole}>
                    <option value="admin">Admin (Blokir)</option>
                    <option value="user">User (Blokir)</option>
                    <option value="operation">Operation Team</option>
                </select>
            </div>
        </div>
    );
  }

  // Data Dummy disesuaikan
  const myName = 'Staff Operasional FTI';
  const teamList = [1, 2, 3, 4]; 

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {menus[userRole]?.map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.name === 'Kinerja' ? 'active' : ''}`}>
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
            <Link to="/profile" style={{color: 'white', display: 'flex', alignItems: 'center'}}><FaUser /></Link>
            <Link to="/" style={{color: 'white'}}><FaSignOutAlt /></Link>
          </div>
        </header>

        <div className="content-padding">
          <h2 className="page-title">Analisis Kinerja Staff</h2>

          <div className="performance-layout">
            
            <div className="perf-left-column">
                <div className="perf-profile-card">
                    <div className="perf-avatar-large"><FaUser /></div>
                    <div style={{flex: 1}}>
                        <div className="perf-name">{myName}</div>
                        <div className="perf-info-box">
                            <div className="perf-detail-text">
                                ID Staff: XL00045<br/>
                                Departemen: Operation Team (FTI)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="perf-stats-card">
                    <div className="stats-row stats-total">
                        <span>Total tiket yang ditangani</span>
                        <span>15</span>
                    </div>
                    <div className="stats-row">
                        <span>Tiket Selesai (Resolved)</span>
                        <span>10</span>
                    </div>
                    <div className="stats-row">
                        <span>Tiket Tertunda (On Hold)</span>
                        <span>2</span>
                    </div>
                    <div className="stats-row">
                        <span>Sedang Diproses (In Progress)</span>
                        <span>3</span>
                    </div>
                    <div className="stats-row" style={{marginTop: '15px', alignItems: 'center'}}>
                        <span>Rata-rata Penilaian</span>
                        <div className="rating-stars">
                            {[1,2,3,4,5].map(i => <FaStar key={i} color="#FFC107" />)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="perf-right-column">
                <h3 style={{marginBottom: '15px', color: '#333'}}>Rekan Kerja Tim Operasi</h3>
                {teamList.map((val) => (
                    <div className="team-card" key={val}>
                        <div className="team-avatar-small"><FaUser /></div>
                        <div className="team-info">
                            <div className="team-name">Agent Operasi {val}</div>
                            <button className="btn-detail">Lihat Statistik</button>
                        </div>
                    </div>
                ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;