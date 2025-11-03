import React from 'react';
import { useToko } from '../../hooks/useToko';

// Template Components (Tugas Saya)
import HeroSection from '../../components/toko_template/HeroSection';
import ProductCard from '../../components/toko_template/ProductCard'; // Anggap sudah dibuat
import TestimoniSection from '../../components/toko_template/TestimoniSection';
import MitraSection from '../../components/toko_template/MitraSection'; // Feature Flagged Component

/**
 * TokoHomepage: Halaman utama toko klien. 
 * Merangkai semua section dan menerapkan Feature Flags.
 */
const TokoHomepage = () => {
    const { loading, error, produk, features } = useToko();

    // Loading/Error sudah ditangani di TokoProvider (Step 1), 
    // tapi kita bisa tambahkan logika fallback.
    if (loading || error) {
        return null; // Atau tampilkan skeleton, tapi TokoRenderer sudah menanganinya.
    }

    // Filter produk yang ditandai untuk ditampilkan di homepage (misal: isFeatured)
    const featuredProduk = produk.filter(p => p.isFeatured === true).slice(0, 8);


    return (
        <div className="TokoHomepage">
            
            {/* 1. Hero Section (Selalu ada) */}
            <HeroSection />

            {/* 2. Featured Product Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10 text-[var(--color-primary)]">
                        Produk Unggulan
                    </h2>
                    
                    {featuredProduk.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProduk.map((item) => (
                                // Anggap ProductCard mengambil item produk sebagai prop
                                <ProductCard key={item.id} produk={item} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Belum ada produk unggulan yang ditampilkan.</p>
                    )}
                    
                    <div className="text-center mt-10">
                        <a 
                            href="/produk" 
                            className="text-lg font-semibold underline text-[var(--color-primary)] hover:text-opacity-80"
                        >
                            Lihat Semua Produk &rarr;
                        </a>
                    </div>
                </div>
            </section>
            
            {/* 3. Testimoni Section (Anggap selalu ada) */}
            <TestimoniSection />

            {/* 4. Mitra Section (Conditional Rendering/Feature Flag) */}
            {/* Komponen ini hanya akan dirender jika feature flag-nya TRUE */}
            {features.show_mitra_section && (
                <MitraSection />
            )}

            {/* Anda akan mengulangi pola ini untuk TokoProdukPage.jsx, TokoContactPage.jsx, dll. */}
        </div>
    );
};

export default TokoHomepage;