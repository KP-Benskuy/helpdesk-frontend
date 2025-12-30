// File: src/CreateTicket.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from './api/api';
import './Dashboard.css'; 
import './CreateTicket.css'; 
import { FaThLarge, FaTicketAlt, FaUser, FaBell, FaSignOutAlt, FaPaperclip } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [categories, setCategories] = useState([]); 
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priority, setPriority] = useState('Low');
  const [loading, setLoading] = useState(true);

  // 1. Verifikasi Akses & Ambil Kategori Asli
  useEffect(() => {
    const initPage = async () => {
      try {
        // Ambil profil untuk memastikan yang akses adalah USER
        const profileRes = await API.get('/api/auth/me');
        setUserRole(profileRes.data.role);
        setUserName(profileRes.data.name);

        // Hanya USER yang boleh buat tiket
        if (profileRes.data.role !== 'USER') {
          navigate('/dashboard');
          return;
        }

        // Ambil data kategori dari backend
        const catRes = await API.get('/api/categories');
        setCategories(catRes.data);
      } catch (error) {
        console.error("Gagal inisialisasi halaman", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    initPage();
  }, [navigate]);

  // 2. Fungsi Kirim Tiket Nyata ke Backend
  const handleSendTicket = async () => {
    if (!subject || !selectedCategory || !description) {
      return Swal.fire('Oops!', 'Harap isi semua kolom wajib.', 'warning');
    }

    Swal.fire({
      title: 'Mengirim Tiket...',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      // Sesuai dokumentasi backend temanmu (asumsi endpoint /api/tickets)
      await API.post('/api/tickets', {
        title: subject,
        description: description,
        categoryId: selectedCategory,
        priority: priority
      });

      Swal.fire({
        title: 'Berhasil!',
        text: 'Tiket Anda telah terdaftar di sistem.',
        icon: 'success',
        confirmButtonColor: '#00aaff'
      });
      
      // Reset Form
      setSubject('');
      setDescription('');
      setSelectedCategory('');
      setPriority('Low');

      // Opsional: Pindah ke halaman daftar tiket
      // navigate('/my-ticket');

    } catch (error) {
      console.error("Gagal mengirim tiket:", error);
      Swal.fire('Gagal', error.response?.data?.msg || 'Terjadi kesalahan saat mengirim tiket.', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px', color: 'white'}}>Memproses...</div>;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul className="sidebar-menu">
          {[
            { name: 'Dashboard', icon: <FaThLarge />, link: '/dashboard' },
            { name: 'Buat Tiket', icon: <FaTicketAlt />, link: '/create-ticket' },
            { name: 'Tiket Saya', icon: <FaTicketAlt />, link: '/my-ticket' },
          ].map((item, index) => (
            <Link to={item.link} key={index} style={{textDecoration: 'none'}}>
                <li className={`sidebar-item ${item.name === 'Buat Tiket' ? 'active' : ''}`}>
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
            <Link to="/profile" style={{color: 'white', display: 'flex', alignItems: 'center'}}><FaUser /></Link>
            <button onClick={handleLogout} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}>
                <FaSignOutAlt />
            </button>
          </div>
        </header>

        <div className="content-padding">
          <div className="create-ticket-container">
            <h2 className="form-header-title">Buat Tiket Baru</h2>

            <div className="form-group form-row-full">
                <label>Subject / Judul Kendala:</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Contoh: Proyektor Kelas B302 Mati"
                />
            </div>

            <div className="form-main-split">
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
                        <select 
                          className="input-field" 
                          value={priority} 
                          onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>

                <div className="right-textarea">
                    <div className="form-group" style={{height: '100%'}}>
                        <label>Deskripsi Detail Kendala:</label>
                        <div style={{position: 'relative', height: '100%'}}>
                            <textarea 
                              className="textarea-field"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Ceritakan kendala Anda secara lengkap..."
                            ></textarea>
                            <div className="attachment-icon" title="Lampirkan Gambar/File">
                                <FaPaperclip />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="btn-submit-ticket" onClick={handleSendTicket}>Kirim Laporan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;