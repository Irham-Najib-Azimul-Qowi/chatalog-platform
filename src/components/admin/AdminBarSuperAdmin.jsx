import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
// 1. Impor CANGKANG Modal (Slide-Over baru kita)
import Modal from '../common/Modal'; 

// 2. Impor KONTEN Modalnya
import SuperAdminOrderModal from './modals/SuperAdmin_OrderModal';
import SuperAdminTokoModal from './modals/SuperAdmin_TokoModal';
import SuperAdminContentModal from './modals/SuperAdmin_ContentModal';
import ProfilModal from './modals/ProfilModal';

function AdminBarSuperAdmin() {
  const { logout } = useAuth();
  const [activeModal, setActiveModal] = useState(null); // 'order', 'toko', 'content', 'profil'
  
  const handleLogout = async () => { /* ... (fungsi logout Anda) ... */ };

  // 3. Fungsi untuk me-render konten modal & judul
  const renderModalContent = () => {
    switch (activeModal) {
      case 'order':
        return { 
          title: "Manajemen Order", 
          content: <SuperAdminOrderModal isOpen={true} onClose={() => setActiveModal(null)} /> 
        };
      case 'toko':
        return { 
          title: "Manajemen Toko Klien", 
          content: <SuperAdminTokoModal isOpen={true} onClose={() => setActiveModal(null)} /> 
        };
      case 'content':
        return { 
          title: "Edit Konten Publik Chatalog", 
          content: <SuperAdminContentModal isOpen={true} onClose={() => setActiveModal(null)} /> 
        };
      case 'profil':
        return { 
          title: "Edit Profil", 
          content: <ProfilModal isOpen={true} onClose={() => setActiveModal(null)} /> 
        };
      default:
        return { title: '', content: null };
    }
  };
  
  const { title, content } = renderModalContent();

  return (
    <>
      {/* Navbar Super Admin (UI tidak berubah) */}
      <div 
        className="bg-[#006064] text-white p-3 shadow-lg w-full sticky top-0 z-40" 
        style={{ backgroundColor: '#006064' }}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="font-bold text-sm md:text-base">
            CHATALOG SUPER ADMIN
          </div>
          <nav className="flex items-center space-x-2 md:space-x-4">
            <button onClick={() => setActiveModal('content')} className="text-sm hover:bg-white/20 p-2 rounded-md">Content</button>
            <button onClick={() => setActiveModal('order')} className="text-sm hover:bg-white/20 p-2 rounded-md">Order</button>
            <button onClick={() => setActiveModal('toko')} className="text-sm hover:bg-white/20 p-2 rounded-md">Toko</button>
            <button onClick={() => setActiveModal('profil')} className="text-sm hover:bg-white/20 p-2 rounded-md">Profil</button>
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
      
      {/* 4. Render CANGKANG Modal (Slide-Over) */}
      <Modal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)}
        title={title}
      >
        {content} {/* Masukkan konten yang sesuai ke dalamnya */}
      </Modal>
    </>
  );
}

export default AdminBarSuperAdmin;