import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Impor Modal Super Admin
import SuperAdminOrderModal from '../admin/modals/SuperAdmin_OrderModal';
import SuperAdminTokoModal from '../admin/modals/SuperAdmin_TokoModal';
import SuperAdminContentModal from '../admin/modals/SuperAdmin_ContentModal';
import ProfilModal from '../admin/modals/ProfilModal';

// Helper Hook untuk menutup dropdown saat klik di luar
function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
}

// Navbar baru untuk web utama Chatalog
function NavbarChatalog() {
  const { currentUser, userData, logout } = useAuth();
  const isSuperAdmin = currentUser && userData?.role === 'superadmin';

  // State untuk modal
  const [activeModal, setActiveModal] = useState(null); // 'order', 'toko', 'content', 'profil'
  
  // State untuk dropdown
  const [isSuperAdminMenuOpen, setIsSuperAdminMenuOpen] = useState(false);
  const [isProfilMenuOpen, setIsProfilMenuOpen] = useState(false);
  
  // Ref untuk menutup dropdown
  const adminMenuRef = useRef(null);
  const profilMenuRef = useRef(null);
  useClickOutside(adminMenuRef, () => setIsSuperAdminMenuOpen(false));
  useClickOutside(profilMenuRef, () => setIsProfilMenuOpen(false));

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfilMenuOpen(false); // Tutup dropdown setelah logout
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  const activeClass = "text-white font-bold";
  const inactiveClass = "text-gray-300 hover:text-white";

  return (
    <>
      {/* ========================================
        BAGIAN NAVBAR (TAMPILAN)
        ========================================
      */}
      <header className="bg-[#006064] text-white shadow-md sticky top-0 z-40">
        <nav className="container mx-auto flex items-center p-4 px-6 h-16 relative">
          
          {/* 1. BAGIAN KIRI */}
          <div className="flex-1 flex justify-start items-center space-x-6">
            
            {/* Muncul HANYA jika Super Admin login */}
            {isSuperAdmin && (
              <div className="relative" ref={adminMenuRef}>
                <button
                  onClick={() => setIsSuperAdminMenuOpen(!isSuperAdminMenuOpen)}
                  className="font-bold p-2 rounded-md hover:bg-white/20"
                >
                  Superadmin ▾
                </button>
                {/* Dropdown Superadmin */}
                {isSuperAdminMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                    <button onClick={() => { setActiveModal('content'); setIsSuperAdminMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Edit Konten
                    </button>
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
            
            <NavLink to="/toko" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
              Toko {/* TODO: Ganti /toko-list ke halaman portofolio toko */}
            </NavLink>
            <NavLink to="/tentang" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
              Tentang
            </NavLink>
            <NavLink to="/kontak" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
              Kontak
            </NavLink>
          </div>

          {/* 2. BAGIAN TENGAH (LOGO) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="text-3xl font-bold">
              Chatalog {/* TODO: Ganti ini dengan <Logo /> */}
            </Link>
          </div>

          {/* 3. BAGIAN KANAN */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            {!currentUser ? (
              // --- Tampilan Logged Out ---
              <>
                <Link to="/register" className="font-semibold text-gray-300 hover:text-white">
                  Daftar
                </Link>
                <Link 
                  to="/login" 
                  className="bg-[#FFAB40] text-black font-bold py-2 px-4 rounded-md hover:bg-orange-400 transition-colors"
                >
                  Masuk
                </Link>
              </>
            ) : (
              // --- Tampilan Logged In ---
              <div className="relative" ref={profilMenuRef}>
                <button
                  onClick={() => setIsProfilMenuOpen(!isProfilMenuOpen)}
                  className="font-bold p-2 rounded-md hover:bg-white/20"
                >
                  Profil ▾
                </button>
                {/* Dropdown Profil */}
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
          </div>
        </nav>
      </header>

      {/* ========================================
        BAGIAN MODAL (LOGIKA)
        Hanya akan render jika Super Admin login
        ========================================
      */}
      {isSuperAdmin && (
        <>
          <SuperAdminOrderModal 
            isOpen={activeModal === 'order'} 
            onClose={() => setActiveModal(null)} 
          />
          <SuperAdminTokoModal 
            isOpen={activeModal === 'toko'} 
            onClose={() => setActiveModal(null)} 
          />
          <SuperAdminContentModal
            isOpen={activeModal === 'content'}
            onClose={() => setActiveModal(null)}
          />
          <ProfilModal
            isOpen={activeModal === 'profil'}
            onClose={() => setActiveModal(null)}
          />
        </>
      )}
    </>
  );
}

export default NavbarChatalog;