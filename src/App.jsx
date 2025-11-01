import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Impor semua halaman yang baru saja kita buat file-nya
import HomePageChatalog from './pages/HomePageChatalog';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SimulatorPage from './pages/SimulatorPage';
import NotFoundPage from './pages/NotFoundPage';
import TokoRenderer from './pages/TokoRenderer';

// 2. Buat "placeholder" (dummy component) untuk file yang belum kita isi
//    agar aplikasi tidak error saat dijalankan
const Placeholder = ({ pageName }) => (
  <div style={{ padding: '20px', fontFamily: 'Arial' }}>
    <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{pageName}</h1>
    <p>Halaman ini sedang dalam pengembangan.</p>
  </div>
);

// 3. Isi komponen halaman kita dengan placeholder
//    (Kita akan ganti ini nanti)
HomePageChatalog.defaultProps = { children: <Placeholder pageName="Homepage Chatalog (Publik)" /> };
LoginPage.defaultProps = { children: <Placeholder pageName="Halaman Login Utama" /> };
AboutPage.defaultProps = { children: <Placeholder pageName="Halaman Tentang Kami" /> };
ContactPage.defaultProps = { children: <Placeholder pageName="Halaman Kontak" /> };
SimulatorPage.defaultProps = { children: <Placeholder pageName="Halaman Simulator Fitur" /> };
NotFoundPage.defaultProps = { children: <Placeholder pageName="404 - Halaman Tidak Ditemukan" /> };
TokoRenderer.defaultProps = { children: <Placeholder pageName="Ini adalah Halaman Toko Klien" /> };

// 4. Buat wrapper untuk komponen halaman agar placeholder-nya berfungsi
const PageWrapper = ({ component: Component, pageName }) => {
  return <Component><Placeholder pageName={pageName} /></Component>;
};

// 5. Definisikan Router Utama
function App() {
  return (
    <BrowserRouter>
      {/* Di sinilah kita akan meletakkan komponen "Admin Bar" nanti.
        Admin Bar akan tampil di SEMUA halaman jika kita login.
      */}
      
      <Routes>
        {/* === Rute untuk Web Utama "Chatalog" === */}
        <Route path="/" element={<PageWrapper component={HomePageChatalog} pageName="Homepage Chatalog (Publik)" />} />
        <Route path="/login" element={<PageWrapper component={LoginPage} pageName="Halaman Login Utama" />} />
        <Route path="/tentang" element={<PageWrapper component={AboutPage} pageName="Halaman Tentang Kami" />} />
        <Route path="/kontak" element={<PageWrapper component={ContactPage} pageName="Halaman Kontak" />} />
        <Route path="/simulator" element={<PageWrapper component={SimulatorPage} pageName="Halaman Simulator Fitur" />} />
        
        {/* === Rute untuk Toko Klien === */}
        <Route path="/toko/:slug" element={<PageWrapper component={TokoRenderer} pageName="Halaman Toko Klien" />} />
        
        {/* Halaman 404 */}
        <Route path="*" element={<PageWrapper component={NotFoundPage} pageName="404 - Halaman Tidak Ditemukan" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;