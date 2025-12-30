// File: src/UserLogHistory.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from './api/api';
import './Dashboard.css';
import './UserLogHistory.css';

import { FaThLarge, FaDatabase, FaCog, FaHistory, FaUser, FaBell, FaSignOutAlt } from 'react-icons/fa';

const UserLogHistory = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [logs, setLogs] = useState([]); // State untuk data log asli
  const [loading, setLoading] = useState(true);

  // --- 1. VERIFIKASI AKSES & AMBIL DATA DARI BACKEND ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cek profil admin
        const profileRes = await API.get('/api/auth/me');
        if (response.data.role !== 'ADMIN') {
          navigate('/dashboard');
          return;
        }
        setUserName(profileRes.data.name);

        // Ambil riwayat log aktivitas dari API
        // Catatan: Pastikan teman Anda sudah menyediakan endpoint ini
        const logsRes = await API.get('/api/logs'); 
        setLogs(logsRes.data);
      } catch (error) {
        console.error("Gagal mengambil riwayat log:", error);
        // Jika API /api/logs belum ada, kita set [] agar tidak error
        setLogs([]);
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
    return <div style={{textAlign: 'center', marginTop: '50px', color: 'white'}}>Menghubungkan ke Server Log...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {[
            { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
            { name: 'Database', icon: <FaDatabase />, link: '/database' },
            { name: 'Setting', icon: <FaCog />, link: '/admin-setting' },
            { name: 'User Log History', icon: <FaHistory />, link: '/user-log' },
          ].map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.name === 'User Log History' ? 'active' : ''}`}>
                <span className="sidebar-icon">{item.icon}</span>
                {item.name}
                </li>
            </Link>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <header className="top-header">
          <div className="header-title">Helpdesk & Ticketing System FTI</div>
          <div className="header-icons">
            <span style={{fontSize: '0.8rem', marginRight: '10px'}}>Admin: {userName}</span>
            <FaBell />
            <Link to="/profile" style={{color: 'white', display: 'flex', alignItems: 'center'}}><FaUser /></Link>
            <button onClick={handleLogout} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}>
                <FaSignOutAlt />
            </button>
          </div>
        </header>

        <div className="content-padding">
          <h2 className="page-title">User Activity Logs</h2>

          <div className="log-container">
            <div className="log-controls">
                Total Aktivitas: <strong>{logs.length}</strong> Riwayat Terdeteksi
            </div>

            <div className="log-table-wrapper">
                <table className="log-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Waktu Aktivitas</th>
                            <th>User/Staff</th>
                            <th>Role</th>
                            <th>Aksi/Aktivitas</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length > 0 ? logs.map((log, index) => (
                            <tr key={log.id || index}>
                                <td>{index + 1}.</td>
                                <td>{new Date(log.createdAt).toLocaleString('id-ID')}</td>
                                <td>{log.user?.name || log.userName || 'Unknown'}</td>
                                <td><span className={`badge ${log.role}`}>{log.role}</span></td>
                                <td>{log.activity || log.action}</td>
                                <td style={{color: 'green'}}>Success</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>Belum ada data log yang tercatat di database.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="log-footer">
                <span>Data ditarik langsung dari sistem database Zeabur</span>
                <div className="pagination-arrows">{'<<'} 1 {'>>'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogHistory;