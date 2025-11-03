import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

// Komponen Global
import AdminBar from './components/admin/AdminBar';
import ChatalogLayout from './components/layout/ChatalogLayout'; // Dari 'main'

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
import TokoLokasiPage from './pages/toko/TokoLokasiPage';
import TokoAboutPage from './pages/toko/TokoAboutPage';
import TokoContactPage from './pages/toko/TokoContactPage';
import TokoBlogPage from './pages/toko/TokoBlogPage';
import TokoGaleriPage from './pages/toko/TokoGaleriPage';

// === Halaman Lain ===
import NotFoundPage from './pages/NotFoundPage';

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

        {/* === Rute dari 'fitur-onboarding-flow' === */}
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/register/tutorial" element={<OnboardingTutorial />} />
        <Route path="/register/info" element={<OnboardingInfo />} />
        <Route path="/editor" element={<EditorPage />} /> 

        {/* === Rute Toko Klien & 404 === */}
        <Route path="/toko/:slug" element={<TokoRenderer />} />
        <Route path="/toko/:slug/lokasi" element={<TokoLokasiPage />} />
        <Route path="/toko/:slug/tentang" element={<TokoAboutPage />} />
        <Route path="/toko/:slug/kontak" element={<TokoContactPage />} />
        <Route path="/toko/:slug/blog" element={<TokoBlogPage />} />
        <Route path="/toko/:slug/galeri" element={<TokoGaleriPage />} />
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