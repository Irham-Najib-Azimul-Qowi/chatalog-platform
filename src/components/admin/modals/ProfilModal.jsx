import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { db, auth } from '../../../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';
import Spinner from '../../common/Spinner';

// KONTEN Modal untuk mengedit profil
function ProfilModal({ isOpen, onClose }) {
  const { currentUser, userData, refreshUserData } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen && userData) {
      setName(userData.name || '');
    }
    setError('');
    setSuccess('');
    setPassword('');
    setPasswordConfirm('');
  }, [isOpen, userData]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validasi
    if (password && password.length < 6) {
      setError("Password baru harus minimal 6 karakter.");
      setLoading(false);
      return;
    }
    if (password && password !== passwordConfirm) {
      setError("Konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      const promises = [];
      
      // 1. Update Nama di Firestore
      if (name !== userData.name) {
        const userDocRef = doc(db, "users", currentUser.uid);
        promises.push(updateDoc(userDocRef, { name: name }));
      }
      
      // 2. Update Password di Firebase Auth
      if (password) {
        promises.push(updatePassword(currentUser, password));
      }
      
      await Promise.all(promises);
      
      if (name !== userData.name) {
        await refreshUserData(currentUser.uid);
      }
      
      setSuccess("Profil berhasil diperbarui!");
      setPassword('');
      setPasswordConfirm('');
      
    } catch (err) {
      console.error("Gagal update profil:", err);
      if (err.code === 'auth/requires-recent-login') {
        setError("Ganti password gagal. Harap logout dan login kembali.");
      } else {
        setError("Gagal memperbarui profil.");
      }
    }
    setLoading(false);
  };

  // Hapus semua cangkang modal, hanya return form
  return (
    <form className="space-y-6" onSubmit={handleSave}>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && <p className="text-green-500 text-sm text-center">{success}</p>}
      
      <div>
        <label className="block text-sm font-bold text-text-body mb-2">Email/Telepon (Login)</label>
        <input 
          type="text" 
          value={currentUser.email} 
          disabled 
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-100"
        />
      </div>
      
      {/* Ini adalah style dari image_34962c.png */}
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-text-body mb-2">Nama Tampilan</label>
        <input 
          type="text" 
          id="name"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-chatalog-primary focus:border-chatalog-primary"
          placeholder="Masukkan nama lengkap Anda"
        />
      </div>
      <hr/>
      
      <p className="text-sm text-gray-500">Ganti Password (Kosongkan jika tidak ingin ganti)</p>
      
      <div>
        <label htmlFor="password" className="block text-sm font-bold text-text-body mb-2">Password Baru</label>
        <input 
          type="password"
          id="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-chatalog-primary focus:border-chatalog-primary"
          placeholder="Minimal 6 karakter"
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm" className="block text-sm font-bold text-text-body mb-2">Konfirmasi Password Baru</label>
        <input 
          type="password" 
          id="passwordConfirm"
          value={passwordConfirm} 
          onChange={(e) => setPasswordConfirm(e.target.value)} 
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-chatalog-primary focus:border-chatalog-primary"
          placeholder="Ketik ulang password baru Anda"
        />
      </div>
      
      {/* Tombol Aksi (Style dari image_34962c.png) */}
      <div className="pt-4">
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-chatalog-primary text-white font-bold py-3 px-6 rounded-lg 
                     hover:opacity-80 transition-all duration-300 disabled:bg-gray-400"
        >
          {loading ? <Spinner /> : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
}

export default ProfilModal;