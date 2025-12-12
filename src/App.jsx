// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// --- IMPORT SEMUA HALAMAN ---
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

import Dashboard from './Dashboard';
import MyTicket from './MyTicket';
import Profile from './Profile';
import ProfileSetting from './ProfileSetting';

import Performance from './Performance';
import TicketApproval from './TicketApproval'; // <-- IMPORT BARU

import Database from './Database';
import AdminSetting from './AdminSetting';

import UserLogHistory from './UserLogHistory';
import CreateTicket from './CreateTicket';

function App() {
  return (
    <Router>
      <Routes>

        {/* --- HALAMAN AUTH --- */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* --- HALAMAN UMUM (SEMUA ROLE) --- */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-ticket" element={<MyTicket />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />

        {/* --- HALAMAN STAFF (TECHNICAL & OPERATION) --- */}
        <Route path="/performance" element={<Performance />} />
        <Route path="/ticket-approval" element={<TicketApproval />} /> {/* <-- ROUTE BARU */}

        {/* --- HALAMAN ADMIN --- */}
        <Route path="/database" element={<Database />} />
        <Route path="/admin-setting" element={<AdminSetting />} />

        {/* --- HALAMAN KHUSUS BARU --- */}
        <Route path="/user-log" element={<UserLogHistory />} />
        <Route path="/create-ticket" element={<CreateTicket />} />

      </Routes>
    </Router>
  );
}

export default App;