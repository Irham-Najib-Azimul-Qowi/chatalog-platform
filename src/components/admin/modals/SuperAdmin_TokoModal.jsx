import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../../services/firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import Spinner from '../../common/Spinner';

// Helper component untuk mengambil nama pemilik (agar lebih efisien)
function TokoPemilik({ ownerUid }) {
  const [namaPemilik, setNamaPemilik] = useState('Memuat...');

  useEffect(() => {
    if (!ownerUid) {
      setNamaPemilik('N/A');
      return;
    }
    
    const fetchOwner = async () => {
      const userDocRef = doc(db, "users", ownerUid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setNamaPemilik(userDocSnap.data().name || 'Tanpa Nama');
      } else {
        setNamaPemilik('User Dihapus');
      }
    };
    fetchOwner();
  }, [ownerUid]);

  return <>{namaPemilik}</>;
}

// KONTEN Modal untuk mengelola toko klien
function SuperAdminTokoModal({ isOpen, onClose }) {
  const [tokos, setTokos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTokos = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const tokosRef = collection(db, "tokos");
      const q = query(tokosRef, where("status", "==", "active"));
      const querySnapshot = await getDocs(q);
      const tokosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTokos(tokosList);
    } catch (err) {
      console.error("Error fetching tokos:", err);
      setError("Gagal memuat daftar toko.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchTokos();
    }
  }, [isOpen, fetchTokos]);

  const handleEditToko = (tokoId) => {
    alert(`(Fitur Masa Depan) Mengarahkan ke editor untuk Toko ID: ${tokoId}.`);
  };

  // Hanya return konten (tabel)
  return (
    <div className="space-y-4">
      {loading && <div className="flex justify-center"><Spinner /></div>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {!loading && !error && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-text-body uppercase tracking-wider">Nama Toko</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-text-body uppercase tracking-wider">Nama Pemilik</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-text-body uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tokos.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-text-body">
                  Belum ada toko yang aktif.
                </td>
              </tr>
            )}
            
            {tokos.map(toko => (
              <tr key={toko.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-text-dark">{toko.name || '(Tanpa Nama)'}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-text-body">
                  <TokoPemilik ownerUid={toko.ownerUid} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button 
                    onClick={() => handleEditToko(toko.id)}
                    className="bg-chatalog-primary text-white font-semibold py-2 px-4 rounded-lg 
                               hover:opacity-80 transition-all duration-300"
                  >
                    Kelola Toko
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SuperAdminTokoModal;