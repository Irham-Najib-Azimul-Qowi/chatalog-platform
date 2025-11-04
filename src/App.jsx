import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

// Komponen Global
import AdminBar from './components/admin/AdminBar';
import ChatalogLayout from './components/layout/ChatalogLayout'; 

// === Halaman Web Utama "Chatalog" ===
import HomePageChatalog from './pages/chatalog/HomePageChatalog';
import AboutPage from './pages/chatalog/AboutPage';
import ContactPage from './pages/chatalog/ContactPage';
import SimulatorPage from './pages/chatalog/SimulatorPage';
import LoginPage from './pages/chatalog/LoginPage';
// --- Dari 'fitur-onboarding-flow' ---
import RegisterPage from './pages/chatalog/RegisterPage';
import OnboardingTutorial from './pages/chatalog/OnboardingTutorial'; 
import OnboardingInfo from './pages/chatalog/OnboardingInfo';     
import EditorPage from './pages/chatalog/EditorPage';           
// --- Akhir ---

// === Halaman Template "Toko Klien" ===
import TokoRenderer from './pages/toko/TokoRenderer';
import TokoHomepage from './pages/toko/TokoHomepage'; // IMPORT TAMBAHAN
import TokoProdukPage from './pages/toko/TokoProdukPage'; // IMPORT TAMBAHAN
import TokoLokasiPage from './pages/toko/TokoLokasiPage';
import TokoAboutPage from './pages/toko/TokoAboutPage';
import TokoContactPage from './pages/toko/TokoContactPage';
import TokoBlogPage from './pages/toko/TokoBlogPage';
import TokoGaleriPage from './pages/toko/TokoGaleriPage';

// === Halaman Lain ===
import NotFoundPage from './pages/NotFoundPage';

import ProtectedRoute from './components/common/ProtectedRoute'; 

// Komponen 'Loading'
function AppLoading() {
  const { loading } = useAuth(); 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold">Memuat...</h1>
      </div>
    );
  }

  return (
    <>
      <AdminBar /> 

      <Routes>
        {/* === Rute dari 'main' (ChatalogLayout) === */}
        <Route element={<ChatalogLayout />}>
          <Route path="/" element={<HomePageChatalog />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/kontak" element={<ContactPage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
        </Route>

        {/* Halaman non-layout */}
        <Route path="/login" element={<LoginPage />} />

        {/* === Rute dari 'fitur-onboarding-flow' (Protected) === */}
        <Route path="/register" element={<RegisterPage />} /> 
        <Route 
          path="/register/tutorial" 
          element={
            <ProtectedRoute allowedRoles={['toko_admin']}>
              <OnboardingTutorial />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/register/info" 
          element={
            <ProtectedRoute allowedRoles={['toko_admin']}>
              <OnboardingInfo />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/editor" 
          element={
            <ProtectedRoute allowedRoles={['toko_admin']}>
              <EditorPage />
            </ProtectedRoute>
          } 
        /> 

        {/* ========================================================== */}
        {/* === Rute Toko Klien (Menggunakan Nested Routes) === */}
        <Route path="/toko/:slug" element={<TokoRenderer />}>
            {/* Halaman Indeks (Home): /toko/:slug */}
            <Route index element={<TokoHomepage />} /> 
            
            {/* Halaman Anak (Relative Path) */}
            <Route path="produk" element={<TokoProdukPage />} /> 
            <Route path="lokasi" element={<TokoLokasiPage />} />
            <Route path="about" element={<TokoAboutPage />} />
            <Route path="kontak" element={<TokoContactPage />} />
            <Route path="blog" element={<TokoBlogPage />} />
            <Route path="galeri" element={<TokoGaleriPage />} />
        </Route>
        {/* ========================================================== */}

        {/* Rute 404 (Untuk semua yang tidak cocok) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
// Fungsi App utama
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLoading />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
