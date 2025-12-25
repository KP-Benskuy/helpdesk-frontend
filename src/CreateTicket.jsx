// File: src/CreateTicket.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from './api/api';
import './Dashboard.css'; 
import './CreateTicket.css'; 
import { FaThLarge, FaTicketAlt, FaUser, FaBell, FaSignOutAlt, FaPaperclip } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CreateTicket = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('simulatedRole') || 'user');
  const [categories, setCategories] = useState([]); 
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Ambil Kategori dari API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Gagal mengambil kategori", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSendTicket = async () => {
    if (!subject || !selectedCategory || !description) {
      return Swal.fire('Oops!', 'Harap isi semua kolom yang wajib.', 'warning');
    }

    try {
      // Logika POST ke API bisa diletakkan di sini
      Swal.fire({
        title: 'Berhasil!',
        text: 'Tiket Anda telah terkirim.',
        icon: 'success',
        confirmButtonColor: '#00aaff'
      });
      
      setSubject('');
      setDescription('');
      setSelectedCategory('');
    } catch (error) {
      Swal.fire('Gagal', 'Terjadi kesalahan saat mengirim tiket.', 'error');
    }
  };

  const menus = {
    user: [
      { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
      { name: 'Buat Tiket', icon: <FaTicketAlt />, link: '/create-ticket' },
      { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
    ]
  };

  if (userRole !== 'user') {
    return (
      <div style={{padding: '50px', textAlign: 'center'}}>
          <h1>Akses Ditolak</h1>
          <p>Halaman Buat Tiket hanya untuk User.</p>
          <Link to="/dashboard">Kembali ke Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
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
        
        <div style={{padding: '20px', marginTop: 'auto', fontSize: '0.8em'}}>
            <p>Simulasi Login Sebagai:</p>
            <select onChange={(e) => {
                setUserRole(e.target.value);
                localStorage.setItem('simulatedRole', e.target.value);
            }} value={userRole} style={{width: '100%', padding: '5px'}}>
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
            <Link to="/profile" style={{color: 'white', display: 'flex', alignItems: 'center'}}><FaUser /></Link>
            <Link to="/" style={{color: 'white'}}><FaSignOutAlt /></Link>
          </div>
        </header>

        <div className="content-padding">
          <div className="create-ticket-container">
            <h2 className="form-header-title">Buat Tiket Baru</h2>

            {/* ROW 1: Subject (Sekarang paling atas) */}
            <div className="form-group form-row-full">
                <label>Subject:</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Contoh: Kendala Login WiFi"
                />
            </div>

            {/* ROW 2: Main Split */}
            <div className="form-main-split">
                {/* KIRI: Kategori & Prioritas */}
                <div className="left-inputs">
                    <div className="form-group">
                        <label>Kategori:</label>
                        <select 
                          className="input-field" 
                          value={selectedCategory} 
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Pilih Kategori</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Prioritas:</label>
                        <select className="input-field">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                </div>

                {/* KANAN: Deskripsi */}
                <div className="right-textarea">
                    <div className="form-group" style={{height: '100%'}}>
                        <label>Deskripsi:</label>
                        <div style={{position: 'relative', height: '100%'}}>
                            <textarea 
                              className="textarea-field"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Jelaskan kendala Anda..."
                            ></textarea>
                            <div className="attachment-icon" title="Lampirkan File">
                                <FaPaperclip />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="btn-submit-ticket" onClick={handleSendTicket}>Kirim</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;