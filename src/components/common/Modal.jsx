import React from 'react';

/**
 * Cangkang Modal (Popup) baru yang didesain ulang.
 * Menerima judul (title) dan konten (children).
 */
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    // 1. Latar Belakang Overlay (Gelap)
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose} // Tutup modal jika klik di luar
    >
      {/* 2. Konten Modal (Panel Putih) */}
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik di dalam
      >
        {/* 3. Header Modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-text-dark">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 text-3xl"
          >
            &times;
          </button>
        </div>

        {/* 4. Body (Konten Dinamis) */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;