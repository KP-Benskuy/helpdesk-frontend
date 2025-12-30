// File: src/AdminSetting.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from './api/api';
import Swal from 'sweetalert2';
import './Dashboard.css';
import './AdminSetting.css';

import { FaThLarge, FaDatabase, FaCog, FaHistory, FaUser, FaBell, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';

const AdminSetting = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  
  // State untuk menampung data pengaturan dari database
  const [settings, setSettings] = useState({
    language: 'ID',
    autoBackup: true,
    smtpEmail: true,
    logActivity: true,
    allowRegistration: true,
    defaultRole: 'USER',
    globalNotification: true
  });

  // 1. Verifikasi Akses Admin & Ambil Pengaturan dari Database
  useEffect(() => {
    const initPage = async () => {
      try {
        const profileRes = await API.get('/api/auth/me');
        if (profileRes.data.role !== 'ADMIN') {
          navigate('/dashboard');
          return;
        }
        setUserName(profileRes.data.name);

        // Ambil data setting dari backend (Asumsi endpoint: /api/settings)
        // Jika backend belum siap, ia akan menggunakan data default di state
        try {
          const settingsRes = await API.get('/api/settings');
          if (settingsRes.data) setSettings(settingsRes.data);
        } catch (err) {
          console.warn("Endpoint /api/settings belum tersedia, menggunakan mode lokal.");
        }

      } catch (error) {
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    initPage();
  }, [navigate]);

  // 2. Fungsi untuk Update Setting ke Database
  const handleToggle = async (field, value) => {
    const updatedSettings = { ...settings, [field]: value };
    
    // Optimistic UI update (ubah di layar dulu agar terasa cepat)
    setSettings(updatedSettings);

    try {
      // Kirim perubahan ke backend
      await API.put('/api/settings', updatedSettings);
      
      // Notifikasi kecil di pojok (Toast)
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      Toast.fire({ icon: 'success', title: 'Pengaturan disimpan' });

    } catch (error) {
      console.error("Gagal menyimpan ke server:", error);
      Swal.fire('Error', 'Gagal sinkronisasi ke server', 'error');
    }
  };

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px', color: 'white'}}>Memuat Pengaturan...</div>;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {[
            { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
            { name: 'Database', icon: <FaDatabase />, link: '/database' },
            { name: 'Setting', icon: <FaCog />, link: '/admin-setting' }, 
            { name: 'User Log History', icon: <FaHistory />, link: '/user-log' },
          ].map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.name === 'Setting' ? 'active' : ''}`}>
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
            <span style={{fontSize: '0.8rem', marginRight: '10px'}}>Admin: {userName}</span>
            <FaBell />
            <Link to="/profile" style={{color: 'white'}}><FaUser /></Link>
            <button onClick={() => { localStorage.clear(); navigate('/'); }} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}><FaSignOutAlt /></button>
          </div>
        </header>

        <div className="content-padding">
          <h2 className="page-title">System Settings</h2>

          <div className="admin-setting-container">
            
            {/* GROUP 1: GENERAL */}
            <div className="setting-group">
                <div className="group-header">General <FaChevronDown size={12}/></div>
                <div className="group-row">
                    <span>Language</span>
                    <div className="lang-toggle">
                        <div className={`lang-opt ${settings.language === 'ID' ? 'active' : 'inactive'}`} 
                             onClick={() => handleToggle('language', 'ID')}>ID</div>
                        <div className={`lang-opt ${settings.language === 'EN' ? 'active' : 'inactive'}`} 
                             onClick={() => handleToggle('language', 'EN')}>EN</div>
                    </div>
                </div>
                <div className="group-row">
                    <span>Auto Data Backup</span>
                    <input type="checkbox" className="custom-checkbox" 
                           checked={settings.autoBackup} 
                           onChange={(e) => handleToggle('autoBackup', e.target.checked)} />
                </div>
            </div>

            {/* GROUP 2: INTEGRATION */}
            <div className="setting-group">
                <div className="group-header">Connect To Backend <FaChevronDown size={12}/></div>
                <div className="group-row">
                    <span>SMTP Email Notification</span>
                    <input type="checkbox" className="custom-checkbox" 
                           checked={settings.smtpEmail} 
                           onChange={(e) => handleToggle('smtpEmail', e.target.checked)} />
                </div>
                <div className="group-row">
                    <span>Log Activity Tracking</span>
                    <input type="checkbox" className="custom-checkbox" 
                           checked={settings.logActivity} 
                           onChange={(e) => handleToggle('logActivity', e.target.checked)} />
                </div>
            </div>

            {/* GROUP 3: ACCESS CONTROL */}
            <div className="setting-group">
                <div className="group-header">Access Control <FaChevronDown size={12}/></div>
                <div className="group-row">
                    <span>Allow User Registration</span>
                    <input type="checkbox" className="custom-checkbox" 
                           checked={settings.allowRegistration} 
                           onChange={(e) => handleToggle('allowRegistration', e.target.checked)} />
                </div>
                <div className="group-row">
                    <span>Default Role for New User</span>
                    <select className="auth-dropdown" 
                            value={settings.defaultRole} 
                            onChange={(e) => handleToggle('defaultRole', e.target.value)}>
                        <option value="USER">USER</option>
                        <option value="OPERATIONAL">OPERATIONAL</option>
                    </select>
                </div>
            </div>

            {/* GROUP 4: NOTIFICATION */}
            <div className="setting-group">
                <div className="group-header">Push Notification <FaChevronDown size={12}/></div>
                <div className="group-row">
                    <span>Enable Global Notification</span>
                    <input type="checkbox" className="custom-checkbox" 
                           checked={settings.globalNotification} 
                           onChange={(e) => handleToggle('globalNotification', e.target.checked)} />
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSetting;