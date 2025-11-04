import React from 'react';
import { useToko } from '../../hooks/useToko';

// Fungsi bantuan (Anggap ini ada di utils/index.js atau file helper)
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

const ProductCard = ({ produk }) => {
    // Ambil warna primer untuk styling tombol
    const { settings } = useToko();
    const primaryColor = settings?.colors?.primary;

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            
            {/* Gambar Produk */}
            <div className="h-48 overflow-hidden">
                <img 
                    src={produk.imageUrl || 'https://via.placeholder.com/400x300?text=Produk+Belum+Ada'} 
                    alt={produk.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
            </div>

            <div className="p-4">
                {/* Nama Produk (Menggunakan produk.name dari Firestore) */}
                <h3 className="text-lg font-semibold text-gray-800 truncate mb-1" title={produk.name}>
                    {produk.name}
                </h3>
                
                {/* Deskripsi Singkat (Menggunakan produk.description dari Firestore) */}
                <p className="text-sm text-gray-500 h-10 overflow-hidden mb-3">
                    {produk.description || 'Deskripsi singkat produk ini.'}
                </p>

                {/* Harga dan Tombol Beli (Menggunakan produk.price dari Firestore) */}
                <div className="flex justify-between items-center mt-3">
                    <span className="text-xl font-bold" style={{ color: primaryColor }}>
                        {formatRupiah(produk.price || 0)}
                    </span>
                    <button
                        className="py-2 px-3 text-sm font-semibold rounded-lg text-white transition"
                        style={{ backgroundColor: primaryColor }}
                        onClick={() => console.log(`Tambah ${produk.name} ke keranjang`)}
                    >
                        + Keranjang
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;