import React from 'react';
import { Link } from 'react-router-dom';
import { useToko } from '../../hooks/useToko';

const NavbarToko = () => {
    const { info, settings, features } = useToko();

    const namaToko = info?.nama_toko || 'Chatalog Store';
    const logoUrl = settings?.logo_url;

    // Tentukan link navigasi berdasarkan feature flags
    const navLinks = [
        { name: 'Home', path: '' },
        { name: 'Produk', path: 'produk' },
        { name: 'Tentang', path: 'about' },
        // Link yang bergantung pada fitur berbayar/opsional
        features.show_blog && { name: 'Blog', path: 'blog' },
        features.show_galeri && { name: 'Galeri', path: 'galeri' },
        features.show_lokasi_page && { name: 'Lokasi', path: 'lokasi' },
    ].filter(Boolean); // Menghapus item null/false dari array

    return (
        <nav className="shadow-md sticky top-0 z-40 bg-white">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                
                {/* Logo / Nama Toko */}
                <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-[var(--color-primary)]">
                    {logoUrl ? (
                        <img src={logoUrl} alt={`${namaToko} Logo`} className="h-8 w-auto" />
                    ) : (
                        <span>{namaToko}</span>
                    )}
                </Link>

                {/* Navigasi Utama */}
                <div className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            to={link.path}
                            // Menggunakan warna primer untuk hover
                            className="text-gray-600 hover:text-[var(--color-primary)] font-medium transition duration-150"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Tombol Aksi (misal: Cart/Pesan) */}
                <button 
                    className="py-2 px-4 rounded-lg text-sm font-semibold text-white 
                                bg-[var(--color-primary)] hover:opacity-90 transition"
                >
                    Pesan Sekarang
                </button>
            </div>
        </nav>
    );
};

export default NavbarToko;