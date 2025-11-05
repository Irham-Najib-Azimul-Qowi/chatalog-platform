import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

// HANYA KONTEN untuk modal Super Admin Order
// 'isOpen' dan 'onClose' sekarang di-passing oleh AdminBarSuperAdmin
function SuperAdminOrderModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrders = async () => { /* ... (fungsi fetchOrders Anda tetap sama) ... */ };
  const handleApprove = async (orderId, tokoId, userId) => { /* ... (fungsi handleApprove Anda tetap sama) ... */ };
  const handleReject = async (orderId) => { /* ... (fungsi handleReject Anda tetap sama) ... */ };

  // Panggil fetchOrders() saat modal pertama kali dibuka
  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  // Hapus 'if (!isOpen) return null;'
  // Hapus <div> latar belakang modal
  // Hapus Header Modal
  // Hapus Body Modal

  // Langsung return KONTEN-nya saja
  return (
    <div className="space-y-4">
      {loading && <p>Memuat pesanan...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {/* {orders.length === 0 && !loading && <p>Tidak ada pesanan baru.</p>} */}
      
      {orders.map(order => (
        <div key={order.id} className="border p-4 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold">Toko ID: {order.tokoId}</p>
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
  );
}

export default SuperAdminOrderModal;