import React from 'react';
import { useAuth } from '../../hooks/useAuth';
// Hapus impor Super Admin Bar
import AdminBarToko from './AdminBarToko';
import { useLocation } from 'react-router-dom'; // Impor useLocation

// Komponen ini SEKARANG HANYA UNTUK ADMIN TOKO
function AdminBar() {
  const { currentUser, userData } = useAuth();
  const location = useLocation();

  // Cek apakah user adalah Admin Toko DAN sedang berada di Halaman Editor
  const isTokoAdminOnEditor = 
    currentUser && 
    userData && 
    userData.role === 'toko_admin' && 
    location.pathname === '/editor';

  // Tampilkan bar HANYA jika kondisi di atas terpenuhi
  if (isTokoAdminOnEditor) {
    return <AdminBarToko />;
  }
  
  // Jika tidak (termasuk Super Admin), jangan tampilkan apa-apa
  return null;
}

export default AdminBar;