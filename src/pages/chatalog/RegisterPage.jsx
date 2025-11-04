import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, addDoc, collection } from "firebase/firestore"; 
import { auth, db } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth'; // <-- 1. IMPOR useAuth

function RegisterPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { refreshUserData } = useAuth(); // <-- 2. AMBIL FUNGSI REFRESH

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (password.length < 6) {
      setError('Password harus minimal 6 karakter.');
      setIsSubmitting(false);
      return;
    }

    const email = `${phone}@chatalog.com`;

    try {
      // 1. Buat user di Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Buat dokumen 'toko'
      const newTokoRef = await addDoc(collection(db, "tokos"), {
        ownerUid: user.uid,
        name: `Toko Baru (${phone})`,
        createdAt: new Date(),
      });

      // 3. Buat dokumen 'users' kita
      await setDoc(doc(db, "users", user.uid), {
        name: `Admin (${phone})`,
        role: "toko_admin",
        tokoId: newTokoRef.id,
      });

      // 4. Buat dokumen 'features' & 'settings' default
      await setDoc(doc(db, `tokos/${newTokoRef.id}/features`, 'flags'), {
        show_location_page: false,
        show_mitra_section: false,
        show_promo_banner: false,
        allow_custom_theme: false,
      });
      await setDoc(doc(db, `tokos/${newTokoRef.id}/settings`, 'config'), {
        themeName: 'Kombinasi 1',
      });
      
      // --- 5. PERBAIKAN CACAT #4 ---
      // Panggil refreshUserData SETELAH data Firestore ditulis
      await refreshUserData(user.uid);
      // --- AKHIR PERBAIKAN ---

      // 6. Arahkan ke tutorial
      navigate('/register/tutorial');

    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Nomor telepon ini sudah terdaftar.');
      } else {
        setError('Gagal mendaftar. Coba lagi.');
      }
      console.error("Register Error:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Langkah 1: Daftar Akun Chatalog
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Nomor Telepon (untuk Login)
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
              placeholder="Contoh: 08123456789"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Buat Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
              placeholder="Minimal 6 karakter"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Membuat akun...' : 'Lanjut ke Step 2'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;