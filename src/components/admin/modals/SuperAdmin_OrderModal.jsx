import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

// Modal untuk memvalidasi order baru [cite: IV.B, III.B]
function SuperAdminOrderModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fungsi untuk memuat data pesanan
  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Ambil semua pesanan dari Firestore [cite: user_s_previous_context]
      const ordersRef = collection(db, "orders");
      // 2. Filter hanya yang statusnya "Menunggu Validasi" [cite: user_s_previous_context]
      const q = query(ordersRef, where("status", "==", "Menunggu Validasi"));
      
      const querySnapshot = await getDocs(q);
      const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersList);
      
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Gagal memuat pesanan.");
    }
    setLoading(false);
  };

  // Panggil fetchOrders() saat modal pertama kali dibuka
  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  // Fungsi untuk menyetujui pesanan [cite: III.B]
  const handleApprove = async (orderId, tokoId, userId) => {
    if (!window.confirm("Anda yakin ingin menyetujui pesanan ini? Ini akan membuat toko 'live' dan mengubah role user.")) {
      return;
    }
    
    try {
      // 1. Update status pesanan di 'orders'
      const orderDocRef = doc(db, "orders", orderId);
      await updateDoc(orderDocRef, {
        status: "Selesai"
      });
      
      // 2. Update status toko di 'tokos' (misal: 'pending' jadi 'active')
      const tokoDocRef = doc(db, "tokos", tokoId);
      await updateDoc(tokoDocRef, {
        status: "active" // Asumsi ada field status
      });

      // 3. Update role user dari 'toko_admin_pending' ke 'toko_admin'
      // (Kita asumsikan user ID disimpan di dokumen order)
      if (userId) {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
          role: "toko_admin" // Mengaktifkan user
        });
      }
      
      alert("Pesanan disetujui! Toko sudah aktif.");
      fetchOrders(); // Muat ulang daftar pesanan
      
    } catch (err) {
      console.error("Gagal menyetujui:", err);
      alert("Gagal menyetujui pesanan.");
    }
  };
  
  // Fungsi untuk menolak (menghapus) pesanan
  const handleReject = async (orderId) => {
     if (!window.confirm("Anda yakin ingin MENOLAK pesanan ini? Ini akan menghapus data order.")) {
      return;
    }
     // TODO: Hapus dokumen order, atau set status "Ditolak"
     alert("Pesanan ditolak (fitur belum dibuat).");
  }

  if (!isOpen) return null;

  return (
    // Latar belakang modal
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      {/* Konten Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Manajemen Order [cite: IV.B]</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        
        {/* Body (Daftar Order) */}
        <div className="p-6 overflow-y-auto">
          {loading && <p>Memuat pesanan...</p>}
          {error && <p className="text-red-500">{error}</p>}
          
          <div className="space-y-4">
            {orders.length === 0 && !loading && <p>Tidak ada pesanan baru.</p>}
            
            {orders.map(order => (
              <div key={order.id} className="border p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">Toko ID: {order.tokoId}</p>
                    {/* Kita perlu mengambil nama toko, tapi ini cukup */}
                    <p className="text-sm text-gray-600">User ID: {order.ownerUid || 'N/A'}</p> 
                    <p className="text-sm text-gray-600">Total: Rp {order.totalHarga || 0}</p>
                  </div>
                  <div className="flex space-x-2">
                     <button 
                      onClick={() => handleReject(order.id)}
                      className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                    >
                      Tolak
                    </button>
                    <button 
                      onClick={() => handleApprove(order.id, order.tokoId, order.ownerUid)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default SuperAdminOrderModal;