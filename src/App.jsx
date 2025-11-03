import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

// Komponen Global
import AdminBar from './components/admin/AdminBar';
import ChatalogLayout from './components/layout/ChatalogLayout'; // 1. Impor Layout Baru

// === Halaman Web Utama "Chatalog" ===
import HomePageChatalog from './pages/chatalog/HomePageChatalog';
import AboutPage from './pages/chatalog/AboutPage';
import ContactPage from './pages/chatalog/ContactPage';
import SimulatorPage from './pages/chatalog/SimulatorPage';
import LoginPage from './pages/chatalog/LoginPage';
import RegisterPage from './pages/chatalog/RegisterPage';
import OnboardingTutorial from './pages/chatalog/OnboardingTutorial'; 
import OnboardingInfo from './pages/chatalog/OnboardingInfo';     
import EditorPage from './pages/chatalog/EditorPage';           

// === Halaman Template "Toko Klien" ===
import TokoRenderer from './pages/toko/TokoRenderer';
import TokoLokasiPage from './pages/toko/TokoLokasiPage';
import TokoAboutPage from './pages/toko/TokoAboutPage';
import TokoContactPage from './pages/toko/TokoContactPage';
import TokoBlogPage from './pages/toko/TokoBlogPage';
import TokoGaleriPage from './pages/toko/TokoGaleriPage';


// === Halaman Lain ===
import NotFoundPage from './pages/NotFoundPage';

// Komponen 'Loading'
function AppLoading() {
  const { loading } = useAuth(); // Ambil status loading dari AuthContext

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold">Memuat...</h1>
      </div>
    );
  }

  // Jika tidak loading, tampilkan rute aplikasi
  return (
    <>
      {/* Admin Bar akan otomatis tampil di semua halaman jika kita login */}
      <AdminBar /> 
      
      <Routes>
        {/* === Rute untuk Web Utama "Chatalog" === */}
        {/* 2. Bungkus semua halaman publik Chatalog dengan ChatalogLayout */}
        <Route element={<ChatalogLayout />}>
          <Route path="/" element={<HomePageChatalog />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/kontak" element={<ContactPage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
        </Route>
        
        {/* Halaman yang TIDAK pakai layout (misal: Login, Register) */}
        <Route path="/login" element={<LoginPage />} />

        {/* === Alur Onboarding & Registrasi === */}
        {/* Step 1: Buat Akun */}
        <Route path="/register" element={<RegisterPage />} /> 
        
        {/* Step 2: Tonton Tutorial */}
        <Route path="/register/tutorial" element={<OnboardingTutorial />} />
        
        {/* Step 3: Isi Info Toko (Card UI) */}
        <Route path="/register/info" element={<OnboardingInfo />} />
        
        {/* Step 4: Masuk ke Editor Canva */}
        <Route path="/editor" element={<EditorPage />} /> 
        {/* Catatan: Rute '/editor' akan jadi halaman utama Admin Toko.
          Kita juga akan memproteksi rute ini nanti.
        */}
        
        {/* === Rute untuk Toko Klien === */}
        <Route path="/toko/:slug" element={<TokoRenderer />} />
        
        {/* Rute opsional untuk fitur halaman kustom */}
        <Route path="/toko/:slug/lokasi" element={<TokoLokasiPage />} />
        <Route path="/toko/:slug/tentang" element={<TokoAboutPage />} />
        <Route path="/toko/:slug/kontak" element={<TokoContactPage />} />
        <Route path="/toko/:slug/blog" element={<TokoBlogPage />} />
        <Route path="/toko/:slug/galeri" element={<TokoGaleriPage />} />

        {/* Halaman 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

// Fungsi App utama, sekarang hanya membungkus AuthProvider dan Router
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLoading /> {/* Pindahkan logic loading ke komponen terpisah */}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;