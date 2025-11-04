import React from 'react';
import { useAuth } from '../../hooks/useAuth';

function AdminBarToko() {
  // PERBAIKAN CACAT #2: Gunakan 'logout', bukan 'signOut'
  const { logout } = useAuth();
  
  // TODO: Teman Anda (Dev B) akan mengisi ini dengan logic
  // untuk menampilkan tombol-tombol toolbar (Produk, Tampilan, dll)
  // dan memanggil useToko()

  return (
    <div 
      className="bg-[#303F9F] text-white p-3 shadow-lg w-full h-full"
    >
      <div className="flex flex-col justify-between items-center h-full">
        <div className="font-bold text-sm md:text-base">
          ADMIN TOKO (Placeholder)
        </div>
        
        {/* Placeholder untuk tombol-tombol toolbar */}
        <div className="space-y-4">
          <p>Produk</p>
          <p>Tampilan</p>
          <p>Promo</p>
        </div>

        <button
          onClick={logout} // <-- Gunakan 'logout'
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-3 py-2 rounded-md w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminBarToko;