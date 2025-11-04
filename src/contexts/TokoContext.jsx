import React, { createContext, useState, useEffect, useMemo } from 'react';
import { 
    doc, query, collection, where, getDocs, 
    onSnapshot, getDoc 
} from 'firebase/firestore';

// Anggap db sudah diexport dari file partner Anda
// eslint-disable-next-line import/no-unresolved
import { db } from '../services/firebase'; 

// 1. Buat Context
const TokoContext = createContext();

// ... (initialTokoData sama seperti sebelumnya, untuk menjaga konsistensi)
const initialTokoData = {
    loading: true,
    error: null,
    info: {}, 
    settings: {
        warna_primer: '#4f46e5',
        logo_url: '',
        hero_image_url: 'https://via.placeholder.com/1200x600?text=Hero+Image+Default',
    },
    features: {
        show_blog: false,
        show_galeri: false,
        show_lokasi_page: false,
        show_mitra_section: false,
        custom_color_enabled: false,
    },
    produk: [], 
    ui: {
        isModalOpen: false,
        activeModal: null, 
        upsellFeatureName: null, 
    }
};

// 2. Buat Provider
export const TokoProvider = ({ children, storeSlug }) => {
    const [tokoData, setTokoData] = useState(initialTokoData);
    const [tokoId, setTokoId] = useState(null); // State baru untuk menyimpan Toko ID

    // Fungsi UI Admin (openAdminModal, closeAdminModal) sama seperti sebelumnya...
    const openAdminModal = (modalName, upsellFeature = null) => {
        setTokoData(prev => ({
            ...prev,
            ui: { isModalOpen: true, activeModal: modalName, upsellFeatureName: upsellFeature }
        }));
    };

    const closeAdminModal = () => {
        setTokoData(prev => ({
            ...prev,
            ui: initialTokoData.ui,
        }));
    };

    // --- Efek 1: Cari Toko ID berdasarkan Slug ---
    useEffect(() => {
        if (!storeSlug) return;

        setTokoData(prev => ({ ...prev, loading: true, error: null }));
        setTokoId(null); // Reset ID

        const findTokoId = async () => {
            try {
                // Query koleksi tokos: cari dokumen yang memiliki field 'slug' = storeSlug
                const q = query(collection(db, 'tokos'), where('slug', '==', storeSlug));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    throw new Error(`Toko dengan slug '${storeSlug}' tidak ditemukan.`);
                }

                // Ambil ID dokumen pertama yang cocok (yaitu Toko ID)
                const docSnap = querySnapshot.docs[0];
                setTokoId(docSnap.id);
                
                // Simpan info dasar (slug, name, ownerUid) ke state
                setTokoData(prev => ({ 
                    ...prev, 
                    info: { ...docSnap.data(), slug: storeSlug, tokoId: docSnap.id } 
                }));

            } catch (error) {
                console.error('Error finding Toko ID:', error);
                setTokoData(prev => ({
                    ...initialTokoData,
                    loading: false,
                    error: error.message,
                }));
            }
        };

        findTokoId();
    }, [storeSlug]); // Jalankan ulang jika storeSlug berubah


    // --- Efek 2: Ambil semua data Sub-Koleksi menggunakan Toko ID ---
    useEffect(() => {
        if (!tokoId) return; // Hanya berjalan jika tokoId sudah ditemukan

        const unsubscribers = [];

        // 1. Ambil Settings (tokos/{tokoId}/settings/config)
        const settingsRef = doc(db, 'tokos', tokoId, 'settings', 'config');
        unsubscribers.push(onSnapshot(settingsRef, (docSnap) => {
            const data = docSnap.exists() ? docSnap.data() : {};
            setTokoData(prev => ({ 
                ...prev, 
                settings: { ...initialTokoData.settings, ...data } 
            }));
        }));

        // 2. Ambil Features (tokos/{tokoId}/features/flags)
        const featuresRef = doc(db, 'tokos', tokoId, 'features', 'flags');
        unsubscribers.push(onSnapshot(featuresRef, (docSnap) => {
            const data = docSnap.exists() ? docSnap.data() : {};
            setTokoData(prev => ({ 
                ...prev, 
                features: { ...initialTokoData.features, ...data } 
            }));
        }));
        
        // 3. Ambil Products (tokos/{tokoId}/products - Koleksi)
        const productsQuery = query(collection(db, 'tokos', tokoId, 'products'));
        unsubscribers.push(onSnapshot(productsQuery, (querySnapshot) => {
            const productsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTokoData(prev => ({ 
                ...prev, 
                produk: productsList 
            }));
        }));
        
        // Setelah semua langganan aktif, set loading menjadi false
        setTokoData(prev => ({ ...prev, loading: false }));

        // Cleanup: Hentikan semua langganan (snapshot listeners)
        return () => unsubscribers.forEach(unsub => unsub());

    }, [tokoId]); // Jalankan ulang jika tokoId ditemukan


    // Gabungkan data dan fungsi untuk context value
    const contextValue = useMemo(() => ({
        ...tokoData,
        openAdminModal,
        closeAdminModal,
    }), [tokoData]);


    // Handle Loading dan Error
    if (tokoData.loading || (!tokoId && storeSlug && !tokoData.error)) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-xl font-semibold text-indigo-600">
                    Mencari Toko ID dan Memuat Data...
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