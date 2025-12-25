// File: src/MyTicket.jsx
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import './MyTicket.css';
import { Link } from 'react-router-dom';

import { FaThLarge, FaTicketAlt, FaChartBar, FaSearch, FaStar, FaFileAlt, FaUserPlus, FaDownload, FaSignOutAlt, FaBell, FaUser } from 'react-icons/fa';

const MyTicket = () => {
  
  // Mengambil peran dari memori browser, default ke 'user'
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'user');

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setUserRole(newRole);
    localStorage.setItem('simulatedRole', newRole); 
  };

  // Data dummy tiket yang telah disesuaikan
  const tickets = [
    { id: '1234', subject: 'Login issue', category: 'AKUN', priority: 'High', date: '13/08/25', status: 'In Progress', supportBy: 'Operation Team', rating: 3 },
    { id: '1124', subject: 'New ticket issue', category: 'HARDWARE', priority: 'Medium', date: '14/08/25', status: 'On hold', supportBy: 'Operation Team', rating: 4 },
    { id: '1224', subject: 'New request', category: 'SOFTWARE', priority: 'Low', date: '13/08/25', status: 'Closed', supportBy: 'Operation Team', rating: 5 },
    { id: '1244', subject: 'Ticket submission', category: 'AKUN', priority: 'High', date: '14/08/25', status: 'In Progress', supportBy: 'Operation Team', rating: 0 }, 
  ];

  const getStatusClass = (status) => {
    if (status === 'In Progress') return 'status-progress';
    if (status === 'On hold') return 'status-hold';
    if (status === 'Closed') return 'status-closed';
    return '';
  };

  // Menu navigasi disesuaikan dengan dokumentasi backend (Technical dihapus)
  const menus = {
    user: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Buat Tiket', icon: <FaTicketAlt />, link: '/create-ticket' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
    ],
    operation: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Tiket Disetujui', icon: <FaTicketAlt />, link: '/ticket-approval' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
      { name: 'Kinerja', icon: <FaChartBar />, link: '/performance' },
    ],
    admin: [] 
  };

  // Tampilan jika Admin mencoba masuk ke My Ticket
  if (userRole === 'admin') {
    return (
        <div style={{padding: '50px', textAlign: 'center'}}>
            <h1>Akses Ditolak</h1>
            <p>Halaman Database dan Pengaturan khusus untuk Admin. Admin tidak memiliki daftar tiket pribadi.</p>
            <Link to="/dashboard">Kembali ke Dashboard</Link>
            
            <div style={{marginTop: '20px'}}>
                <p>Simulasi Ganti Role:</p>
                <select onChange={handleRoleChange} value={userRole}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="operation">Operation Team</option>
                </select>
            </div>
        </div>
    )
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {menus[userRole]?.map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.name === 'Tiket Saya' ? 'active' : ''}`}>
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
                <Link to="/profile" style={{color: 'white', display: 'flex', alignItems: 'center'}}>
                    <FaUser />
                </Link>
                <Link to="/" style={{color: 'white'}}><FaSignOutAlt /></Link>
            </div>
        </header>

        <div className="ticket-content">
          <h2 className="page-title">
            {userRole === 'user' ? 'Daftar Tiket Saya' : 'Manajemen Tiket'}
          </h2>

          <div className="ticket-header-controls">
            <div className="search-box">
                <FaSearch color="#666" />
                <input type="text" placeholder="Cari nomor atau subjek..." className="search-input" />
            </div>
            <div>
                Tampilkan: <select><option>10</option><option>25</option></select> Entri
            </div>
          </div>

          <div className="ticket-table-wrapper">
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>No Tiket</th>
                  <th>Subjek</th>
                  {userRole !== 'user' && <th>Kategori</th>}
                  {userRole !== 'user' && <th>Prioritas</th>}
                  
                  {userRole === 'user' && <th>Status</th>}
                  {userRole === 'user' && <th>Dukungan Oleh</th>}

                  <th>Tanggal</th>

                  {userRole !== 'user' && <th>Status</th>}
                  
                  {userRole === 'user' ? <th>Rating</th> : <th>Penanggung Jawab</th>}
                  {userRole !== 'user' && <th>Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td><span className="link-blue">{ticket.id}</span></td>
                    <td>{ticket.subject}</td>

                    {userRole !== 'user' && <td>{ticket.category}</td>}
                    {userRole !== 'user' && <td>{ticket.priority}</td>}

                    {userRole === 'user' && (
                        <td><span className={`status-badge ${getStatusClass(ticket.status)}`}>{ticket.status}</span></td>
                    )}
                    {userRole === 'user' && <td>{ticket.supportBy}</td>}

                    <td>{ticket.date}</td>

                    {userRole !== 'user' && (
                        <td><span className={`status-badge ${getStatusClass(ticket.status)}`}>{ticket.status}</span></td>
                    )}

                    <td>
                        {userRole === 'user' ? (
                            <div className="star-rating">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} color={i < ticket.rating ? "#FFD700" : "#e4e5e9"} />
                                ))}
                            </div>
                        ) : (
                           <span>{ticket.supportBy}</span> 
                        )}
                    </td>

                    {userRole !== 'user' && (
                        <td>
                            <div className="action-icons">
                                <FaFileAlt title="Detail" style={{cursor: 'pointer'}} />
                                <FaUserPlus title="Assign Agent" style={{cursor: 'pointer'}} />
                                <FaDownload title="Export PDF" style={{cursor: 'pointer'}} />
                            </div>
                        </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{marginTop: '20px', fontSize: '0.9rem', color: '#666'}}>
              Menampilkan {tickets.length} data tiket.
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyTicket;