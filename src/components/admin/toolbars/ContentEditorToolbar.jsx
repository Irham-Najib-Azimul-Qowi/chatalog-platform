import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase'; // Untuk mengambil data
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Impor setDoc

// Ini adalah Form di Toolbar Kiri
function ContentEditorToolbar({ initialData, onDataChange, onSave: onSaveProp }) {
  // State internal untuk form
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Ambil data dari Firestore saat pertama kali load
  useEffect(() => {
    setIsLoading(true);
    const fetchContent = async () => {
      try {
        const homepageDocRef = doc(db, "chatalog_content", "homepage");
        const aboutDocRef = doc(db, "chatalog_content", "about_us");
        const [homepageSnap, aboutSnap] = await Promise.all([
          getDoc(homepageDocRef),
          getDoc(aboutDocRef)
        ]);
        
        const loadedData = {
          heroTitle: homepageSnap.data()?.heroTitle || '',
          storyText: homepageSnap.data()?.storyText || '',
          aboutText: aboutSnap.data()?.team_profile || ''
        };
        setFormData(loadedData);
        onDataChange(loadedData); // Kirim data ke parent (EditorPage)
      } catch (err) {
        console.error("Gagal memuat konten:", err);
        setError("Gagal memuat data");
      }
      setIsLoading(false);
    };
    fetchContent();
  }, [onDataChange]); // Hanya jalankan sekali

  // Handle perubahan di form
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    onDataChange(newData); // Kirim data terbaru ke parent (EditorPage)
    setSuccess(''); // Hapus pesan sukses jika mulai edit lagi
  };
  
  // Fungsi simpan internal
  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const homepageDocRef = doc(db, "chatalog_content", "homepage");
      const aboutDocRef = doc(db, "chatalog_content", "about_us");
      
      await setDoc(homepageDocRef, {
        heroTitle: formData.heroTitle,
        storyText: formData.storyText
      }, { merge: true });
      
      await setDoc(aboutDocRef, {
        team_profile: formData.aboutText
      }, { merge: true });
      
      setSuccess("Perubahan berhasil disimpan!");
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      setError("Gagal menyimpan data");
    }
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header Toolbar */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Edit Konten Chatalog</h2>
      </div>
      
      {/* Form Konten */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {isLoading && <p>Memuat data...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <div className="bg-gray-100 p-3 rounded-md">
          <h3 className="font-semibold text-gray-800">Halaman Homepage</h3>
          <div className="mt-2 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Title</label>
              <input 
                type="text" 
                name="heroTitle" 
                value={formData.heroTitle} 
                onChange={handleChange} 
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kisah Kami (Teks Singkat)</label>
              <textarea 
                name="storyText" 
                rows="3"
                value={formData.storyText} 
                onChange={handleChange} 
                className="w-full mt-1 p-2 border rounded-md"
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 p-3 rounded-md">
          <h3 className="font-semibold text-gray-800">Halaman Tentang Kami</h3>
          <div className="mt-2 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Teks Profil Tim</label>
              <textarea 
                name="aboutText" 
                rows="5"
                value={formData.aboutText} 
                onChange={handleChange} 
                className="w-full mt-1 p-2 border rounded-md"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Toolbar (Tombol Simpan) */}
      <div className="p-4 border-t bg-white sticky bottom-0">
        {success && <p className="text-green-500 text-sm text-center mb-2">{success}</p>}
        <button 
          onClick={handleSave} // Panggil fungsi simpan internal
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  );
}

export default ContentEditorToolbar;