import React, { createContext, useState, useEffect, useMemo } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

// Anggap db sudah diexport dari file partner Anda
// eslint-disable-next-line import/no-unresolved
import { db } from '../services/firebase'; 

// 1. Buat Context
const TokoContext = createContext();

// Default atau initial state untuk data toko
const initialTokoData = {
  loading: true,
  error: null,
  info: {}, 
  settings: {
    warna_primer: '#4f46e5', // Warna default ungu-600
    logo_url: '',
    hero_image_url: 'https://via.placeholder.com/1200x600?text=Hero+Image+Default',
    // ... setting tampilan lainnya
  },
  features: {
    show_blog: false,
    show_galeri: false,
    show_lokasi_page: false,
    show_mitra_section: false,
    custom_color_enabled: false, // Penting untuk fitur berbayar
  },
  produk: [], 
  testimoni: [], 
  // Tambahkan state untuk mengelola UI di dalam editor (misal: modal admin mana yang terbuka)
  ui: {
      isModalOpen: false,
      activeModal: null, // Contoh: 'Produk', 'Tampilan', 'Upsell'
      upsellFeatureName: null, // Nama fitur yang terkunci
  }
};

// 2. Buat Provider
export const TokoProvider = ({ children, storeSlug }) => {
  const [tokoData, setTokoData] = useState(initialTokoData);

  // Fungsi-fungsi untuk mengelola UI (akan digunakan oleh AdminBarToko)
  const openAdminModal = (modalName, upsellFeature = null) => {
    setTokoData(prev => ({
        ...prev,
        ui: {
            isModalOpen: true,
            activeModal: modalName,
            upsellFeatureName: upsellFeature,
        }
    }));
  };

  const closeAdminModal = () => {
    setTokoData(prev => ({
        ...prev,
        ui: initialTokoData.ui, // Reset UI state
    }));
  };

  // --- Real-Time Data Fetching dari Firestore ---
  useEffect(() => {
    if (!storeSlug) {
      setTokoData(prev => ({ ...prev, loading: false, error: 'Slug Toko tidak ditemukan.' }));
      return;
    }

    const tokoRef = doc(db, 'toko_klien', storeSlug);

    const unsubscribe = onSnapshot(tokoRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        const updatedData = {
          info: data.info || initialTokoData.info,
          settings: { ...initialTokoData.settings, ...(data.settings || {}) },
          features: { ...initialTokoData.features, ...(data.features || {}) },
          produk: data.produk || initialTokoData.produk,
          testimoni: data.testimoni || initialTokoData.testimoni,
        };

        setTokoData(prev => ({
          ...prev, // Pertahankan state UI sebelumnya
          ...updatedData,
          loading: false,
          error: null,
        }));

      } else {
        setTokoData(prev => ({
          ...initialTokoData,
          loading: false,
          error: `Toko dengan slug '${storeSlug}' tidak ditemukan.`,
        }));
      }
    }, (error) => {
      console.error('Error fetching toko data:', error);
      setTokoData(prev => ({
        ...initialTokoData,
        loading: false,
        error: 'Gagal memuat data toko. Silakan coba lagi.',
      }));
    });

    return () => unsubscribe();
  }, [storeSlug]); 

  // Memoize value, termasuk fungsi-fungsi admin
  const contextValue = useMemo(() => ({
      ...tokoData,
      openAdminModal,
      closeAdminModal,
  }), [tokoData]);

  // Handle Loading dan Error di sini (Untuk tampilan publik atau editor)
  if (tokoData.loading) {
      return (
          <div className="flex h-screen items-center justify-center bg-gray-50">
              <div className="text-xl font-semibold text-indigo-600">
                  Memuat Toko Chatalog...
              </div>
          </div>
      );
  }

  if (tokoData.error) {
    return (
        <div className="flex h-screen items-center justify-center bg-red-50">
            <div className="p-6 rounded-lg bg-white shadow-xl text-center">
                <p className="text-2xl font-bold text-red-600 mb-2">Error 404 - Toko Tidak Ditemukan</p>
                <p className="text-gray-700">{tokoData.error}</p>
            </div>
        </div>
    );
  }

  return (
    <TokoContext.Provider value={contextValue}>
      {children}
    </TokoContext.Provider>
  );
};

// 3. Export Context
export default TokoContext;