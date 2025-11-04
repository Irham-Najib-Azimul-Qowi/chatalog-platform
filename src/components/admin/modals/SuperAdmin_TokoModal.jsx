import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Kita akan pakai ini untuk "Edit"

// Modal untuk mengelola semua toko klien
function SuperAdminTokoModal({ isOpen, onClose }) {
  const [tokos, setTokos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fungsi untuk memuat data semua toko
  const fetchTokos = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Ambil semua dokumen dari koleksi 'tokos'
      const tokosRef = collection(db, "tokos");
      const q = query(tokosRef); // Tanpa filter
      
      const querySnapshot = await getDocs(q);
      const tokosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTokos(tokosList);
      
    } catch (err) {
      console.error("Error fetching tokos:", err);
      setError("Gagal memuat daftar toko.");
    }
    setLoading(false);
  };

  // Panggil fetchTokos() saat modal pertama kali dibuka
  useEffect(() => {
    if (isOpen) {
      fetchTokos();
    }
  }, [isOpen]);

  // Fungsi untuk "mengedit" toko klien
  // Ini akan mengarahkan Super Admin ke Editor Canva milik klien
  const handleEditToko = (tokoId) => {
    // TODO: Kita perlu logic untuk "impersonate" (menyamar) sebagai admin toko.
    // Untuk sekarang, kita arahkan ke halaman editor (yang diproteksi).
    // Ini mungkin gagal jika role kita 'superadmin' dan 'ProtectedRoute'
    // hanya mengizinkan 'toko_admin'.
    
    // Untuk masa depan, kita akan buat '/editor/:tokoId'
    // dan ProtectedRoute akan cek: "Apakah role 'superadmin' ATAU 
    // 'toko_admin' yang tokoId-nya cocok?"
    
    alert(`(Fitur Masa Depan) Mengarahkan ke editor untuk Toko ID: ${tokoId}. Kita perlu update ProtectedRoute dulu.`);
    // navigate(`/editor/${tokoId}`); // Simpan ini untuk nanti
  };

  if (!isOpen) return null;

  return (
    // Latar belakang modal
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      {/* Konten Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Manajemen Toko Klien</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        
        {/* Body (Daftar Toko) */}
        <div className="p-6 overflow-y-auto">
          {loading && <p>Memuat daftar toko...</p>}
          {error && <p className="text-red-500">{error}</p>}
          
          <div className="space-y-4">
            {tokos.length === 0 && !loading && <p>Belum ada toko yang terdaftar.</p>}
            
            {tokos.map(toko => (
              <div key={toko.id} className="border p-4 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-bold">{toko.name || '(Tanpa Nama)'}</p>
                  <p className="text-sm text-gray-600">ID: {toko.id}</p>
                  <p className="text-sm text-gray-600">Pemilik UID: {toko.ownerUid || 'N/A'}</p>
                </div>
                <button 
                  onClick={() => handleEditToko(toko.id)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Kelola Toko
                </button>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default SuperAdminTokoModal;