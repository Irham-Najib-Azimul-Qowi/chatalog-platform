import React, { useState } from 'react'; // <-- 1. Impor useState
import { useAuth } from '../../hooks/useAuth';
// 2. Impor modal-modal yang akan kita gunakan
import SuperAdminOrderModal from './modals/SuperAdmin_OrderModal';
import SuperAdminTokoModal from './modals/SuperAdmin_TokoModal';
// import SuperAdminContentModal from './modals/SuperAdmin_ContentModal'; // Nanti
// import ProfilModal from './modals/ProfilModal'; // Nanti

// Ini adalah UI untuk Admin Bar Super Admin [cite: IV.B]
function AdminBarSuperAdmin() {
  const { logout } = useAuth();
  // 3. Buat state untuk mengontrol modal mana yang terbuka
  const [activeModal, setActiveModal] = useState(null); // null, 'order', 'toko'

  const handleLogout = async () => {
    try {
      await logout();
      // AuthContext akan otomatis redirect kita ke halaman login
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <>
      <div 
        className="bg-[#006064] text-white p-3 shadow-lg w-full sticky top-0 z-50"
        style={{ backgroundColor: '#006064' }} // Fallback untuk Tailwind v2
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="font-bold text-sm md:text-base">
            CHATALOG SUPER ADMIN
          </div>
          <nav className="flex items-center space-x-2 md:space-x-4">
            {/* 4. Hubungkan tombol ke state */}
            <button className="text-sm hover:bg-white/20 p-2 rounded-md">Content</button>
            <button 
              onClick={() => setActiveModal('order')} 
              className="text-sm hover:bg-white/20 p-2 rounded-md"
            >
              Order
            </button>
            <button 
              onClick={() => setActiveModal('toko')}
              className="text-sm hover:bg-white/20 p-2 rounded-md"
            >
              Toko
            </button>
            <button className="text-sm hover:bg-white/20 p-2 rounded-md">Profil</button>
            <button
              onClick={handleLogout}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-3 py-2 rounded-md"
              style={{ backgroundColor: '#FFAB40' }} // Fallback
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
      
      {/* 5. Render Modal secara kondisional */}
      {/* Jika activeModal == 'order', tampilkan modal Order */}
      <SuperAdminOrderModal 
        isOpen={activeModal === 'order'} 
        onClose={() => setActiveModal(null)} 
      />
      
      {/* Jika activeModal == 'toko', tampilkan modal Toko */}
      {/* (Kita akan isi file ini di step berikutnya) */}
      <SuperAdminTokoModal 
        isOpen={activeModal === 'toko'} 
        onClose={() => setActiveModal(null)} 
      />
    </>
  );
}

export default AdminBarSuperAdmin;