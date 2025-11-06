import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../services/firebase'; // Perlu db untuk ambil data di mode non-preview
import { doc, getDoc } from 'firebase/firestore'; // Perlu getDoc

// ... (Modal imports tetap sama) ...
import SuperAdminOrderModal from '../admin/modals/SuperAdmin_OrderModal';
import SuperAdminTokoModal from '../admin/modals/SuperAdmin_TokoModal';
import ProfilModal from '../admin/modals/ProfilModal';
import Modal from '../common/Modal';
// ... (Hook useClickOutside tetap sama) ...
function useClickOutside(ref, callback) { /* ... */ }

// Navbar baru untuk web utama Chatalog
// Tambahkan props: { isPreview = false, previewData = {} }
function NavbarChatalog({ isPreview = false, previewData = {} }) {
  const { currentUser, userData, logout } = useAuth();
  const isSuperAdmin = currentUser && userData?.role === 'superadmin';

  // State untuk data Halaman (yang di-toggle)
  const [pageSettings, setPageSettings] = useState({
    showTokoPage: true,
    showAboutPage: true,
    showContactPage: true,
  });

  // Ambil data setting halaman jika KITA TIDAK DALAM MODE PREVIEW
  useEffect(() => {
    if (isPreview) return; // Jika mode preview, kita sudah dapat data dari previewData

    const fetchPageSettings = async () => {
      try {
        const settingsDocRef = doc(db, "chatalog_content", "settings");
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
          const { showTokoPage, showAboutPage, showContactPage } = docSnap.data();
          setPageSettings({ 
            showTokoPage: showTokoPage ?? true,
            showAboutPage: showAboutPage ?? true,
            showContactPage: showContactPage ?? true,
          });
        }
      } catch (err) {
        console.error("Gagal memuat setting navbar:", err);
      }
    };

    fetchPageSettings();
  }, [isPreview]);


  // Tentukan data yang akan digunakan
  // Jika mode preview, gunakan liveData. Jika tidak, gunakan state
  const data = isPreview ? previewData : pageSettings;

  // ... (State & Ref Dropdown tetap sama) ...
  const [activeModal, setActiveModal] = useState(null); 
  const [isSuperAdminMenuOpen, setIsSuperAdminMenuOpen] = useState(false);
  const [isProfilMenuOpen, setIsProfilMenuOpen] = useState(false);
  const adminMenuRef = useRef(null);
  const profilMenuRef = useRef(null);
  useClickOutside(adminMenuRef, () => setIsSuperAdminMenuOpen(false));
  useClickOutside(profilMenuRef, () => setIsProfilMenuOpen(false));

  // ... (Fungsi handleLogout tetap sama) ...
  const handleLogout = async () => { /* ... */ };
  
  // ... (Class active/inactive tetap sama) ...
  const activeClass = "text-white font-bold";
  const inactiveClass = "text-gray-300 hover:text-white";

  return (
    <>
      <header className="bg-chatalog-primary text-white shadow-md sticky top-0 z-40">
        <nav className="container mx-auto flex items-center p-4 px-6 h-16 relative">
          
          {/* 1. BAGIAN KIRI (Dinamis berdasarkan 'data') */}
          <div className="flex-1 flex justify-start items-center space-x-6">
            
            {/* Dropdown Superadmin (Hanya muncul jika BUKAN mode preview) */}
            {isSuperAdmin && !isPreview && (
              <div className="relative" ref={adminMenuRef}>
                <button
                  onClick={() => setIsSuperAdminMenuOpen(!isSuperAdminMenuOpen)}
                  className="font-bold p-2 rounded-md hover:bg-white/20"
                >
                  Superadmin ▾
                </button>
                {isSuperAdminMenuOpen && (
                   <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                    <Link 
                      to="/superadmin/content" 
                      onClick={() => setIsSuperAdminMenuOpen(false)} 
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Edit Konten Chatalog
                    </Link>
                    <button onClick={() => { setActiveModal('order'); setIsSuperAdminMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Manajemen Order
                    </button>
                    <button onClick={() => { setActiveModal('toko'); setIsSuperAdminMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Manajemen Toko
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Link Halaman Dinamis */}
            {data.showTokoPage && (
              <NavLink to="/toko" className={({ isActive }) => isActive ? activeClass : inactiveClass} end>
                Toko
              </NavLink>
            )}
            {data.showAboutPage && (
              <NavLink to="/tentang" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
                Tentang
              </NavLink>
            )}
            {data.showContactPage && (
              <NavLink to="/kontak" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
                Kontak
              </NavLink>
            )}
          </div>

          {/* 2. BAGIAN TENGAH (LOGO) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="text-3xl font-bold">
              Chatalog
            </Link>
          </div>

          {/* 3. BAGIAN KANAN */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            {/* Jangan tampilkan login/profil jika mode preview */}
            {!isPreview && (
              <>
                {!currentUser ? (
                  <>
                    <Link to="/register" className="font-semibold text-gray-300 hover:text-white">
                      Daftar
                    </Link>
                    <Link 
                      to="/login" 
                      className="bg-chatalog-secondary text-black font-bold py-2 px-4 rounded-md hover:opacity-80 transition-colors"
                    >
                      Masuk
                    </Link>
                  </>
                ) : (
                  <div className="relative" ref={profilMenuRef}>
                    <button
                      onClick={() => setIsProfilMenuOpen(!isProfilMenuOpen)}
                      className="font-bold p-2 rounded-md hover:bg-white/20"
                    >
                      Profil ▾
                    </button>
                    {isProfilMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                        <button onClick={() => { setActiveModal('profil'); setIsProfilMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Pengaturan
                        </button>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Modal hanya di-render jika BUKAN mode preview */}
      {isSuperAdmin && !isPreview && (
        <Modal
          isOpen={activeModal !== null}
          onClose={() => setActiveModal(null)}
          title={
            activeModal === 'order' ? 'Manajemen Order' :
            activeModal === 'toko' ? 'Manajemen Toko Klien' :
            activeModal === 'profil' ? 'Edit Profil' : ''
          }
        >
          {activeModal === 'order' && <SuperAdminOrderModal isOpen={true} onClose={() => setActiveModal(null)} />}
          {activeModal === 'toko' && <SuperAdminTokoModal isOpen={true} onClose={() => setActiveModal(null)} />}
          {activeModal === 'profil' && <ProfilModal isOpen={true} onClose={() => setActiveModal(null)} />}
        </Modal>
      )}
    </>
  );
}

export default NavbarChatalog;