import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
// 1. Impor hanya modal Super Admin
import SuperAdminOrderModal from './modals/SuperAdmin_OrderModal';
import SuperAdminTokoModal from './modals/SuperAdmin_TokoModal';
import SuperAdminContentModal from './modals/SuperAdmin_ContentModal';

// HAPUS IMPOR MODAL TOKO: ProfilModal sudah dihapus

// Ini adalah UI untuk Admin Bar Super Admin [cite: IV.B]
function AdminBarSuperAdmin() {
  const { logout } = useAuth();
  // 2. State hanya untuk modal Super Admin
  const [activeModal, setActiveModal] = useState(null); 

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <>
      <div 
        className="bg-[#006064] text-white p-3 shadow-lg w-full sticky top-0 z-50"
        style={{ backgroundColor: '#006064' }}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="font-bold text-sm md:text-base">
            CHATALOG SUPER ADMIN
          </div>
          <nav className="flex items-center space-x-2 md:space-x-4">
            {/* Tombol Content */}
            <button 
              onClick={() => setActiveModal('content')}
              className="text-sm hover:bg-white/20 p-2 rounded-md"
            >
              Content
            </button>
            {/* Tombol Order */}
            <button 
              onClick={() => setActiveModal('order')} 
              className="text-sm hover:bg-white/20 p-2 rounded-md"
            >
              Order
            </button>
            {/* Tombol Toko */}
            <button 
              onClick={() => setActiveModal('toko')}
              className="text-sm hover:bg-white/20 p-2 rounded-md"
            >
              Toko
            </button>
            {/* Tombol Profil Toko milik Dev B Dihapus dari sini */}
            
            <button
              onClick={handleLogout}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-3 py-2 rounded-md"
              style={{ backgroundColor: '#FFAB40' }}
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
      
      {/* 4. Render modal Super Admin saja */}
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
      {/* PENTING: ProfilModal Dihapus dari sini */}
    </>
  );
}

export default AdminBarSuperAdmin;

