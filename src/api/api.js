import axios from 'axios';

const API = axios.create({
    baseURL: 'https://helpdesk-backend.zeabur.app'
});

// Fungsi untuk otomatis pasang token JWT di setiap request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;