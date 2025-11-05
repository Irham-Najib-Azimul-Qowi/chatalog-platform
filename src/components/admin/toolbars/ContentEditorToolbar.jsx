import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function ContentEditorToolbar({ initialData, onDataChange, onSave: onSaveProp }) {
  
  // Pisahkan state: 1 untuk Konten (dari preview), 1 untuk Style (dari DB)
  const [contentData, setContentData] = useState(initialData);
  const [styleData, setStyleData] = useState({
    primaryColor: '#006064',
    secondaryColor: '#FFAB40',
    fontFamily: 'Poppins, sans-serif'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Gabungkan fungsi fetch
  const fetchAllSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const homepageDocRef = doc(db, "chatalog_content", "homepage");
      const aboutDocRef = doc(db, "chatalog_content", "about_us");
      const settingsDocRef = doc(db, "chatalog_content", "settings"); // <-- Dokumen style

      const [homepageSnap, aboutSnap, settingsSnap] = await Promise.all([
        getDoc(homepageDocRef),
        getDoc(aboutDocRef),
        getDoc(settingsDocRef)
      ]);

      const loadedContent = {
        heroTitle: homepageSnap.data()?.heroTitle || 'Mulai Digitalisasi...',
        storyText: homepageSnap.data()?.storyText || 'Chatalog dimulai...',
        aboutText: aboutSnap.data()?.team_profile || 'Kami adalah tim...'
      };
      
      const loadedStyles = settingsSnap.exists() ? settingsSnap.data() : {
        primaryColor: '#006064',
        secondaryColor: '#FFAB40',
        fontFamily: 'Poppins, sans-serif'
      };

      setContentData(loadedContent);
      setStyleData(loadedStyles);
      
      // Kirim data konten ke parent (EditorPage) untuk preview
      onDataChange(loadedContent);
      
      // Terapkan style dinamis dari sini juga
      const root = document.documentElement;
      root.style.setProperty('--color-chatalog-primary', loadedStyles.primaryColor);
      root.style.setProperty('--color-chatalog-secondary', loadedStyles.secondaryColor);
      document.body.style.fontFamily = loadedStyles.fontFamily;
      
    } catch (err) {
      console.error("Gagal memuat konten:", err);
      setError("Gagal memuat data");
    }
    setIsLoading(false);
  }, [onDataChange]);

  useEffect(() => {
    fetchAllSettings();
  }, [fetchAllSettings]);

  // Handle perubahan form KONTEN
  const handleContentChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...contentData, [name]: value };
    setContentData(newData);
    onDataChange(newData); // Kirim data konten terbaru ke parent (EditorPage)
    setSuccess('');
  };
  
  // Handle perubahan form STYLE
  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    const newStyles = { ...styleData, [name]: value };
    setStyleData(newStyles);
    setSuccess('');
    
    // Terapkan style secara LIVE ke preview
    if (name === 'primaryColor') {
      document.documentElement.style.setProperty('--color-chatalog-primary', value);
    } else if (name === 'secondaryColor') {
      document.documentElement.style.setProperty('--color-chatalog-secondary', value);
    } else if (name === 'fontFamily') {
      document.body.style.fontFamily = value;
    }
  };

  // Fungsi simpan (menyimpan KONTEN dan STYLE)
  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const homepageDocRef = doc(db, "chatalog_content", "homepage");
      const aboutDocRef = doc(db, "chatalog_content", "about_us");
      const settingsDocRef = doc(db, "chatalog_content", "settings"); // <-- Dokumen style

      // Simpan 3 dokumen secara paralel
      await Promise.all([
        setDoc(homepageDocRef, {
          heroTitle: contentData.heroTitle,
          storyText: contentData.storyText
        }, { merge: true }),
        
        setDoc(aboutDocRef, {
          team_profile: contentData.aboutText
        }, { merge: true }),
        
        setDoc(settingsDocRef, styleData, { merge: true }) // Simpan data style
      ]);
      
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
        
        {/* ============================================== */}
        {/* BAGIAN BARU: PENGATURAN STYLE                  */}
        {/* ============================================== */}
        <div className="bg-gray-100 p-3 rounded-md">
          <h3 className="font-semibold text-gray-800">Pengaturan Style Global</h3>
          <div className="mt-2 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Warna Primer (mis: #006064)</label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  name="primaryColor"
                  value={styleData.primaryColor}
                  onChange={handleStyleChange}
                  className="w-10 h-10 p-0 border-none rounded-md"
                />
                <input 
                  type="text" 
                  name="primaryColor"
                  value={styleData.primaryColor}
                  onChange={handleStyleChange}
                  className="w-full ml-2 p-2 border rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Warna Sekunder (mis: #FFAB40)</label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  name="secondaryColor"
                  value={styleData.secondaryColor}
                  onChange={handleStyleChange}
                  className="w-10 h-10 p-0 border-none rounded-md"
                />
                <input 
                  type="text" 
                  name="secondaryColor"
                  value={styleData.secondaryColor}
                  onChange={handleStyleChange}
                  className="w-full ml-2 p-2 border rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Font Family (mis: Poppins, sans-serif)</label>
              <input 
                type="text" 
                name="fontFamily" 
                value={styleData.fontFamily} 
                onChange={handleStyleChange} 
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
          </div>
        </div>
        {/* ============================================== */}
        {/* AKHIR BAGIAN BARU                             */}
        {/* ============================================== */}


        <div className="bg-gray-100 p-3 rounded-md">
          <h3 className="font-semibold text-gray-800">Halaman Homepage</h3>
          <div className="mt-2 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Title</label>
              <input 
                type="text" 
                name="heroTitle" 
                value={contentData.heroTitle} 
                onChange={handleContentChange} 
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kisah Kami (Teks Singkat)</label>
              <textarea 
                name="storyText" 
                rows="3"
                value={contentData.storyText} 
                onChange={handleContentChange} 
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
                value={contentData.aboutText} 
                onChange={handleContentChange} 
                className="w-full mt-1 p-2 border rounded-md"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Toolbar (Tombol Simpan) */}
      <div className="p-4 border-t bg-white sticky bottom-0">
        {success && <p className="text-green-500 text-sm text-center mb-2">{success}</p>}
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        <button 
          onClick={handleSave} // Panggil fungsi simpan
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