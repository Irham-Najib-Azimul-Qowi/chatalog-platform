import React, { useState } from 'react';
import AdminBarToko from '../../components/admin/AdminBarToko';
import TokoRenderer from '../toko/TokoRenderer';
// TODO: Impor icon dari react-icons (misal: HiOutlineDevicePhoneMobile, HiOutlineComputerDesktop)

// Step 4: Halaman Editor "Canva"
// Ini adalah "Cangkang" yang Anda (Dev A) buat
function EditorPage() {
  const [isPreviewMobile, setIsPreviewMobile] = useState(false); // State untuk toggle preview

  return (
    // Layout utama Editor
    // Kita gunakan flex-col di mobile, dan flex-row di desktop (md:)
    <div className="flex flex-col md:flex-row h-screen bg-gray-200">
      
      {/* =====================================
        TOOLBAR KIRI (Desktop) / BAWAH (Mobile)
       
        Tugas Teman Anda (Dev B) akan mengisi komponen ini
        =====================================
      */}
      <aside className="w-full md:w-64 bg-white shadow-lg order-2 md:order-1 overflow-y-auto">
        {/* AdminBarToko akan berisi UI Toolbar (Ikon Fitur, Desain, dll) */}
        <AdminBarToko /> 
      </aside>

      {/* =====================================
        AREA PREVIEW TENGAH
        =====================================
      */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 order-1 md:order-2 overflow-y-auto">
        
        {/* Header Preview (Toggle Mobile/Desktop & Harga) */}
        <div className="w-full max-w-7xl flex justify-between items-center mb-4 px-4 py-2 bg-white rounded-lg shadow">
          <div>
            {/* Tombol Toggle Preview */}
            <button 
              onClick={() => setIsPreviewMobile(false)}
              className={`p-2 rounded-md ${!isPreviewMobile ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500'}`}
            >
              {/* (Icon Desktop) */} 🖥️
            </button>
            <button 
              onClick={() => setIsPreviewMobile(true)}
              className={`ml-2 p-2 rounded-md ${isPreviewMobile ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500'}`}
            >
              {/* (Icon Mobile) */} 📱
            </button>
          </div>
          <div className="text-center">
            {/* Placeholder Harga/Rincian */}
            <span className="text-lg font-bold text-gray-800">Total: Rp 0</span>
            <button className="ml-2 text-sm text-indigo-600">(Lihat Rincian)</button>
          </div>
          <div>
            {/* Placeholder Tombol 'Ajukan Validasi' / 'Simpan' */}
            <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md">
              Simpan
            </button>
          </div>
        </div>

        {/* Jendela Preview
          Tugas Teman Anda (Dev B) akan mengisi komponen TokoRenderer ini
        */}
        <div 
          className={`bg-white shadow-xl overflow-hidden transition-all duration-300 ${
            isPreviewMobile 
              ? 'w-[375px] h-[667px] rounded-[20px] border-8 border-gray-800' // Tampilan HP
              : 'w-full max-w-7xl h-full rounded-lg' // Tampilan Desktop
          }`}
        >
          {/* TokoRenderer akan me-render Homepage/Halaman Produk di dalam iframe/div ini */}
          <div className="w-full h-full overflow-y-auto">
             <TokoRenderer /> 
          </div>
        </div>
      </main>

    </div>
  );
}

export default EditorPage;