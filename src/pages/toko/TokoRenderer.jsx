import React, { useMemo } from 'react';
import { useParams, Outlet } from 'react-router-dom';

// Layout & Context
import { TokoProvider } from '../../contexts/TokoContext';
import { useToko } from '../../hooks/useToko'; 
import NavbarToko from '../../components/layout/NavbarToko';
import FooterToko from '../../components/layout/FooterToko';

// Modals (Dari Step 4)
import ProdukModal from '../../components/admin/modals/ProdukModal';
import TampilanModal from '../../components/admin/modals/TampilanModal';
import UpsellModal from '../../components/admin/modals/UpsellModal';
// Import Modal lain yang sudah Anda buat
import ProfilModal from '../../components/admin/modals/ProfilModal';
import PromoModal from '../../components/admin/modals/PromoModal';
// ... dll


/**
 * TokoLayout: Komponen yang menggunakan data TokoContext dan menyediakan layout
 * (Navbar, Footer, Pages, dan Modal Admin).
 * Komponen ini TIDAK mengurus loading atau error, karena itu ditangani di TokoProvider.
 */
const TokoLayout = () => {
    // 1. Ambil Data Toko (sudah dimuat oleh TokoProvider)
    const { settings, ui } = useToko();

    // 2. Tentukan Warna Primer Dinamis
    const primaryColor = settings?.warna_primer || '#4f46e5'; 

    // Style yang akan diaplikasikan ke elemen root, menggunakan CSS Variable
    const rootStyle = useMemo(() => ({
        '--color-primary': primaryColor,
    }), [primaryColor]);


    // 3. Logika Pemilihan Modal Aktif
    const renderActiveModal = () => {
        // ui.isModalOpen dan ui.activeModal dikelola oleh openAdminModal/closeAdminModal di TokoContext
        if (!ui.isModalOpen) return null;

        switch (ui.activeModal) {
            case 'Produk':
                return <ProdukModal />; // Modal yang menerima closeAdminModal via useToko()
            case 'Tampilan':
                return <TampilanModal />;
            case 'Profil':
                return <ProfilModal />;
            case 'Promo':
                return <PromoModal />;
            case 'Upsell':
                return <UpsellModal />; // Menggunakan ui.upsellFeatureName secara internal
            // Tambahkan case untuk semua modal lainnya di sini
            default:
                return null;
        }
    };

    return (
        // Terapkan CSS Variable ke elemen tertinggi.
        <div className="min-h-screen flex flex-col antialiased" style={rootStyle}>
            
            {/* 1. Navbar Toko */}
            <NavbarToko />

            {/* 2. Konten Halaman Toko (TokoHomepage, TokoProdukPage, dll) */}
            {/* Outlet merender komponen anak yang sesuai dengan rute di App.jsx */}
            <main className="flex-grow">
                <Outlet /> 
            </main>

            {/* 3. Footer Toko */}
            <FooterToko />

            {/* 4. Modal Admin (Hanya muncul jika dipicu) */}
            {renderActiveModal()}
        </div>
    );
};

/**
 * TokoRenderer: Pintu gerbang yang menangani pengambilan slug dan pembungkus context.
 * Ini adalah komponen yang diimpor di App.jsx untuk rute publik /toko/:slug
 * dan diimpor oleh Editor Shell partner Anda untuk mode preview.
 */
const TokoRenderer = () => {
    // Ambil slug dari URL (misalnya dari /toko/nama-toko-saya)
    const { slug } = useParams();

    if (!slug) {
        // Fallback jika routing tidak lengkap
        return (
            <div className="p-10 text-center text-red-600">
                Error: URL Toko tidak lengkap. (Handler 404/NotFoundPage akan lebih baik di App.jsx)
            </div>
        );
    }
    
    return (
        // TokoProvider akan menangani loading, error, dan data fetching.
        <TokoProvider storeSlug={slug}>
            <TokoLayout />
        </TokoProvider>
    );
};

export default TokoRenderer;