import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { db, auth } from '../../../services/firebase'; // Kita butuh 'auth'
import { doc, updateDoc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth'; // Fungsi untuk ganti password

// Modal untuk mengedit profil user yang sedang login [cite: IV.B, V.B]
function ProfilModal({ isOpen, onClose }) {
  const { currentUser, userData, refreshUserData } = useAuth(); // Ambil 'refresh'
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Isi form dengan data saat modal dibuka
  useEffect(() => {
    if (isOpen && userData) {
      setName(userData.name || '');
    }
    // Reset state
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
      
      // 3. Refresh Auth context jika nama berubah
      if (name !== userData.name) {
        await refreshUserData(currentUser.uid); // Panggil refresh [cite: my_last_response]
      }
      
      setSuccess("Profil berhasil diperbarui!");
      setPassword('');
      setPasswordConfirm('');
      
    } catch (err) {
      console.error("Gagal update profil:", err);
      // Firebase auth error (jika perlu re-login)
      if (err.code === 'auth/requires-recent-login') {
        setError("Ganti password gagal. Harap logout dan login kembali, lalu coba lagi.");
      } else {
        setError("Gagal memperbarui profil.");
      }
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <form onSubmit={handleSave}>
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Edit Profil</h2>
            <button type="button" onClick={onClose} className="text-2xl">&times;</button>
          </div>
          
          {/* Body (Form) */}
          <div className="p-6 overflow-y-auto space-y-4">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm text-center">{success}</p>}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email/Telepon (Login)</label>
              <input 
                type="text" 
                value={currentUser.email} // Ambil dari Auth
                disabled 
                className="w-full mt-1 p-2 border rounded-md bg-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Tampilan</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <hr/>
            <p className="text-sm text-gray-500">Ganti Password (Kosongkan jika tidak ingin ganti)</p>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password Baru</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
              <input 
                type="password" 
                value={passwordConfirm} 
                onChange={(e) => setPasswordConfirm(e.target.value)} 
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
          </div>
          
          {/* Footer (Tombol Aksi) */}
          <div className="flex justify-end p-4 border-t bg-gray-50">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2 hover:bg-gray-400">
              Batal
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
            >
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilModal;