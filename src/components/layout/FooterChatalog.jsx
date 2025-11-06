import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

// Tambahkan props: { isPreview = false, previewData = {} }
function FooterChatalog({ isPreview = false, previewData = {} }) {

  const currentYear = new Date().getFullYear();

  // Data default untuk footer
  const defaultData = {
    copyrightText: `© ${currentYear} Chatalog. All rights reserved.`,
  };

  // --- DATA PREVIEW (DIPERBARUI) ---
  const footerData = isPreview ? {
    copyrightText: previewData.footerCopyright || defaultData.copyrightText,
  } : defaultData;
  // --- AKHIR PREVIEW ---

  return (
    <footer className="bg-chatalog-primary text-white py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Kolom 1: Logo & Deskripsi Singkat */}
        <div>
          <h3 className="text-3xl font-bold mb-4">Chatalog</h3>
          <p className="text-gray-200 text-sm leading-relaxed">
            Platform Chatalog dirancang untuk memberdayakan UMKM, membantu mereka tumbuh di era digital.
          </p>
        </div>

        {/* Kolom 2: Navigasi Cepat */}
        <div>
          <h4 className="font-bold text-lg mb-4">Navigasi</h4>
          <ul className="space-y-2 text-gray-200">
            <li><Link to="/home" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Toko</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Kontak</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">Masuk</Link></li>
          </ul>
        </div>

        {/* Kolom 3: Layanan Kami */}
        <div>
          <h4 className="font-bold text-lg mb-4">Layanan</h4>
          <ul className="space-y-2 text-gray-200">
            <li><Link to="/simulator" className="hover:text-white transition-colors">Simulator</Link></li>
            <li><Link to="/register" className="hover:text-white transition-colors">Daftar</Link></li>
            <li><Link to="/bantuan" className="hover:text-white transition-colors">Pusat Bantuan</Link></li>
          </ul>
        </div>

        {/* Kolom 4: Ikuti Kami */}
        <div>
          <h4 className="font-bold text-lg mb-4">Ikuti Kami</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white text-2xl transition-colors">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white text-2xl transition-colors">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white text-2xl transition-colors">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Baris Hak Cipta */}
      <div className="mt-12 border-t border-white/20 pt-8 text-center text-gray-300 text-sm">
        <p>{footerData.copyrightText}</p>
      </div>
    </footer>
  );
}

export default FooterChatalog;