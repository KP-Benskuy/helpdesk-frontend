import axios from 'axios';

const API = axios.create({
    baseURL: 'https://helpdesk-backend.zeabur.app'
});

// 1. Interceptor Request: Mengambil token terbaru dari localStorage
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 2. Interceptor Response: Menangani Error Global
API.interceptors.response.use(
    (response) => {
        // Jika berhasil, langsung kembalikan respon
        return response;
    },
    (error) => {
        // Cek jika error datang dari server
        if (error.response) {
            const { status, data } = error.response;

            // Log error ke konsol untuk memudahkan debugging kita
            console.error(`[API Error] Status: ${status} | Msg: ${data.msg || data.message}`);

            // HANYA logout jika statusnya 401 (Unauthorized) dan BUKAN saat di halaman login
            if (status === 401 && window.location.pathname !== '/login') {
                console.warn("Sesi tidak valid atau expired. Mengarahkan ke login...");
                
                // Opsional: Jika kamu ingin sistem TIDAK otomatis logout, 
                // komentari dua baris di bawah ini:
                // localStorage.clear();
                // window.location.href = '/login';
            }
        } else {
            console.error("[Network Error] Tidak dapat terhubung ke server Zeabur.");
        }
        
        return Promise.reject(error);
    }
);

export default API;