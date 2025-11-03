import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
// Kita akan import icon nanti, untuk sekarang kita pakai emoji
// import { FaUtensils, FaTshirt, FaConciergeBell, FaPencilAlt } from 'react-icons/fa';

// Opsi bidang usaha
const businessCategories = [
  { id: 'makanan', name: 'Makanan & Minuman', emoji: '🍔' },
  { id: 'fashion', name: 'Fashion & Pakaian', emoji: '👕' },
  { id: 'jasa', name: 'Jasa & Layanan', emoji: '🛎️' },
  { id: 'kerajinan', name: 'Kerajinan Tangan', emoji: '🎨' },
  { id: 'lainnya', name: 'Lainnya...', emoji: '✏️' },
];

// Step 3: Halaman Info Toko (Card UI)
function OnboardingInfo() {
  const [storeName, setStoreName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [otherCategory, setOtherCategory] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { currentUser, userData } = useAuth(); // Ambil data user yg login
  const navigate = useNavigate();

  // Fungsi untuk menangani klik pada kartu
  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prev) => {
      // Ini mengizinkan memilih lebih dari satu
      if (prev.includes(categoryId)) {
        return prev.filter((item) => item !== categoryId); // Hapus jika sudah ada (deselect)
      } else {
        return [...prev, categoryId]; // Tambahkan jika belum ada
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!storeName) {
      setError('Nama Toko wajib diisi.');
      return;
    }
    if (selectedCategories.length === 0) {
      setError('Pilih minimal satu bidang usaha.');
      return;
    }
    if (selectedCategories.includes('lainnya') && !otherCategory) {
      setError('Harap isi bidang usaha "Lainnya".');
      return;
    }

    setIsSubmitting(true);

    if (!currentUser || !userData.tokoId) {
      setError('Error: Tidak dapat menemukan data toko Anda. Silakan login ulang.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Siapkan data untuk disimpan
      const finalCategories = selectedCategories.includes('lainnya') 
        ? [...selectedCategories.filter(c => c !== 'lainnya'), otherCategory]
        : selectedCategories;

      // 2. Update dokumen 'tokos' yang sudah kita buat di Step 8
      const tokoDocRef = doc(db, "tokos", userData.tokoId);
      await updateDoc(tokoDocRef, {
        name: storeName,
        categories: finalCategories, // Simpan bidang usaha
      });

      // 3. Panggil AI untuk buat konten awal
      // (TODO: Panggil Cloud Function di sini)
      console.log('Memanggil AI untuk membuat konten draf...');
      // await firebaseFunctions.generateInitialContent(userData.tokoId, storeName, finalCategories);
      
      // 4. Arahkan ke Editor Canva (Step 4)
      navigate('/editor');

    } catch (err) {
      setError('Gagal menyimpan data. Coba lagi.');
      console.error("Onboarding Info Error:", err);
      setIsSubmitting(false);
    }
  };

  const isSelected = (categoryId) => selectedCategories.includes(categoryId);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="w-full max-w-3xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Langkah 3: Ceritakan Tentang Toko Anda
          </h2>
          <p className="mt-2 text-gray-600">
            Informasi ini akan dibantu AI untuk membuat draf awal website Anda.
          </p>
        </div>
        
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* 1. NAMA TOKO */}
          <div>
            <label htmlFor="storeName" className="block text-lg font-semibold text-gray-700">
              Apa Nama Toko Anda?
            </label>
            <input
              id="storeName"
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Contoh: Kripik Mak Ijah"
            />
          </div>

          {/* 2. BIDANG USAHA (CARD UI) */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Apa Bidang Usaha Anda?
            </label>
            <p className="text-sm text-gray-500">Bisa pilih lebih dari satu.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {businessCategories.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  // Ganti warna jika terpilih
                  className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-all ${
                    isSelected(cat.id) 
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500' 
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className="text-4xl">{cat.emoji}</span>
                  <span className="text-sm font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. INPUT "LAINNYA" (muncul jika 'lainnya' dipilih) */}
          {selectedCategories.includes('lainnya') && (
            <div className="animate-fadeIn">
              <label htmlFor="otherCategory" className="block text-lg font-semibold text-gray-700">
                Bidang Usaha Lainnya
              </label>
              <input
                id="otherCategory"
                type="text"
                required
                value={otherCategory}
                onChange={(e) => setOtherCategory(e.target.value)}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Contoh: Jasa Titip, Laundry, dll."
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          {/* 4. TOMBOL AKSI */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 text-lg font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Menyimpan...' : 'Lanjut ke Editor (Step 4)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OnboardingInfo;