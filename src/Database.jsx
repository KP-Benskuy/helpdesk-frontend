// File: src/Database.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from './api/api'; 
import './Dashboard.css'; 
import './Database.css';  
import { FaThLarge, FaDatabase, FaCog, FaHistory, FaBell, FaUser, FaSignOutAlt, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Database = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('user'); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newData, setNewData] = useState({ name: '', email: '', password: '' });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState({ id: '', name: '', email: '', role: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await API.get('/api/auth/me');
        if (profileRes.data.role !== 'ADMIN') {
          navigate('/dashboard');
          return;
        }
        setUserName(profileRes.data.name);
        refreshTable();
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const refreshTable = async () => {
    try {
      const usersRes = await API.get('/api/users');
      setUsers(usersRes.data);
    } catch (err) {
      console.error("Gagal refresh table", err);
    }
  };

  const getCurrentData = () => {
    if (activeTab === 'operation') return users.filter(u => u.role === 'OPERATIONAL');
    return users.filter(u => u.role === 'USER');
  };

  // --- FUNGSI SIMPAN DENGAN AUTO-CLOSE & AUTO-REFRESH ---
  const handleSave = async () => {
    if (!newData.name || !newData.email || !newData.password) {
        return Swal.fire('Error', 'Semua field harus diisi!', 'warning');
    }

    // Tampilkan Loading
    Swal.fire({
      title: 'Memproses...',
      text: 'Sedang mendaftarkan akun baru',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      // 1. Registrasi Akun
      const registerRes = await API.post('/api/auth/register', {
        name: newData.name,
        email: newData.email,
        password: newData.password
      });

      const newUserId = registerRes.data.user?.id || registerRes.data.id;

      // 2. Jika di tab Operation, ubah role menjadi OPERATIONAL
      if (activeTab === 'operation' && newUserId) {
          await API.put(`/api/users/${newUserId}/role`, { role: 'OPERATIONAL' });
      }

      // --- LOGIN BERHASIL: TUTUP MODAL & NOTIFIKASI ---
      setIsModalOpen(false); // Modal tertutup
      setNewData({ name: '', email: '', password: '' }); // Form bersih

      await Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `Akun ${activeTab === 'user' ? 'User' : 'Operational Staff'} telah didaftarkan.`,
        timer: 2000,
        showConfirmButton: false
      });
      
      refreshTable(); // Refresh tabel otomatis

    } catch (error) {
      console.error("Detail Error:", error.response);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: error.response?.data?.msg || 'Gagal registrasi. Pastikan email belum terdaftar.'
      });
    }
  };

  const openEditModal = (user) => {
    setEditingUser({ id: user.id, name: user.name, email: user.email, role: user.role });
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async () => {
    try {
      await API.put(`/api/users/${editingUser.id}`, {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role
      });
      
      setIsEditModalOpen(false);
      Swal.fire({ icon: 'success', title: 'Terupdate!', timer: 1500, showConfirmButton: false });
      refreshTable();
    } catch (error) {
      Swal.fire('Gagal', 'Gagal memperbarui data.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Hapus User?',
      text: "Data akan dihapus permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!'
    });

    if (confirm.isConfirmed) {
      try {
        await API.delete(`/api/users/${id}`);
        refreshTable();
        Swal.fire('Terhapus!', 'User berhasil dihapus.', 'success');
      } catch (error) {
        Swal.fire('Gagal', 'Tidak dapat menghapus user.', 'error');
      }
    }
  };

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px', color: 'white'}}>Loading Database...</div>;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {[{ name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
            { name: 'Database', icon: <FaDatabase />, link: '/database' },
            { name: 'Setting', icon: <FaCog />, link: '/admin-setting' },
            { name: 'User Log History', icon: <FaHistory />, link: '/user-log' }
          ].map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.name === 'Database' ? 'active' : ''}`}>
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
            <Link to="/profile" style={{color: 'white', display: 'flex', alignItems: 'center'}}><FaUser /></Link>
            <button onClick={() => { localStorage.clear(); navigate('/'); }} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}><FaSignOutAlt /></button>
          </div>
        </header>

        <div className="content-padding">
          <h2 className="page-title">Database Management</h2>

          <div className="db-tabs">
            <div className={`db-tab-item ${activeTab === 'user' ? 'active' : ''}`} onClick={() => setActiveTab('user')}>End Users</div>
            <div className={`db-tab-item ${activeTab === 'operation' ? 'active' : ''}`} onClick={() => setActiveTab('operation')}>Operation Team (Staff)</div>
          </div>

          <div className="db-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
             <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div className="search-box" style={{background: '#ddd', padding: '8px 15px', borderRadius: '5px', display: 'flex', alignItems: 'center', width: '250px'}}>
                    <FaSearch color="#666" />
                    <input type="text" placeholder="Cari nama..." style={{border:'none', background:'transparent', outline:'none', marginLeft:'10px', width:'100%'}} />
                </div>
                <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#00aaff', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Tambah Data</button>
             </div>
          </div>

          <div className="db-table-wrapper">
            <table className="db-table">
                <thead>
                    <tr>
                        <th className="checkbox-cell">No.</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {getCurrentData().map((item, idx) => (
                        <tr key={item.id}>
                            <td className="checkbox-cell" style={{ textAlign: 'center' }}>{idx + 1}</td>
                            <td>{item.email}</td>
                            <td>{item.name}</td>
                            <td><span className={`badge ${item.role}`}>{item.role}</span></td>
                            <td>
                                <div className="action-icons">
                                    <FaEdit onClick={() => openEditModal(item)} title="Edit" style={{ cursor: 'pointer', marginRight: '10px', color: '#f0ad4e' }} />
                                    <FaTrash onClick={() => handleDelete(item.id)} title="Delete" style={{ cursor: 'pointer', color: '#d9534f' }} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL TAMBAH DATA */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <div className="modal-content" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '400px' }}>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Tambah {activeTab === 'user' ? 'User' : 'Staff'}</h3>
            <div className="form-group" style={{marginBottom: '10px'}}>
                <label style={{color: '#333'}}>Nama Lengkap</label>
                <input type="text" style={{ width: '100%', padding: '8px' }} value={newData.name} onChange={(e) => setNewData({...newData, name: e.target.value})} />
            </div>
            <div className="form-group" style={{marginBottom: '10px'}}>
                <label style={{color: '#333'}}>Email Address</label>
                <input type="email" style={{ width: '100%', padding: '8px' }} value={newData.email} onChange={(e) => setNewData({...newData, email: e.target.value})} />
            </div>
            <div className="form-group" style={{marginBottom: '20px'}}>
                <label style={{color: '#333'}}>Password Akun</label>
                <input type="password" style={{ width: '100%', padding: '8px' }} value={newData.password} onChange={(e) => setNewData({...newData, password: e.target.value})} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ padding: '8px 15px', cursor: 'pointer' }}>Batal</button>
              <button onClick={handleSave} style={{ backgroundColor: '#00aaff', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '5px' }}>Daftarkan</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT DATA */}
      {isEditModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <div className="modal-content" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '400px' }}>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Edit Data User</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#333', fontSize: '0.9rem' }}>Nama Lengkap</label>
              <input type="text" style={{ width: '100%', padding: '8px', marginTop: '5px' }} value={editingUser.name} onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#333', fontSize: '0.9rem' }}>Email</label>
              <input type="email" style={{ width: '100%', padding: '8px', marginTop: '5px' }} value={editingUser.email} onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setIsEditModalOpen(false)} style={{ padding: '8px 15px', cursor: 'pointer' }}>Batal</button>
              <button onClick={handleUpdateUser} style={{ backgroundColor: '#f0ad4e', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '5px' }}>Update Data</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Database;