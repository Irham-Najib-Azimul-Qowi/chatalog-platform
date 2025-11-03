import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import AdminBarSuperAdmin from './AdminBarSuperAdmin';
// Kita HAPUS impor AdminBarToko dari sini

// Komponen ini SEKARANG HANYA UNTUK SUPER ADMIN
function AdminBar() {
  const { currentUser, userData } = useAuth(); // Ambil status login & data user

  // Tampilkan bar HANYA jika yang login adalah Super Admin
  if (currentUser && userData && userData.role === 'superadmin') {
    return <AdminBarSuperAdmin />;
  }

  // Jika bukan Super Admin (atau tidak login), jangan tampilkan apa-apa.
  // Admin Toko akan ditangani oleh halaman /editor.
  return null;
}

export default AdminBar;