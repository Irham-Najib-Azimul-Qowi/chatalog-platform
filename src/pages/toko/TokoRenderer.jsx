import React, { useMemo } from 'react';
import { useParams, useLocation, Outlet } from 'react-router-dom';

// Komponen Layout (Tugas Anda)
import NavbarToko from '../../components/layout/NavbarToko';
import FooterToko from '../../components/layout/FooterToko';

// Context dan Hooks (Tugas Anda)
import { TokoProvider } from '../../contexts/TokoContext';
import { useToko } from '../../hooks/useToko'; 

// Admin Bar (Tugas Anda - Akan diisi di Step 4)
import AdminBarToko from '../../components/admin/AdminBarToko'; 

// Hooks Partner Anda (HANYA PAKAI)
// eslint-disable-next-line import/no-unresolved
import { useAuth } from '../../hooks/useAuth'; 

/**
 * TokoLayout: Komponen yang menggunakan data TokoContext 
 * dan menyediakan struktur layout (Navbar, Footer, AdminBar).
 */
const TokoLayout = () => {
    // 1. Ambil data Toko (sudah dimuat oleh TokoProvider)
    const { info, settings } = useToko();

    // 2. Ambil status Auth (dari partner)
    const { isAuthenticated, user, loading: authLoading } = useAuth();

    // 3. Tentukan apakah pengguna adalah Admin Toko
    // Anggap objek user memiliki property 'isStoreAdmin' atau kita cocokkan UID/email.
    // Untuk simulasi, kita cek apakah user adalah pemilik toko ini (info.adminUID)
    const isAdmin = useMemo(() => {
        if (!isAuthenticated || authLoading || !user || !info.adminUID) {
            return false;
        }
        // Logika: User yang login (user.uid) harus sesuai dengan Admin Toko (info.adminUID)
        return user.uid === info.adminUID;
    }, [isAuthenticated, authLoading, user, info.adminUID]);


    // Styling dinamis (Warna Kustom dari Settings)
    // Gunakan warna primer di sini atau lewati ke Navbar/Footer
    const primaryColor = settings?.warna_primer || '#4f46e5'; // Default ungu-600 Tailwind

    // Style yang akan diaplikasikan ke elemen root
    const rootStyle = {
        '--color-primary': primaryColor,
    };


    return (
        <div className="min-h-screen flex flex-col" style={rootStyle}>
            {/* Admin Bar (Hanya Muncul Jika Admin Login) */}
            {isAdmin && (
                // AdminBarToko akan menggunakan data TokoContext dan AuthContext
                // dan akan mengapung di atas semua konten
                <AdminBarToko /> 
            )}

            {/* Navbar Toko */}
            <header className={`${isAdmin ? 'mt-12' : ''}`}> 
                {/* Tambahkan margin-top jika AdminBar muncul agar tidak tertutup */}
                <NavbarToko />
            </header>

            {/* Konten Halaman Toko (TokoHomepage, TokoProdukPage, dll) */}
            <main className="flex-grow">
                <Outlet /> 
            </main>

            {/* Footer Toko */}
            <FooterToko />
        </div>
    );
};

/**
 * TokoRenderer: Komponen pintar yang menangani routing dan pembungkus context.
 */
const TokoRenderer = () => {
    // Ambil slug dari URL (misalnya dari /toko/nama-toko-saya)
    const { slug } = useParams();
    const location = useLocation();

    // Opsional: Validasi slug (misalnya, harus string dan bukan "chatalog")

    if (!slug) {
        // Ini seharusnya ditangani oleh konfigurasi router, tapi kita beri fallback 404
        return (
            <div className="p-10 text-center text-red-600">
                Error: URL Toko tidak lengkap.
            </div>
        );
    }
    
    // Key component di sini adalah TokoProvider
    return (
        <TokoProvider storeSlug={slug}>
            {/* TokoLayout akan mendapatkan data Toko setelah dimuat oleh Provider */}
            <TokoLayout />
        </TokoProvider>
    );
};

export default TokoRenderer;

/*
Catatan Konfigurasi Router (HANYA INFO, ini bagian dari Partner A/App.jsx):
-------------------------------------------------------------------------
<Routes>
    <Route path="/toko/:slug" element={<TokoRenderer />}>
        <Route index element={<TokoHomepage />} /> 
        <Route path="produk" element={<TokoProdukPage />} /> 
        // ... rute toko lainnya
    </Route>
</Routes>
*/