import React from 'react';

// Fungsi bantuan untuk format harga (anggap ada di utils/index.js)
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

const ProductCard = ({ produk }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            
            {/* Gambar Produk */}
            <div className="h-48 overflow-hidden">
                <img 
                    src={produk.gambar_url || 'https://via.placeholder.com/400x300?text=Produk+Belum+Ada'} 
                    alt={produk.nama} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
            </div>

            <div className="p-4">
                {/* Nama Produk */}
                <h3 className="text-lg font-semibold text-gray-800 truncate mb-1" title={produk.nama}>
                    {produk.nama}
                </h3>
                
                {/* Deskripsi Singkat */}
                <p className="text-sm text-gray-500 h-10 overflow-hidden mb-3">
                    {produk.deskripsi_singkat || 'Deskripsi singkat produk ini.'}
                </p>

                {/* Harga dan Tombol Beli */}
                <div className="flex justify-between items-center mt-3">
                    <span className="text-xl font-bold text-[var(--color-primary)]">
                        {formatRupiah(produk.harga || 0)}
                    </span>
                    <button
                        className="py-2 px-3 text-sm font-semibold rounded-lg text-white 
                                   bg-[var(--color-primary)] hover:opacity-90 transition"
                        onClick={() => console.log(`Tambah ${produk.nama} ke keranjang`)}
                    >
                        + Keranjang
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;