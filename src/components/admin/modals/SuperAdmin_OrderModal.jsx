import { useState } from 'react';

/**
 * SuperAdmin_OrderModal Component
 * Modal untuk melihat dan mengelola order (Super Admin)
 */
const SuperAdmin_OrderModal = ({ isOpen, onClose, order = null, onUpdate }) => {
  const [status, setStatus] = useState(order?.status || '');

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // TODO: Implement status update logic
    if (onUpdate) {
      onUpdate(order?.id, { status: newStatus });
    }
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Detail Order</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Info Order */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Informasi Order</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Order ID:</span>
                <span className="ml-2 font-medium">{order.id || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Tanggal:</span>
                <span className="ml-2 font-medium">
                  {order.tanggal || new Date().toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Nama Toko:</span>
                <span className="ml-2 font-medium">{order.namaToko || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="ml-2 font-medium">{status || order.status || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Info Customer */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Informasi Customer</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Nama:</span>
                <span className="ml-2 font-medium">{order.namaCustomer || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">{order.emailCustomer || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Telepon:</span>
                <span className="ml-2 font-medium">{order.telpCustomer || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Alamat:</span>
                <span className="ml-2 font-medium">{order.alamatCustomer || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Daftar Produk */}
          <div>
            <h3 className="font-semibold mb-2">Daftar Produk</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Produk</th>
                    <th className="px-4 py-2 text-center">Qty</th>
                    <th className="px-4 py-2 text-right">Harga</th>
                    <th className="px-4 py-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{item.nama || 'Produk'}</td>
                        <td className="px-4 py-2 text-center">{item.qty || 0}</td>
                        <td className="px-4 py-2 text-right">
                          Rp {parseInt(item.harga || 0).toLocaleString('id-ID')}
                        </td>
                        <td className="px-4 py-2 text-right">
                          Rp {parseInt((item.harga || 0) * (item.qty || 0)).toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                        Tidak ada item
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold">
                Rp {parseInt(order.total || 0).toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Update Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Update Status Order
            </label>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin_OrderModal;
