import { useState } from 'react';

/**
 * CartModal Component
 * Modal untuk menampilkan dan mengelola keranjang belanja
 */
const CartModal = ({ isOpen, onClose, items = [], onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (parseFloat(item.harga) || 0) * (item.quantity || 0);
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Keranjang Belanja</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Keranjang Anda kosong</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Tutup
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  {item.gambar && (
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.nama || 'Produk'}</h3>
                    <p className="text-gray-600 text-sm">
                      Rp {parseInt(item.harga || 0).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity && onUpdateQuantity(index, (item.quantity || 0) - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity || 0}</span>
                    <button
                      onClick={() => onUpdateQuantity && onUpdateQuantity(index, (item.quantity || 0) + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      Rp {parseInt((item.harga || 0) * (item.quantity || 0)).toLocaleString('id-ID')}
                    </p>
                    <button
                      onClick={() => onRemoveItem && onRemoveItem(index)}
                      className="text-red-500 text-sm hover:text-red-700 mt-1"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>Rp {parseInt(calculateTotal()).toLocaleString('id-ID')}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Lanjut Belanja
                </button>
                <button
                  onClick={() => {
                    if (onCheckout) onCheckout();
                    onClose();
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
