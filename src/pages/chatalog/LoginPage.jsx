import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Navigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore"; // Impor getDoc
import { db } from '../../services/firebase'; // Impor db

// Komponen Halaman Login Utama
function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, currentUser, userData, loading } = useAuth(); // Ambil dari hook
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!phone || !password) {
      setError('Nomor Telepon dan Password wajib diisi.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Panggil fungsi login dari AuthContext
      const userCredential = await login(phone, password);
      
      // Ambil role DAN slug secara manual di sini untuk redirect
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const dbUserData = userDocSnap.data();
        
        // --- Logika Pengalihan (Redirect) ---
        if (dbUserData.role === 'superadmin') {
          navigate("/", { replace: true }); // Super Admin ke Homepage Chatalog
        } else if (dbUserData.role === 'toko_admin') {
          
          // Ambil slug toko dari dokumen TOKO, bukan user
          // Kita butuh dokumen 'tokos' dulu
          // Untuk sekarang, kita arahkan ke halaman editor
          navigate("/editor", { replace: true }); // Admin Toko ke halaman editor
          
        }
      } else {
        setError('Data user tidak ditemukan di database.');
      }
      
    } catch (err) {
      if (err.code === 'auth/invalid-credential') {
        setError('Nomor Telepon atau Password salah.');
      } else {
        setError('Terjadi kesalahan. Coba lagi nanti.');
      }
      console.error("Login Error:", err);
    }
    setIsSubmitting(false);
  };

  // --- Redirect jika sudah login ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1>Memeriksa status login...</h1>
      </div>
    ); 
  }
  
  if (currentUser && userData) {
    if (userData.role === 'superadmin') {
      return <Navigate to="/" replace />; // Super Admin ke Homepage Chatalog
    } else if (userData.role === 'toko_admin') {
      return <Navigate to="/editor" replace />; // Admin Toko ke halaman editor
    }
  }
  // --- Akhir Redirect ---

  // Jika belum login, tampilkan form
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Login ke Chatalog
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label 
              htmlFor="phone" 
              className="block text-sm font-medium text-gray-700"
            >
              Nomor Telepon
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Contoh: 08123456789"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Memproses...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;