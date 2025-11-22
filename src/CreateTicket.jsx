import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';    // Layout Utama
import './CreateTicket.css'; // CSS Khusus Halaman Ini
import { FaThLarge, FaTicketAlt, FaUser, FaBell, FaSignOutAlt, FaPaperclip } from 'react-icons/fa';

const CreateTicket = () => {
  // Cek Peran (Wajib User)
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'user');

  // --- MENU SIDEBAR ---
  const menus = {
    user: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Buat Tiket', icon: <FaTicketAlt />, link: '/create-ticket' }, // Aktif
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
    ],
    // Role lain kosongkan saja karena akses ditolak
    admin: [], technical: [], operation: []
  };

  // --- JIKA BUKAN USER ---
  if (userRole !== 'user') {
    return (
      <div style={{padding: '50px', textAlign: 'center'}}>
          <h1>Akses Ditolak</h1>
          <p>Halaman Buat Tiket hanya untuk User.</p>
          <Link to="/dashboard">Kembali ke Dashboard</Link>
          <div style={{marginTop: '20px'}}>
             <select onChange={(e) => {
                 setUserRole(e.target.value);
                 localStorage.setItem('simulatedRole', e.target.value);
             }} value={userRole}>
                 <option value="user">User</option>
                 <option value="admin">Admin</option>
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
          {menus.user.map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.name === 'Buat Tiket' ? 'active' : ''}`}>
                <span className="sidebar-icon">{item.icon}</span>
                {item.name}
                </li>
            </Link>
          ))}
        </ul>
        
        {/* SIMULASI LOGIN */}
        <div style={{padding: '20px', marginTop: 'auto', fontSize: '0.8em'}}>
            <p>Simulasi Login Sebagai:</p>
            <select onChange={(e) => {
                setUserRole(e.target.value);
                localStorage.setItem('simulatedRole', e.target.value);
            }} value={userRole} style={{width: '100%', padding: '5px'}}>
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
          
          <div className="create-ticket-container">
            <h2 className="form-header-title">Buat Tiket Baru</h2>

            {/* ROW 1: Ticket No & Tanggal */}
            <div className="form-row-2-col">
                <div className="form-group">
                    <label>Ticket No.:</label>
                    <input type="text" className="input-field" value="12345 (Auto)" readOnly />
                </div>
                <div className="form-group">
                    <label>Tanggal:</label>
                    <input type="text" className="input-field" value="20/11/2025" readOnly />
                </div>
            </div>

            {/* ROW 2: Nama & Departemen */}
            <div className="form-row-2-col">
                <div className="form-group">
                    <label>Nama:</label>
                    <input type="text" className="input-field" value="Jawir_Ireng" readOnly />
                </div>
                <div className="form-group">
                    <label>Departemen:</label>
                    <input type="text" className="input-field" value="Informatika" readOnly />
                </div>
            </div>

            {/* ROW 3: Subject */}
            <div className="form-group form-row-full">
                <label>Subject:</label>
                <input type="text" className="input-field" />
            </div>

            {/* ROW 4: Main Split (Inputs Left, Textarea Right) */}
            <div className="form-main-split">
                {/* KIRI */}
                <div className="left-inputs">
                    <div className="form-group">
                        <label>Kategori:</label>
                        <select className="input-field">
                            <option></option>
                            <option>Access Issue</option>
                            <option>Hardware</option>
                            <option>Software</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Tipe:</label>
                        <select className="input-field">
                            <option></option>
                            <option>Request</option>
                            <option>Incident</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Prioritas:</label>
                        <select className="input-field">
                            <option></option>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                </div>

                {/* KANAN */}
                <div className="right-textarea">
                    <div className="form-group" style={{height: '100%'}}>
                        <label>Deskripsi:</label>
                        <div style={{position: 'relative', height: '100%'}}>
                            <textarea className="textarea-field"></textarea>
                            <div className="attachment-icon" title="Lampirkan File">
                                <FaPaperclip />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RECAPTCHA DUMMY */}
            <div className="recaptcha-box">
                <input type="checkbox" className="recaptcha-check" />
                <span style={{fontSize: '0.9rem', color: '#555'}}>I'm not a robot</span>
                <div style={{marginLeft: 'auto', textAlign: 'center', fontSize: '0.6rem', color: '#aaa'}}>
                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="captcha" width="30" />
                    <br/>reCAPTCHA
                </div>
            </div>

            {/* TOMBOL KIRIM */}
            <button className="btn-submit-ticket">Kirim</button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateTicket;