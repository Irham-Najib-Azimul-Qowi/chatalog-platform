import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from './Spinner'; // Pastikan file Spinner.jsx ada

// Komponen ini akan memproteksi rute
// Kita akan tentukan role apa yang diizinkan
function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, userData, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Tampilkan loading spinner jika status auth (Firebase Auth) belum jelas
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!currentUser) {
    // Jika tidak login, tendang ke halaman login
    // 'state' berguna agar setelah login bisa kembali ke halaman sebelumnya
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // --- PERBAIKAN BUG ADA DI SINI ---
  if (!userData) {
    // Jika user login (currentUser ada), 
    // TAPI data Firestore-nya (role) BELUM SIAP (masih null)
    // JANGAN tendang, tapi TAMPILKAN LOADING.
    // AuthContext akan segera menyediakan data ini.
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  // --- AKHIR PERBAIKAN ---

  if (allowedRoles && !allowedRoles.includes(userData.role)) {
    // Jika login, TAPI role-nya salah (misal: Super Admin coba akses /editor)
    // Tendang ke halaman utama
    return <Navigate to="/" replace />;
  }

  // Jika lolos semua, tampilkan halaman (children)
  return children;
}

export default ProtectedRoute;