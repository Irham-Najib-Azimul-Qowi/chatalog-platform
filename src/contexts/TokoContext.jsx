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
  // Struktur data Toko Klien dari Firestore
  info: {}, 
  settings: {
    warna_primer: '#000000', // Warna default
    logo_url: '',
  },
  features: {
    show_blog: false,
    show_galeri: false,
    show_lokasi_page: false,
    show_mitra_section: false,
    custom_color_enabled: false,
  },
  produk: [], // Array produk
  testimoni: [], // Array testimoni
};

// 2. Buat Provider
export const TokoProvider = ({ children, storeSlug }) => {
  const [tokoData, setTokoData] = useState(initialTokoData);

  useEffect(() => {
    if (!storeSlug) {
      setTokoData(prev => ({ ...prev, loading: false, error: 'Slug Toko tidak ditemukan.' }));
      return;
    }

    // Path ke dokumen Toko di Firestore
    const tokoRef = doc(db, 'toko_klien', storeSlug);

    // Langganan Real-Time dengan onSnapshot
    const unsubscribe = onSnapshot(tokoRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Memastikan struktur data tetap konsisten (merapikan atau mengisi default jika ada field hilang)
        const updatedData = {
          info: data.info || initialTokoData.info,
          settings: data.settings || initialTokoData.settings,
          features: { ...initialTokoData.features, ...(data.features || {}) },
          produk: data.produk || initialTokoData.produk,
          testimoni: data.testimoni || initialTokoData.testimoni,
        };

        setTokoData({
          ...updatedData,
          loading: false,
          error: null,
        });

      } else {
        // Dokumen Toko tidak ditemukan
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

    // Clean-up function untuk menghentikan langganan saat komponen unmount
    return () => unsubscribe();
  }, [storeSlug]); // Jalankan ulang jika storeSlug berubah

  // Memoize value untuk mencegah re-render yang tidak perlu pada consumers
  const contextValue = useMemo(() => tokoData, [tokoData]);

  if (tokoData.loading) {
      // Tampilan loader minimalis (menggunakan Tailwind)
      return (
          <div className="flex h-screen items-center justify-center bg-gray-50">
              <div className="text-xl font-semibold text-indigo-600">
                  Memuat Toko...
              </div>
          </div>
      );
  }

  // Error case: Toko tidak ditemukan
  if (tokoData.error) {
    return (
        <div className="flex h-screen items-center justify-center bg-red-50">
            <div className="p-4 rounded-lg bg-white shadow-lg">
                <p className="text-xl font-bold text-red-600 mb-2">Error 404 - Toko Tidak Ditemukan</p>
                <p className="text-gray-700">{tokoData.error}</p>
                <p className="text-sm mt-3 text-gray-500">Pastikan URL slug toko sudah benar.</p>
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