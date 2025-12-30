// File: src/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from './api/api'; 
import './Dashboard.css';

// Import Icon dari React Icons
import { 
  FaThLarge, FaTicketAlt, FaDatabase, FaCog, 
  FaHistory, FaUser, FaChartBar, FaBell, FaSignOutAlt 
} from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(''); 
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  // --- STATE UNTUK STATISTIK TIKET ---
  const [stats, setStats] = useState({
    total: 0,
    solved: 0,
    pending: 0,
    inProgress: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Ambil Profil Pengguna
        const profileRes = await API.get('/api/auth/me');
        if (profileRes.data) {
          setUserRole(profileRes.data.role); 
          setUserName(profileRes.data.name);
        }

        // 2. Ambil Statistik Tiket Asli
        // Asumsi endpoint: /api/tickets/stats (Sesuaikan dengan API teman Anda)
        const statsRes = await API.get('/api/tickets/stats');
        if (statsRes.data) {
          setStats({
            total: statsRes.data.total || 0,
            solved: statsRes.data.solved || 0,
            pending: statsRes.data.pending || 0,
            inProgress: statsRes.data.inProgress || 0
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        // Jika gagal login/token habis, arahkan ke login
        if (error.response?.status === 401) navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/');
  };

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '50px', color: 'white'}}>Menghubungkan ke Database...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {(menus[userRole] || menus['USER']).map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.name === 'Dashboard' ? 'active' : ''}`}>
                    <span className="sidebar-icon">{item.icon}</span>
                    {item.name}
                </li>
            </Link>
          ))}
        </ul>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="main-content">
        <header className="top-header">
          <div className="header-title">Helpdesk & Ticketing System FTI</div>
          <div className="header-icons">
            <span style={{fontSize: '0.8rem', marginRight: '10px'}}>Halo, {userName}</span>
            <FaBell />
            <Link to="/profile" style={{color: 'white', display: 'flex', alignItems: 'center'}}>
                <FaUser />
            </Link>
            <button onClick={handleLogout} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}>
                <FaSignOutAlt />
            </button>
          </div>
        </header>

        <div className="content-padding">
          <h2 className="page-title">Dashboard ({userRole})</h2>

          <div className="stats-grid">
            <div className="stat-card card-blue">
              <h3>Total Tickets</h3>
              <h1>{stats.total}</h1>
            </div>
            <div className="stat-card card-green">
              <h3>Total Solved</h3>
              <h1>{stats.solved}</h1>
            </div>
            <div className="stat-card card-red">
              <h3>{userRole === 'ADMIN' ? 'Awaiting Approval' : 'Pending'}</h3>
              <h1>{stats.pending}</h1>
            </div>
            <div className="stat-card card-yellow">
              <h3>In Progress</h3>
              <h1>{stats.inProgress}</h1>
            </div>
          </div>

          {userRole !== 'USER' && (
            <div className="bottom-section">
              <div className="chart-area">
                <FaChartBar size={100} style={{opacity: 0.5}} />
                <p>Statistik Tiket Bulanan</p>
              </div>

              <div className="info-sidebar">
                <div className="staff-info">
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
        </div>
      </div>
    </div>
  );
};

// Objek Menus tetap sama seperti kodingan sebelumnya
const menus = {
  ADMIN: [
    { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
    { name: 'Database', icon: <FaDatabase />, link: '/database' }, 
    { name: 'Setting', icon: <FaCog />, link: '/admin-setting' }, 
    { name: 'User Log History', icon: <FaHistory />, link: '/user-log' },
  ],
  USER: [
    { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
    { name: 'Buat Tiket', icon: <FaTicketAlt />, link: '/create-ticket' },
    { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
  ],
  OPERATIONAL: [
    { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
    { name: 'Tiket Disetujui', icon: <FaTicketAlt />, link: '/ticket-approval' },
    { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
    { name: 'Kinerja', icon: <FaChartBar />, link: '/performance' }, 
  ]
};

export default Dashboard;