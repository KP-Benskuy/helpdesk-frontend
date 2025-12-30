import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from './api/api'; 
import './Dashboard.css';      
import './ProfileSetting.css'; 
import Swal from 'sweetalert2';
import { 
  FaThLarge, FaDatabase, FaCog, FaHistory, 
  FaUser, FaBell, FaSignOutAlt, FaTicketAlt, FaChartBar 
} from 'react-icons/fa';

const ProfileSetting = () => {
  const navigate = useNavigate();
  const [userRole] = useState(localStorage.getItem('simulatedRole') || 'user');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await API.get('/api/auth/me');
        if (response.data) {
          setFormData(prev => ({
            ...prev,
            id: response.data.id || '',
            name: response.data.name || '',
            email: response.data.email || ''
          }));
        }
      } catch (error) {
        console.error("Gagal memuat profil:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      return Swal.fire('Error', 'Konfirmasi password tidak cocok!', 'error');
    }

    setIsLoading(true);
    try {
      await API.put(`/api/users/${formData.id}`, {
        name: formData.name,
        email: formData.email,
        ...(formData.password && { password: formData.password })
      });
      Swal.fire('Berhasil!', 'Profil diperbarui.', 'success');
    } catch (error) {
      Swal.fire('Gagal', error.response?.data?.msg || 'Terjadi kesalahan', 'error');
    } finally {
      setIsLoading(false);
    }
  };

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
    operation: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
      { name: 'Kinerja', icon: <FaChartBar />, link: '/performance' },
    ]
  };

  const activeMenus = menus[userRole] || menus['user'];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">FTI Helpdesk</div>
        <ul className="sidebar-menu">
          {activeMenus.map((item, index) => (
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
          <div className="header-title">FTI Helpdesk System</div>
          <div className="header-icons">
            <FaBell />
            <Link to="/profile" style={{color: 'white'}}><FaUser /></Link>
            <Link to="/" onClick={() => localStorage.clear()} style={{color: 'white'}}><FaSignOutAlt /></Link>
          </div>
        </header>

        <div className="content-padding">
          <h2 className="page-title" style={{color: 'white', fontStyle: 'italic'}}>Profile Setting</h2>
          
          <div className="setting-container">
            <div className="tab-header">Edit Account</div>

            <div className="form-row">
                <div className="form-label">Nama Lengkap</div>
                <div className="form-input-area">
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
            </div>

            <div className="form-row">
                <div className="form-label">Email</div>
                <div className="form-input-area">
                  <input 
                    type="email" 
                    className="form-input" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
            </div>

            <div className="form-row">
                <div className="form-label">Password Baru</div>
                <div className="form-input-area">
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="Isi jika ingin ganti"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
            </div>

            <div className="form-row">
                <div className="form-label">Konfirmasi Password</div>
                <div className="form-input-area">
                  <input 
                    type="password" 
                    className="form-input" 
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
            </div>

            <div className="action-row">
                <div className="action-left">
                  <button className="btn-update" onClick={handleUpdate} disabled={isLoading}>
                    {isLoading ? 'Wait...' : 'Update Profil'}
                  </button>
                </div>
                <div className="action-right"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;