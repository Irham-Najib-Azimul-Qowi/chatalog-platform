import React from 'react';
import { useAuth } from '../../hooks/useAuth';

// Ini adalah UI untuk Admin Bar Super Admin
function AdminBarSuperAdmin() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // AuthContext akan otomatis redirect kita ke halaman login
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <div 
      // Menggunakan tema warna Chatalog
      className="bg-[#006064] text-white p-3 shadow-lg w-full sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="font-bold text-sm md:text-base">
          CHATALOG SUPER ADMIN
        </div>
        <nav className="flex items-center space-x-2 md:space-x-4">
          {/* Menu-menu ini akan kita fungsikan nanti */}
          <button className="text-sm hover:bg-white/20 p-2 rounded-md">Content</button>
          <button className="text-sm hover:bg-white/20 p-2 rounded-md">Order</button>
          <button className="text-sm hover:bg-white/20 p-2 rounded-md">Toko</button>
          <button className="text-sm hover:bg-white/20 p-2 rounded-md">Profil</button>
          <button
            onClick={handleLogout}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-3 py-2 rounded-md"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}

export default AdminBarSuperAdmin;