// File: src/MyTicket.jsx
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import './MyTicket.css';
import { Link, useNavigate } from 'react-router-dom';
import API from './api/api';
import { 
  FaThLarge, FaTicketAlt, FaChartBar, FaSearch, 
  FaStar, FaFileAlt, FaUserPlus, FaDownload, 
  FaSignOutAlt, FaBell, FaUser 
} from 'react-icons/fa';

const MyTicket = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [tickets, setTickets] = useState([]); // State untuk menampung data tiket asli
  const [loading, setLoading] = useState(true);

  // --- 1. VERIFIKASI AKSES & AMBIL DATA TIKET ASLI ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil profil user
        const profileRes = await API.get('/api/auth/me');
        const role = profileRes.data.role;
        setUserRole(role);
        setUserName(profileRes.data.name);

        // Proteksi: Admin tidak melihat "Tiket Saya" (karena admin mengelola database)
        if (role === 'ADMIN') {
          return; // Biarkan logika return di bawah yang menangani tampilan proteksi
        }

        // Ambil tiket berdasarkan role
        // Jika USER: Ambil tiket miliknya sendiri
        // Jika OPERATIONAL: Ambil semua tiket yang perlu ditangani
        const ticketRes = await API.get('/api/tickets');
        setTickets(ticketRes.data);
      } catch (error) {
        console.error("Gagal mengambil data tiket:", error);
        if (error.response?.status === 401) navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const getStatusClass = (status) => {
    const s = status?.toLowerCase();
    if (s === 'in progress' || s === 'open') return 'status-progress';
    if (s === 'on hold' || s === 'pending') return 'status-hold';
    if (s === 'closed' || s === 'resolved') return 'status-closed';
    return '';
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const menus = {
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

  // --- 2. TAMPILAN PROTEKSI UNTUK ADMIN ---
  if (!loading && userRole === 'ADMIN') {
    return (
        <div style={{padding: '50px', textAlign: 'center', background: '#f4f7f6', minHeight: '100vh'}}>
            <FaTicketAlt size={50} color="#00aaff" />
            <h1 style={{marginTop: '20px'}}>Akses Terbatas</h1>
            <p>Admin bertugas mengelola sistem dan database pengguna. <br/>Daftar tiket pribadi hanya tersedia untuk User dan tim Operational.</p>
            <Link to="/dashboard" style={{color: '#00aaff', fontWeight: 'bold', textDecoration: 'none'}}>← Kembali ke Dashboard</Link>
        </div>
    );
  }

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px', color: '#666'}}>Memuat daftar tiket...</div>;

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
      </aside>

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

        <div className="ticket-content">
          <h2 className="page-title">
            {userRole === 'USER' ? 'Daftar Tiket Saya' : 'Manajemen Tiket Operational'}
          </h2>

          <div className="ticket-header-controls">
            <div className="search-box">
                <FaSearch color="#666" />
                <input type="text" placeholder="Cari tiket..." className="search-input" />
            </div>
            <div>
                Tampilkan: <select className="select-limit"><option>10</option><option>25</option></select> Entri
            </div>
          </div>

          <div className="ticket-table-wrapper">
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>No Tiket</th>
                  <th>Subjek</th>
                  <th>Status</th>
                  <th>Tanggal Buat</th>
                  {userRole === 'USER' ? <th>Penanggung Jawab</th> : <th>Pembuat Tiket</th>}
                  {userRole === 'USER' ? <th>Rating</th> : <th>Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {tickets.length > 0 ? tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td><span className="link-blue">#{ticket.id.toString().slice(-4)}</span></td>
                    <td><div style={{fontWeight: '500'}}>{ticket.title || ticket.subject}</div></td>
                    <td>
                      <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td>{new Date(ticket.createdAt || ticket.date).toLocaleDateString('id-ID')}</td>
                    <td>{userRole === 'USER' ? (ticket.assignedTo || 'Menunggu Staff') : (ticket.user?.name || 'User')}</td>
                    <td>
                      {userRole === 'USER' ? (
                        <div className="star-rating">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} color={i < (ticket.rating || 0) ? "#FFD700" : "#e4e5e9"} />
                          ))}
                        </div>
                      ) : (
                        <div className="action-icons">
                          <FaFileAlt title="Detail" style={{cursor: 'pointer'}} />
                          <FaUserPlus title="Tanggapi" style={{cursor: 'pointer'}} />
                          <FaDownload title="Download PDF" style={{cursor: 'pointer'}} />
                        </div>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" style={{textAlign: 'center', padding: '30px', color: '#999'}}>Belum ada tiket yang terdaftar.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="ticket-footer">
              Menampilkan {tickets.length} data tiket asli dari database.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTicket;