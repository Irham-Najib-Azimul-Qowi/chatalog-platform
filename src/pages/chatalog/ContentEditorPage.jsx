import React, { useState } from 'react';
import ContentEditorToolbar from '../../components/admin/toolbars/ContentEditorToolbar';
import HomePageChatalog from './HomePageChatalog';
import AboutPage from './AboutPage';
import { Link } from 'react-router-dom';

// Halaman Editor "Canva" untuk Super Admin
function ContentEditorPage() {
  // State untuk menyimpan data form yang sedang diedit
  const [formData, setFormData] = useState({
    heroTitle: "", // Akan diisi dari Firestore
    storyText: "",
    aboutText: "",
  });

  // State untuk memilih preview
  const [previewPage, setPreviewPage] = useState('home'); // 'home' or 'about'
  const [isMobile, setIsMobile] = useState(false);

  // Fungsi yang akan di-passing ke Toolbar
  const handleDataChange = (newData) => {
    setFormData(newData);
  };
  
  // Fungsi yang akan di-passing ke Toolbar
  const handleSave = async () => {
    // TODO: Tambahkan logic 'updateDoc' ke Firestore
    // (Simpan data dari 'formData' ke koleksi 'chatalog_content')
    
    // Kita panggil fungsi onSave dari Toolbar
    // (Akan lebih baik jika logic simpan ada di Toolbar)
    alert("Data disimpan! (Logika Firestore belum terhubung di tombol ini)");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-200">
      
      {/* =====================================
        TOOLBAR KIRI (Desktop) / BAWAH (Mobile)
       
        =====================================
      */}
      <aside className="w-full md:w-80 bg-white shadow-lg order-2 md:order-1 overflow-y-auto">
        {/* Kita passing props ke Toolbar */}
        <ContentEditorToolbar 
          initialData={formData} 
          onDataChange={handleDataChange} 
          onSave={handleSave} 
        />
      </aside>

      {/* =====================================
        AREA PREVIEW TENGAH
        =====================================
      */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 order-1 md:order-2 overflow-y-auto">
        
        {/* Header Preview (Toggle Halaman & Device) */}
        <div className="w-full max-w-7xl flex justify-between items-center mb-4 px-4 py-2 bg-white rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm">PREVIEW HALAMAN:</span>
            <button 
              onClick={() => setPreviewPage('home')}
              className={`p-2 rounded-md text-sm ${previewPage === 'home' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setPreviewPage('about')}
              className={`p-2 rounded-md text-sm ${previewPage === 'about' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500'}`}
            >
              Tentang
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsMobile(false)}
              className={`p-2 rounded-md ${!isMobile ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500'}`}
            >
              🖥️
            </button>
            <button 
              onClick={() => setIsMobile(true)}
              className={`p-2 rounded-md ${isMobile ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500'}`}
            >
              📱
            </button>
          </div>
          <Link to="/" className="text-sm text-gray-600 hover:text-indigo-600">
            Kembali ke Web
          </Link>
        </div>

        {/* Jendela Preview */}
        <div 
          className={`bg-white shadow-xl overflow-hidden transition-all duration-300 ${
            isMobile 
              ? 'w-[375px] h-[667px] rounded-[20px] border-8 border-gray-800' // Tampilan HP
              : 'w-full max-w-7xl h-full rounded-lg' // Tampilan Desktop
          }`}
        >
          <div className="w-full h-full overflow-y-auto">
            {/* "Live Preview" terjadi di sini */}
            {previewPage === 'home' ? (
              <HomePageChatalog isPreview={true} previewData={formData} />
            ) : (
              <AboutPage isPreview={true} previewData={formData} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ContentEditorPage;