import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Hook kustom untuk mengakses data autentikasi.
 * Menyediakan:
 * - currentUser: Objek user dari Firebase Auth (atau null)
 * - userData: Dokumen dari Firestore (role, name, tokoId) (atau null)
 * - loading: Boolean status cek auth
 * - login(phone, password): Fungsi untuk login
 * - logout(): Fungsi untuk logout
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};