import React from 'react';
import { Link } from 'react-router-dom';
import { useToko } from '../../hooks/useToko';

const NavbarToko = () => {
    const { info, settings, features } = useToko();

    const namaToko = info?.name || 'Chatalog Store'; // Menggunakan 'name' dari info Toko
    const logoUrl = settings?.logoUrl; // Menggunakan 'logoUrl' dari settings
    const primaryColor = settings?.colors?.primary; // Menggunakan 'colors.primary' dari settings

    // Tentukan link navigasi berdasarkan feature flags
    const navLinks = [
        { name: 'Home', path: '' },
        { name: 'Produk', path: 'produk' },
        { name: 'Tentang', path: 'about' },
        // Link yang bergantung pada fitur berbayar/opsional
        features.show_blog_page && { name: 'Blog', path: 'blog' }, // Nama fitur disesuaikan
        features.show_gallery_page && { name: 'Galeri', path: 'galeri' }, // Asumsi nama feature flag
        features.show_location_page && { name: 'Lokasi', path: 'lokasi' }, // Nama fitur disesuaikan
    ].filter(Boolean); 

    // Terapkan warna primer ke style inline agar Tailwind dapat menggunakan variabel CSS
    const primaryStyle = primaryColor ? { color: primaryColor } : {};

    return (
        <nav className="shadow-md sticky top-0 z-40 bg-white">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                
                {/* Logo / Nama Toko */}
                <Link to="/" className="flex items-center space-x-2 text-xl font-bold" style={primaryStyle}>
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
                            className="text-gray-600 font-medium transition duration-150"
                            // Gunakan CSS variable yang akan didefinisikan di TokoRenderer
                            style={{ '--color-primary': primaryColor }}
                            onMouseOver={e => e.currentTarget.style.color = primaryColor}
                            onMouseOut={e => e.currentTarget.style.color = '#4b5563'} // Warna default text-gray-600
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Tombol Aksi (misal: Cart/Pesan) */}
                <button 
                    className="py-2 px-4 rounded-lg text-sm font-semibold text-white transition"
                    // Gunakan CSS variable untuk background
                    style={{ backgroundColor: primaryColor }}
                >
                    Pesan Sekarang
                </button>
            </div>
        </nav>
    );
};

export default NavbarToko;