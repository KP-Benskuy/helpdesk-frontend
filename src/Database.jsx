// File: src/Database.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Layout Utama
import './Database.css';  // CSS Khusus Database
import { FaThLarge, FaTicketAlt, FaDatabase, FaCog, FaHistory, FaBell, FaUser, FaSignOutAlt, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

const Database = () => {
  // 1. Cek Peran
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'admin');
  
  // 2. State untuk Tab Aktif
  const [activeTab, setActiveTab] = useState('technical'); 

  // 3. State untuk Modal Tambah Data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newData, setNewData] = useState({ name: '', dept: '', speciality: '' });

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

  const getCurrentData = () => {
    if (activeTab === 'technical') return dataTechnical;
    if (activeTab === 'operation') return dataOperation;
    return dataUser;
  };

  const handleSave = () => {
    console.log("Data baru yang akan disimpan:", newData);
    // Di sini nanti bisa ditambahkan logika push ke array data
    setIsModalOpen(false);
    setNewData({ name: '', dept: '', speciality: '' });
  };

  const menus = {
    admin: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Database', icon: <FaDatabase />, link: '/database' },
      { name: 'Setting', icon: <FaCog />, link: '/admin-setting' },
      { name: 'User Log History', icon: <FaHistory />, link: '/user-log' },
    ],
    user: [], technical: [], operation: []
  };

  if (userRole !== 'admin') {
    return (
      <div style={{padding: '50px', textAlign: 'center'}}>
          <h1>Akses Ditolak</h1>
          <p>Halaman Database hanya untuk Admin.</p>
          <Link to="/dashboard">Kembali ke Dashboard</Link>
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
        <div style={{padding: '20px', marginTop: 'auto', fontSize: '0.8em'}}>
            <p>Simulasi Login Sebagai:</p>
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

          {/* TABS NAVIGATION */}
          <div className="db-tabs">
            <div className={`db-tab-item ${activeTab === 'user' ? 'active' : ''}`} onClick={() => setActiveTab('user')}>User</div>
            <div className={`db-tab-item ${activeTab === 'operation' ? 'active' : ''}`} onClick={() => setActiveTab('operation')}>Operation Team</div>
            <div className={`db-tab-item ${activeTab === 'technical' ? 'active' : ''}`} onClick={() => setActiveTab('technical')}>Technical Support</div>
          </div>

          {/* CONTROLS (Search, Add Button, & Entries) */}
          <div className="db-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
             <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div className="search-box" style={{background: '#ddd', padding: '8px 15px', borderRadius: '5px', display: 'flex', alignItems: 'center', width: '250px'}}>
                    <FaSearch color="#666" />
                    <input type="text" placeholder="Find ticket..." style={{border:'none', background:'transparent', outline:'none', marginLeft:'10px', width:'100%'}} />
                </div>
                {/* TOMBOL TAMBAH */}
                <button 
                  onClick={() => setIsModalOpen(true)}
                  style={{ backgroundColor: '#00aaff', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Tambah
                </button>
             </div>
             <div>
                 Show: <select style={{padding: '5px'}}><option>10</option></select> Entries
             </div>
          </div>

          {/* TABLE */}
          <div className="db-table-wrapper">
            <table className="db-table">
                <thead>
                    <tr>
                        <th className="checkbox-cell">No.</th>
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
                            <td className="checkbox-cell" style={{ textAlign: 'center' }}>{idx + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.dept}</td>
                            <td>{item.speciality}</td>
                            <td>
                                <div className="action-icons">
                                    <FaEdit title="Edit" style={{ cursor: 'pointer', marginRight: '10px' }} />
                                    <FaTrash title="Delete" style={{ cursor: 'pointer' }} />
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

      {/* POP UP MODAL TAMBAH DATA */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '400px' }}>
            <h3 style={{ marginBottom: '20px' }}>Tambah Role Baru</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
              <input 
                type="text" 
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                value={newData.name}
                onChange={(e) => setNewData({...newData, name: e.target.value})}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Department</label>
              <input 
                type="text" 
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                value={newData.dept}
                onChange={(e) => setNewData({...newData, dept: e.target.value})}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Speciality</label>
              <input 
                type="text" 
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                value={newData.speciality}
                onChange={(e) => setNewData({...newData, speciality: e.target.value})}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ padding: '8px 15px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '5px' }}>Batal</button>
              <button onClick={handleSave} style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: '#00aaff', color: 'white', border: 'none', borderRadius: '5px' }}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Database;