import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import Spinner from '../../common/Spinner';

// Modal untuk Super Admin mengedit konten publik web Chatalog [cite: IV.B]
function SuperAdminContentModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // State untuk menampung data dari DUA dokumen (homepage & about_us)
  const [content, setContent] = useState({
    heroTitle: '',
    storyText: '',
    aboutText: ''
  });

  // 1. Ambil data saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      const fetchContent = async () => {
        setLoading(true);
        setError('');
        try {
          // Kita akan ambil dari koleksi 'chatalog_content' [cite: my_last_response]
          const homepageDocRef = doc(db, "chatalog_content", "homepage");
          const aboutDocRef = doc(db, "chatalog_content", "about_us");
          
          const [homepageSnap, aboutSnap] = await Promise.all([
            getDoc(homepageDocRef),
            getDoc(aboutDocRef)
          ]);
          
          setContent({
            heroTitle: homepageSnap.data()?.heroTitle || '',
            storyText: homepageSnap.data()?.storyText || '',
            aboutText: aboutSnap.data()?.team_profile || '' // Sesuai rencana kita [cite: my_last_response]
          });
        } catch (err) {
          console.error("Gagal memuat konten:", err);
          setError("Gagal memuat konten");
        }
        setLoading(false);
      };
      fetchContent();
    }
  }, [isOpen]);

  // 2. Handle perubahan di form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  // 3. Simpan data kembali ke Firestore
  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      const homepageDocRef = doc(db, "chatalog_content", "homepage");
      const aboutDocRef = doc(db, "chatalog_content", "about_us");
      
      // Gunakan setDoc dengan { merge: true } (atau updateDoc)
      // Ini akan membuat dokumen jika belum ada, atau memperbarui jika sudah ada
      await setDoc(homepageDocRef, {
        heroTitle: content.heroTitle,
        storyText: content.storyText
      }, { merge: true });
      
      await setDoc(aboutDocRef, {
        team_profile: content.aboutText
      }, { merge: true });
      
      alert("Konten berhasil disimpan!");
      onClose();
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      setError("Gagal menyimpan konten");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Edit Konten Publik Chatalog</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        
        {/* Body (Form) */}
        <div className="p-6 overflow-y-auto">
          {loading && <div className="flex justify-center"><Spinner /></div>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {!loading && (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Homepage Hero Title [cite: VIII.B]</label>
                <input 
                  type="text" 
                  name="heroTitle" 
                  value={content.heroTitle} 
                  onChange={handleChange} 
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Homepage Story Text [cite: VIII.B]</label>
                <textarea 
                  name="storyText" 
                  rows="3"
                  value={content.storyText} 
                  onChange={handleChange} 
                  className="w-full mt-1 p-2 border rounded-md"
                ></textarea>
              </div>
              <hr/>
              <div>
                <label className="block text-sm font-medium text-gray-700">About Us Team Profile [cite: IV.A, VIII.B]</label>
                <textarea 
                  name="aboutText" 
                  rows="5"
                  value={content.aboutText} 
                  onChange={handleChange} 
                  className="w-full mt-1 p-2 border rounded-md"
                ></textarea>
              </div>
            </form>
          )}
        </div>
        
        {/* Footer (Tombol Aksi) */}
        <div className="flex justify-end p-4 border-t bg-gray-50">
          <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2 hover:bg-gray-400">
            Batal
          </button>
          <button 
            onClick={handleSave} 
            disabled={loading} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
          >
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminContentModal;