# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Helpdesk Frontend 🛠️

Repositori ini berisi kode frontend untuk aplikasi Helpdesk, dibangun menggunakan **React** dan **Vite**.

## 📋 Prasyarat (Prerequisites)

Untuk menjalankan proyek ini dengan lancar, pastikan lingkungan komputermu memiliki spesifikasi berikut (sesuai dengan environment development saat ini):

* **Node.js**: Versi **v24.11.1** (atau lebih baru).
* **npm**: Versi **11.6.2**.
* **Git**: Terinstal di sistem.

> **Catatan:** Menggunakan versi Node.js yang jauh lebih lama mungkin menyebabkan error pada dependensi tertentu.

## 🚀 Cara Menjalankan Project (Getting Started)

Ikuti langkah-langkah berikut untuk menjalankan project ini di lokal:

### 1. Clone Repositori
Download source code ke komputermu:

```bash
git clone [https://github.com/KP-Benskuy/helpdesk-frontend.git](https://github.com/KP-Benskuy/helpdesk-frontend.git)
```
```
cd helpdesk-frontend
```
```
npm install
```
```
npm run dev
```

Setelah itu, buka browser dan kunjungi link yang muncul di terminal (biasanya http://localhost:5173)

🛠️ Perintah Tersedia (Available Scripts)

Di dalam direktori project, kamu bisa menjalankan perintah berikut:

    npm run dev: Menjalankan aplikasi di mode development (Hot Reload aktif).

    npm run build: Membuild aplikasi untuk produksi (hasil build masuk ke folder dist).

    npm run lint: Mengecek kualitas dan kerapian kode menggunakan ESLint.

    npm run preview: Melihat hasil build produksi secara lokal sebelum deploy.

📂 Struktur Folder

    /src: Berisi kode utama aplikasi (Components, Pages, Assets).

    /public: Berisi aset statis (seperti favicon, logo).

    vite.config.js: Konfigurasi utama untuk Vite.
