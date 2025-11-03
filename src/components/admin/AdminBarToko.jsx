import React from 'react';
import { useToko } from '../../hooks/useToko'; 
// eslint-disable-next-line import/no-unresolved
import { useAuth } from '../../hooks/useAuth'; 

/**
 * AdminBarToko: Menyediakan daftar tombol untuk Toolbar Editor.
 * Tombol ini memicu openAdminModal dari TokoContext.
 * * Catatan: Layout (misal: fixed, vertical, horizontal) diatur oleh komponen Editor
 * milik partner Anda yang akan mengimpor komponen ini.
 */
const AdminBarToko = () => {
    // 1. Ambil Data dan Fungsi Penting
    const { features, openAdminModal, info } = useToko();
    const { signOut } = useAuth(); // Fungsi Logout dari partner

    // 2. Definisi Tombol Admin Bar
    // Setiap tombol memiliki label, modalName, dan featureFlag yang diperlukan.
    const adminButtons = [
        { label: 'Desain', icon: '🎨', modalName: 'Tampilan', requiredFeature: 'custom_color_enabled' },
        { label: 'Profil Toko', icon: '👤', modalName: 'Profil', requiredFeature: 'always_available' },
        { label: 'Produk', icon: '📦', modalName: 'Produk', requiredFeature: 'always_available' },
        { label: 'Promo', icon: '🏷️', modalName: 'Promo', requiredFeature: 'show_promo_banner' },
        { label: 'Galeri', icon: '📸', modalName: 'Galeri', requiredFeature: 'show_galeri' },
        { label: 'Lokasi', icon: '📍', modalName: 'Lokasi', requiredFeature: 'show_lokasi_page' },
        { label: 'Mitra', icon: '🤝', modalName: 'Mitra', requiredFeature: 'show_mitra_section' },
        { label: 'Testimoni', icon: '⭐', modalName: 'Testimoni', requiredFeature: 'always_available' },
        { label: 'Blog', icon: '📝', modalName: 'Blog', requiredFeature: 'show_blog' },
    ];
    
    // Fungsi untuk menangani klik tombol
    const handleButtonClick = (btn) => {
        const isAvailable = btn.requiredFeature === 'always_available' || features[btn.requiredFeature];
        
        if (isAvailable) {
            // Jika fitur tersedia, buka modal yang sesuai
            openAdminModal(btn.modalName);
        } else {
            // Jika fitur terkunci, buka modal Upsell dan kirim nama fiturnya
            openAdminModal('Upsell', btn.label);
        }
    };
    
    // Komponen Button Modular
    const AdminButton = ({ btn, isAvailable }) => (
        <button
            onClick={() => handleButtonClick(btn)}
            className={`flex flex-col items-center justify-center p-3 w-full 
                        rounded-lg transition-all duration-200 text-sm 
                        ${isAvailable 
                            ? 'bg-gray-700 text-white hover:bg-[var(--color-primary)]' 
                            : 'bg-gray-800 text-gray-400 cursor-not-allowed opacity-70 hover:bg-red-900/50'
                        }`}
            title={isAvailable ? `Buka pengaturan ${btn.label}` : `Fitur ${btn.label} Terkunci (Upsell)`}
        >
            <span className="text-xl mb-1">{isAvailable ? btn.icon : '🔒'}</span>
            <span className="text-xs font-medium">{btn.label}</span>
        </button>
    );

    return (
        <div className="p-2 bg-gray-900 h-full w-full flex flex-col space-y-3">
            
            {/* Logo/Judul Editor (Diatur oleh Cangkang Partner, ini hanya placeholder) */}
            <h3 className="text-white text-xl font-bold text-center border-b border-gray-700 pb-2 mb-2">
                {info?.nama_toko || 'Editor Toko'}
            </h3>

            {/* Tombol-tombol Admin */}
            <div className="space-y-2 flex-grow overflow-y-auto">
                {adminButtons.map((btn) => (
                    <AdminButton 
                        key={btn.modalName} 
                        btn={btn} 
                        isAvailable={btn.requiredFeature === 'always_available' || features[btn.requiredFeature]}
                    />
                ))}
            </div>

            {/* Logout/Keluar Editor (Di bagian bawah) */}
            <div className="pt-2 border-t border-gray-700">
                <button
                    onClick={signOut}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition"
                    title="Keluar dari mode editor"
                >
                    Keluar Editor
                </button>
            </div>
        </div>
    );
};

export default AdminBarToko;