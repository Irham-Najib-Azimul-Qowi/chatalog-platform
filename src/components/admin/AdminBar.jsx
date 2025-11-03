import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import AdminBarSuperAdmin from './AdminBarSuperAdmin';
import AdminBarToko from './AdminBarToko';

// Komponen ini bertindak sebagai "controller"
// Ia memutuskan bar mana yang harus ditampilkan
function AdminBar() {
  const { currentUser, userData } = useAuth(); // Ambil status login & data user

  if (!currentUser || !userData) {
    // Jika tidak ada yang login, jangan tampilkan apa-apa
    return null;
  }

  if (userData.role === 'superadmin') {
    // Jika yang login Super Admin, tampilkan bar-nya
    return <AdminBarSuperAdmin />;
  }

  if (userData.role === 'toko_admin') {
    // Jika yang login Admin Toko, tampilkan bar-nya
    // (Ini adalah placeholder, teman Anda akan mengisinya nanti)
    return <AdminBarToko />;
  }

  // Default, jangan tampilkan apa-apa jika role tidak dikenali
  return null;
}

export default AdminBar;