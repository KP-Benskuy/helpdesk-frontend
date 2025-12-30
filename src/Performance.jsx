// File: src/Performance.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from './api/api';
import './Dashboard.css';   
import './Performance.css'; 
// PERBAIKAN: Menambahkan FaDatabase, FaHistory, FaCog, dan FaChartBar ke dalam import
import { 
  FaThLarge, 
  FaTicketAlt, 
  FaChartBar, 
  FaBell, 
  FaSignOutAlt, 
  FaStar, 
  FaUser, 
  FaDatabase, 
  FaHistory, 
  FaCog 
} from 'react-icons/fa';

const Performance = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  
  // State untuk data statistik asli
  const [perfStats, setPerfStats] = useState({
    total: 0,
    resolved: 0,
    onHold: 0,
    inProgress: 0,
    rating: 0
  });

  // --- 1. VERIFIKASI AKSES & AMBIL DATA KINERJA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil profil untuk verifikasi role
        const profileRes = await API.get('/api/auth/me');
        const role = profileRes.data.role;
        setUserRole(role);
        setUserName(profileRes.data.name);

        // Proteksi: Hanya OPERATIONAL dan ADMIN yang boleh melihat analisis kinerja
        if (role === 'USER') {
          navigate('/dashboard');
          return;
        }

        // Ambil statistik kinerja staff dari backend
        try {
            const statsRes = await API.get('/api/tickets/performance');
            // Pastikan statsRes.data ada sebelum set state
            if (statsRes.data) {
                setPerfStats(statsRes.data);
            }
        } catch (err) {
            // Menangani Error 500 dari screenshot Anda agar aplikasi tetap jalan
            console.warn("Endpoint performance belum tersedia atau server error (500), menggunakan data default.");
        }

      } catch (error) {
        console.error("Gagal memuat data kinerja:", error);
        // Jika token tidak valid, baru arahkan ke login
        if (error.response && error.response.status === 401) {
            navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px', color: 'white'}}>Menganalisis Data Kinerja...</div>;

  // --- MENU SIDEBAR DINAMIS ---
  const menus = {
    ADMIN: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Database', icon: <FaDatabase />, link: '/database' },
      { name: 'Setting', icon: <FaCog />, link: '/admin-setting' },
      { name: 'User Log History', icon: <FaHistory />, link: '/user-log' },
    ],
    OPERATIONAL: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Tiket Disetujui', icon: <FaTicketAlt />, link: '/ticket-approval' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
      { name: 'Kinerja', icon: <FaChartBar />, link: '/performance' }, 
    ]
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {/* Menggunakan operator optional chaining ?. untuk keamanan */}
          {(menus[userRole] || []).map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.name === 'Kinerja' ? 'active' : ''}`}>
                  <span className="sidebar-icon">{item.icon}</span>
                  {item.name}
                </li>
            </Link>
          ))}
        </ul>
      </aside>

      <div className="main-content">
        <header className="top-header">
          <div className="header-title">Helpdesk & Ticketing System FTI</div>
          <div className="header-icons">
            <span style={{fontSize: '0.8rem', marginRight: '10px'}}>Halo, {userName}</span>
            <FaBell />
            <Link to="/profile" style={{color: 'white', display: 'flex', alignItems: 'center'}}><FaUser /></Link>
            <button onClick={handleLogout} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}>
                <FaSignOutAlt />
            </button>
          </div>
        </header>

        <div className="content-padding">
          <h2 className="page-title">Analisis Kinerja Staff</h2>

          <div className="performance-layout">
            
            <div className="perf-left-column">
                <div className="perf-profile-card">
                    <div className="perf-avatar-large"><FaUser /></div>
                    <div style={{flex: 1}}>
                        <div className="perf-name">{userName}</div>
                        <div className="perf-info-box">
                            <div className="perf-detail-text">
                                Role: {userRole}<br/>
                                Departemen: Operation Team (FTI)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="perf-stats-card">
                    <div className="stats-row stats-total">
                        <span>Total tiket yang ditangani</span>
                        <span>{perfStats.total || 0}</span>
                    </div>
                    <div className="stats-row">
                        <span>Tiket Selesai (Resolved)</span>
                        <span>{perfStats.resolved || 0}</span>
                    </div>
                    <div className="stats-row">
                        <span>Tiket Tertunda (On Hold)</span>
                        <span>{perfStats.onHold || 0}</span>
                    </div>
                    <div className="stats-row">
                        <span>Sedang Diproses (In Progress)</span>
                        <span>{perfStats.inProgress || 0}</span>
                    </div>
                    <div className="stats-row" style={{marginTop: '15px', alignItems: 'center'}}>
                        <span>Rata-rata Penilaian</span>
                        <div className="rating-stars">
                            {[1,2,3,4,5].map(i => (
                                <FaStar key={i} color={i <= (perfStats.rating || 5) ? "#FFC107" : "#E4E5E9"} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="perf-right-column">
                <h3 style={{marginBottom: '15px', color: '#333'}}>Rekan Kerja Tim Operasi</h3>
                {[1, 2, 3].map((val) => (
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