import React from 'react';
import { useToko } from '../../hooks/useToko';
import HeroSection from '../../components/toko_template/HeroSection'; // Anggap sudah dibuat
import ProductCard from '../../components/toko_template/ProductCard';
import TestimoniSection from '../../components/toko_template/TestimoniSection';
import MitraSection from '../../components/toko_template/MitraSection'; 

const TokoHomepage = () => {
    // Ambil data produk dan feature flags
    const { produk, features, settings } = useToko();
    const primaryColor = settings?.colors?.primary;

    // Tampilkan 8 produk pertama
    const featuredProduk = produk.slice(0, 8); 

    return (
        <div className="TokoHomepage">
            
            {/* 1. Hero Section */}
            <HeroSection /> 

            {/* 2. Featured Product Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800" style={{ color: primaryColor }}>
                        Produk Unggulan Kami
                    </h2>
                    
                    {featuredProduk.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProduk.map((item) => (
                                // Pastikan ID produk diambil dari Firestore (doc.id di TokoContext)
                                <ProductCard key={item.id} produk={item} /> 
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 p-8 border border-dashed border-gray-300 rounded-lg">
                            Belum ada produk untuk ditampilkan.
                        </p>
                    )}
                </div>
            </section>
            
            {/* 3. Mitra Section (Conditional Rendering/Feature Flag) */}
            {/* Komponen ini hanya akan dirender jika feature flag-nya TRUE */}
            {features.show_mitra_section && (
                <MitraSection />
            )}

            {/* 4. Testimoni Section */}
            <TestimoniSection />
        </div>
    );
};

export default TokoHomepage;