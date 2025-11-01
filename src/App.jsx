import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth'; // Kita akan pakai ini

// Komponen Global
import AdminBar from './components/admin/AdminBar';

// === Halaman Web Utama "Chatalog" ===
import HomePageChatalog from './pages/chatalog/HomePageChatalog';
import AboutPage from './pages/chatalog/AboutPage';
import ContactPage from './pages/chatalog/ContactPage';
import SimulatorPage from './pages/chatalog/SimulatorPage';
import LoginPage from './pages/chatalog/LoginPage';
import RegisterPage from './pages/chatalog/RegisterPage';

// === Halaman Template "Toko Klien" ===
import TokoRenderer from './pages/toko/TokoRenderer';

// === Halaman Lain ===
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { loading } = useAuth(); // Ambil status loading dari AuthContext

  // Tampilkan loading spinner jika Firebase sedang cek status login
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* Admin Bar akan otomatis tampil di semua halaman jika kita login */}
      <AdminBar /> 
      
      <Routes>
        {/* === Rute untuk Web Utama "Chatalog" === */}
        <Route path="/" element={<HomePageChatalog />} />
        <Route path="/tentang" element={<AboutPage />} />
        <Route path="/kontak" element={<ContactPage />} />
        <Route path="/simulator" element={<SimulatorPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Halaman Onboarding */}
        <Route path="/register" element={<RegisterPage />} />

        
        {/* === Rute untuk Toko Klien === 
          Ini adalah rute "ajaib" kita.
          TokoRenderer akan menangani domain kustom atau slug /toko/:slug
        */}
        <Route path="/toko/:slug" element={<TokoRenderer />} />

        {/* TODO: Kita perlu menambahkan logika di Vercel & App.jsx
          untuk menangani Custom Domain (misal: toko-kripik.com),
          yang juga akan me-render <TokoRenderer />
        */}
        
        {/* Halaman 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;