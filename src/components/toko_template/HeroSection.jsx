import React from 'react';
import { useToko } from '../../hooks/useToko';

/**
 * HeroSection: Bagian pembuka di Homepage.
 * Mengambil data info dan settings dari TokoContext.
 */
const HeroSection = () => {
    // Ambil data penting dari context
    const { info, settings } = useToko();
    
    // Fallback data
    const namaToko = info?.nama_toko || 'Nama Toko Klien Anda';
    const slogan = info?.slogan || 'Slogan keren yang menjelaskan bisnis Anda.';
    const heroImage = settings?.hero_image_url || 'https://via.placeholder.com/1200x600?text=Hero+Image';
    
    // Ambil warna primer yang sudah ditetapkan di TokoRenderer sebagai CSS Variable
    // Kita akan menggunakan warna ini via class kustom di Tailwind
    // Contoh: bg-[var(--color-primary)]

    return (
        <section 
            className="relative h-[60vh] md:h-[80vh] bg-cover bg-center transition-all duration-300"
            style={{ backgroundImage: `url(${heroImage})` }}
        >
            {/* Overlay semi-transparan */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Konten Utama */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
                
                {/* Judul Utama Toko */}
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg transition-colors duration-300">
                    {namaToko}
                </h1>
                
                {/* Slogan atau Deskripsi Singkat */}
                <p className="text-lg md:text-2xl text-white max-w-2xl mb-8 drop-shadow-md">
                    {slogan}
                </p>
                
                {/* Tombol Aksi Kustom - Menggunakan warna primer dinamis */}
                {/* Perhatikan penggunaan class dinamis: bg-[var(--color-primary)] */}
                <button 
                    className="py-3 px-8 text-lg font-semibold rounded-full text-white shadow-xl 
                                transition-all duration-300 ease-in-out
                                bg-[var(--color-primary)] hover:bg-opacity-80
                                transform hover:scale-105"
                >
                    Lihat Produk Kami
                </button>
            </div>
            
        </section>
    );
};

export default HeroSection;