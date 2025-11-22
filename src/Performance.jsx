// File: src/Performance.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';   // Layout Utama
import './Performance.css'; // CSS Khusus Halaman Ini
import { FaThLarge, FaTicketAlt, FaChartBar, FaBell, FaSignOutAlt, FaStar, FaUser } from 'react-icons/fa';

const Performance = () => {
  // --- UPDATE PENTING: AMBIL DATA DARI MEMORI BROWSER ---
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'technical');

  // Fungsi ganti role dan simpan ke memori
  const handleRoleChange = (e) => {
      const newRole = e.target.value;
      setUserRole(newRole);
      localStorage.setItem('simulatedRole', newRole);
  };

  // --- MENU SIDEBAR ---
  const menus = {
    admin: [], 
    user: [], 
    technical: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
      { name: 'Kinerja', icon: <FaChartBar />, link: '/performance' }, // Aktif
    ],
    operation: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Tiket Disetujui', icon: <FaTicketAlt />, link: '#' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
      { name: 'Kinerja', icon: <FaChartBar />, link: '/performance' }, // Aktif
    ]
  };

  // --- LOGIKA AKSES DITOLAK ---
  if (userRole === 'admin' || userRole === 'user') {
    return (
        <div style={{padding: '50px', textAlign: 'center', fontFamily: 'sans-serif'}}>
            <h1>Akses Ditolak</h1>
            <p>Halaman Kinerja hanya untuk Technical Support & Operation Team.</p>
            <Link to="/dashboard" style={{color: 'blue', textDecoration: 'underline'}}>Kembali ke Dashboard</Link>
            
            <div style={{marginTop: '30px', border: '1px solid #ccc', padding: '10px', display: 'inline-block'}}>
                <p style={{fontSize: '0.8rem'}}>Ganti Role untuk melihat tampilan:</p>
                {/* Gunakan handleRoleChange */}
                <select onChange={handleRoleChange} value={userRole}>
                    <option value="admin">Admin (Blokir)</option>
                    <option value="user">User (Blokir)</option>
                    <option value="technical">Technical Support</option>
                    <option value="operation">Operation Team</option>
                </select>
            </div>
        </div>
    );
  }

  // Data Dummy sesuai peran
  const myName = userRole === 'technical' ? 'Nama Dukungan Teknis' : 'Nama Operasi';
  const teamList = [1, 2, 3]; 

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {menus[userRole].map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.name === 'Kinerja' ? 'active' : ''}`}>
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
          <h2 className="page-title">Kinerja</h2>

          <div className="performance-layout">
            
            {/* --- KOLOM KIRI (Profil & Stats) --- */}
            <div className="perf-left-column">
                <div className="perf-profile-card">
                    <div className="perf-avatar-large"><FaUser /></div>
                    <div style={{flex: 1}}>
                        <div className="perf-name">{myName}</div>
                        <div className="perf-info-box">
                            <div className="perf-detail-text">
                                Contact No: 0123456789<br/>
                                Department: ABC
                            </div>
                        </div>
                    </div>
                </div>

                <div className="perf-stats-card">
                    <div className="stats-row stats-total">
                        <span>Total tiket yang ditangani</span>
                        <span>5</span>
                    </div>
                    <div className="stats-row">
                        <span>Tiket Selesai</span>
                        <span>2</span>
                    </div>
                    <div className="stats-row">
                        <span>Tiket Tertunda</span>
                        <span>1</span>
                    </div>
                    <div className="stats-row">
                        <span>Tiket Sedang Diproses</span>
                        <span>2</span>
                    </div>
                    <div className="stats-row" style={{marginTop: '15px', alignItems: 'center'}}>
                        <span>Penilaian</span>
                        <div className="rating-stars">
                            {[1,2,3,4,5].map(i => <FaStar key={i} color="#FFC107" />)}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- KOLOM KANAN (Daftar Tim) --- */}
            <div className="perf-right-column">
                {teamList.map((val) => (
                    <div className="team-card" key={val}>
                        <div className="team-avatar-small"><FaUser /></div>
                        <div className="team-info">
                            <div className="team-name">Nama Operasi {val}</div>
                            <button className="btn-detail">Lihat Detail</button>
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