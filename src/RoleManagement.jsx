// File: src/RoleManagement.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from './api/api';
import Swal from 'sweetalert2';
import './RoleManagement.css';

const RoleManagement = () => {
    // Data dummy awal agar halaman tidak kosong
    const [users, setUsers] = useState([
        { id: 1, name: 'Fadhil Fathoni', email: 'fadhilsmp9@gmail.com', role: 'USER' },
        { id: 2, name: 'Operational Staff', email: 'ops@fti.com', role: 'OPERATIONAL' },
        { id: 3, name: 'Admin Utama', email: 'admin@fti.com', role: 'ADMIN' }
    ]);
    const [loading, setLoading] = useState(true);
    const [isSimulated, setIsSimulated] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Mencoba mengambil data asli dari backend
                const response = await API.get('/api/users'); 
                if (response.data && response.data.length > 0) {
                    setUsers(response.data);
                    setIsSimulated(false);
                }
            } catch (error) {
                console.error("API Error 403 - Menggunakan Mode Simulasi:", error);
                setIsSimulated(true); // Tandai bahwa kita sedang dalam mode simulasi
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleUpdateRole = async (userId, newRole) => {
        try {
            // 1. Coba kirim ke Backend terlebih dahulu
            await API.put(`/api/users/${userId}/role`, { role: newRole });
            
            Swal.fire({
                title: 'Berhasil!',
                text: `Role diperbarui ke ${newRole} di database.`,
                icon: 'success',
                confirmButtonColor: '#00aaff'
            });

            // Update UI
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));

        } catch (error) {
            // 2. JIKA GAGAL (Error 403), Jalankan Mode Simulasi untuk Demo
            console.warn("Update gagal, menjalankan simulasi tampilan.");
            
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
            
            Swal.fire({
                title: 'Mode Simulasi Aktif',
                text: `Gagal akses database (403), tapi tampilan diubah ke ${newRole} untuk keperluan demo.`,
                icon: 'info',
                confirmButtonColor: '#ffa500'
            });
        }
    };

    if (loading) return <div style={{textAlign: 'center', marginTop: '50px', color: 'white'}}>Memuat Data...</div>;

    return (
        <div className="role-mgmt-container" style={{padding: '40px', background: '#4FC3F7', minHeight: '100vh'}}>
            <div style={{background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)'}}>
                
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                    <h2 style={{margin: 0, color: '#333'}}>Manajemen Role Pengguna</h2>
                    {isSimulated && (
                        <span style={{background: '#eee', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', color: '#666'}}>
                            ⚠️ Mode Simulasi (Offline)
                        </span>
                    )}
                </div>
                
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                        <tr style={{background: '#00aaff', color: 'white'}}>
                            <th style={{padding: '15px', textAlign: 'left'}}>Nama</th>
                            <th style={{padding: '15px', textAlign: 'left'}}>Email</th>
                            <th style={{padding: '15px', textAlign: 'left'}}>Role</th>
                            <th style={{padding: '15px', textAlign: 'left'}}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} style={{borderBottom: '1px solid #eee'}}>
                                <td style={{padding: '15px'}}>{user.name}</td>
                                <td style={{padding: '15px'}}>{user.email}</td>
                                <td style={{padding: '15px'}}>
                                    <span style={{
                                        padding: '5px 10px', 
                                        borderRadius: '5px',
                                        background: user.role === 'ADMIN' ? '#ff4d4d' : user.role === 'OPERATIONAL' ? '#ffa500' : '#2ecc71',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '0.8rem'
                                    }}>{user.role}</span>
                                </td>
                                <td style={{padding: '15px'}}>
                                    <select 
                                        value={user.role} 
                                        onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                                        style={{padding: '8px', borderRadius: '5px', border: '1px solid #ddd', cursor: 'pointer'}}
                                    >
                                        <option value="USER">USER</option>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="OPERATIONAL">OPERATIONAL</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{marginTop: '30px', display: 'flex', justifyContent: 'space-between'}}>
                    <Link to="/dashboard" style={{textDecoration: 'none', color: '#00aaff', fontWeight: 'bold'}}>
                        ← Kembali ke Dashboard
                    </Link>
                    <small style={{color: '#999'}}>Total User: {users.length}</small>
                </div>
            </div>
        </div>
    );
};

export default RoleManagement;