// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// --- IMPORT HALAMAN BARU ---
import LandingPage from './LandingPage';

// --- IMPORT HALAMAN AUTH ---
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

// --- IMPORT HALAMAN UMUM (USER, ADMIN, OPERATIONAL) ---
import Dashboard from './Dashboard';
import MyTicket from './MyTicket';
import Profile from './Profile';
import ProfileSetting from './ProfileSetting';
import CreateTicket from './CreateTicket';

// --- IMPORT HALAMAN STAFF (OPERATIONAL) ---
import Performance from './Performance';
import TicketApproval from './TicketApproval'; 

// --- IMPORT HALAMAN ADMIN ---
import Database from './Database';
import AdminSetting from './AdminSetting';
import UserLogHistory from './UserLogHistory';

// Catatan: RoleManagement dihapus karena fiturnya sudah tidak digunakan/digabung ke Database

function App() {
  return (
    <Router>
      <Routes>
        {/* --- HALAMAN UTAMA (LANDING PAGE) --- */}
        <Route path="/" element={<LandingPage />} />

        {/* --- HALAMAN AUTH --- */}
        {/* Path login diubah ke /login agar tidak bentrok dengan Landing Page */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* --- HALAMAN UMUM --- */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-ticket" element={<MyTicket />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
        <Route path="/create-ticket" element={<CreateTicket />} />

        {/* --- HALAMAN STAFF (OPERATIONAL) --- */}
        <Route path="/performance" element={<Performance />} />
        <Route path="/ticket-approval" element={<TicketApproval />} /> 

        {/* --- HALAMAN ADMIN --- */}
        <Route path="/database" element={<Database />} />
        <Route path="/admin-setting" element={<AdminSetting />} />
        <Route path="/user-log" element={<UserLogHistory />} />

      </Routes>
    </Router>
  );
}

export default App;