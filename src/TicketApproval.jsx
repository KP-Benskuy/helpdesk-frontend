import React, { useState } from 'react';
import './Dashboard.css'; // Menggunakan style dasar yang sama
import './TicketApproval.css'; // Style khusus untuk tabel ini
import { Link } from 'react-router-dom'; 
import { FaThLarge, FaTicketAlt, FaChartBar, FaBell, FaUser, FaSignOutAlt, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';

const TicketApproval = () => {
  // Hardcode role sebagai 'operation' karena halaman ini khusus tim operation
  const userRole = 'operation'; 

  // Data Dummy sesuai gambar mockup
  const [tickets, setTickets] = useState([
    { id: '1234', subject: 'Login issue', category: 'Access issue', priority: 'High', date: '13/08/21', assignedTo: '' },
    { id: '1124', subject: 'New ticket issue', category: 'Access issue', priority: 'Medium', date: '14/08/21', assignedTo: '' },
    { id: '1224', subject: 'New request', category: 'Feedback', priority: 'Low', date: '13/08/21', assignedTo: '' },
    { id: '1244', subject: 'Ticket submission', category: 'Ticketing', priority: 'High', date: '14/08/21', assignedTo: '' },
    { id: '1114', subject: 'Login issue', category: 'Access issue', priority: 'High', date: '3/08/21', assignedTo: '' },
  ]);

  // Sidebar Menu (Sama seperti Dashboard, tapi yang aktif adalah Tiket Disetujui)
  const menus = [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Tiket Disetujui', icon: <FaTicketAlt />, link: '/ticket-approval', active: true },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
      { name: 'Kinerja', icon: <FaChartBar />, link: '/performance' }, 
  ];

  return (
    <div className="dashboard-container">
      {/* --- SIDEBAR (Reused Structure) --- */}
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {menus.map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.active ? 'active' : ''}`}>
                    <span className="sidebar-icon">{item.icon}</span>
                    {item.name}
                </li>
            </Link>
          ))}
        </ul>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="main-content">
        {/* HEADER */}
        <header className="top-header">
          <div className="header-title">Helpdesk & Ticketing System FTI</div>
          <div className="header-icons">
            <FaBell />
            <FaUser />
            <Link to="/" style={{color: 'white'}}><FaSignOutAlt /></Link>
          </div>
        </header>

        {/* ISI KONTEN */}
        <div className="content-padding">
          <h2 className="page-title">Tiket Disetujui</h2>

          {/* CONTROLS (Search & Show Entries) */}
          <div className="table-controls">
            <div className="search-box">
                <input type="text" placeholder="Cari Tiket" />
                <FaSearch className="search-icon"/>
            </div>
            
            <div className="entries-box">
                Show: 
                <select className="entries-select">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select> 
                Entries
            </div>
          </div>

          {/* TABEL */}
          <div className="table-responsive">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Ticket No.</th>
                        <th>Subjek</th>
                        <th>Kategori</th>
                        <th>Prioritas</th>
                        <th>Tanggal</th>
                        <th>Aksi</th>
                        <th>Tugaskan ke</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td><a href={`/ticket/${ticket.id}`} className="ticket-link">{ticket.id}</a></td>
                            <td>{ticket.subject}</td>
                            <td>{ticket.category}</td>
                            <td>{ticket.priority}</td>
                            <td>{ticket.date}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="btn-action btn-approve"><FaCheck /></button>
                                    <button className="btn-action btn-reject"><FaTimes /></button>
                                </div>
                            </td>
                            <td>
                                <select className="assign-select">
                                    <option value="">-- Pilih --</option>
                                    <option value="tech1">Teknisi A</option>
                                    <option value="tech2">Teknisi B</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>

          {/* FOOTER TABEL (Pagination) */}
          <div className="table-footer">
            <p>Menampilkan 1 hingga 5 dari 5 entri</p>
            <div className="pagination">
                <span>&laquo;</span>
                <span className="active">1</span>
                <span>&raquo;</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TicketApproval;