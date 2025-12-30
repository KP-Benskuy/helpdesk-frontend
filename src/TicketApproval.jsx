// File: src/TicketApproval.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from './api/api';
import './Dashboard.css'; 
import './TicketApproval.css'; 
import { FaThLarge, FaTicketAlt, FaChartBar, FaBell, FaUser, FaSignOutAlt, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const TicketApproval = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Ambil data profil
                const profileRes = await API.get('/api/auth/me');
                setUserName(profileRes.data.name);
                setUserRole(profileRes.data.role);

                // 2. Ambil data tiket
                const ticketRes = await API.get('/api/tickets');
                
                // --- PERBAIKAN VALIDASI DATA ---
                // Pastikan kita bekerja dengan Array. Jika backend mengirim { tickets: [...] }, ambil propertinya.
                const rawData = ticketRes.data;
                const actualTickets = Array.isArray(rawData) 
                    ? rawData 
                    : (rawData.tickets || []); 

                if (Array.isArray(actualTickets)) {
                    const pendingTickets = actualTickets.filter(t => 
                        t.status?.toLowerCase() === 'open' || 
                        t.status?.toLowerCase() === 'pending'
                    );
                    setTickets(pendingTickets);
                } else {
                    setTickets([]);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
                // JANGAN panggil localStorage.clear() di sini agar tidak tertendang ke login jika hanya error data
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    const handleApprove = async (ticketId) => {
        if (userRole === 'USER') {
            return Swal.fire('Akses Ditolak', 'Hanya Staff yang bisa menyetujui tiket.', 'error');
        }

        try {
            await API.put(`/api/tickets/${ticketId}`, { status: 'In Progress' });
            Swal.fire('Berhasil!', 'Tiket disetujui.', 'success');
            setTickets(tickets.filter(t => t.id !== ticketId));
        } catch (error) {
            Swal.fire('Gagal', 'Gagal memperbarui status tiket.', 'error');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const filteredTickets = tickets.filter(t => 
        (t.title || t.subject || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
        (t.id && t.id.toString().includes(searchQuery))
    );

    if (loading) return <div style={{textAlign: 'center', marginTop: '50px', color: 'white'}}>Memuat Data Tiket...</div>;

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <ul className="sidebar-menu">
                    <Link to="/dashboard" style={{textDecoration: 'none'}}>
                        <li className="sidebar-item"><span className="sidebar-icon"><FaThLarge /></span>Dashboard</li>
                    </Link>
                    <Link to="/ticket-approval" style={{textDecoration: 'none'}}>
                        <li className="sidebar-item active"><span className="sidebar-icon"><FaTicketAlt /></span>Persetujuan Tiket</li>
                    </Link>
                    <Link to="/my-ticket" style={{textDecoration: 'none'}}>
                        <li className="sidebar-item"><span className="sidebar-icon"><FaTicketAlt /></span>Tiket Saya</li>
                    </Link>
                </ul>
            </aside>

            <div className="main-content">
                <header className="top-header">
                    <div className="header-title">Helpdesk & Ticketing System FTI</div>
                    <div className="header-icons">
                        <span style={{fontSize: '0.8rem', marginRight: '10px'}}>{userRole}: {userName}</span>
                        <FaBell />
                        <Link to="/profile" style={{color: 'white'}}><FaUser /></Link>
                        <button onClick={handleLogout} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}><FaSignOutAlt /></button>
                    </div>
                </header>

                <div className="content-padding">
                    <h2 className="page-title">Monitoring Persetujuan Tiket</h2>
                    
                    <div className="table-controls">
                        <div className="search-box">
                            <input 
                                type="text" 
                                placeholder="Cari tiket..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className="search-icon"/>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>No. Tiket</th>
                                    <th>Subjek</th>
                                    <th>Tanggal</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTickets.length > 0 ? filteredTickets.map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td>#{ticket.id}</td>
                                        <td>{ticket.title || ticket.subject}</td>
                                        <td>{ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString('id-ID') : '-'}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button onClick={() => handleApprove(ticket.id)} className="btn-approve"><FaCheck /></button>
                                                <button className="btn-reject"><FaTimes /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>Tidak ada antrean tiket saat ini.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketApproval;