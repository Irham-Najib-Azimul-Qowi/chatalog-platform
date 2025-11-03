import React from 'react';
import { Link } from 'react-router-dom';

function FooterChatalog() {
  return (
    // Menggunakan warna Primer Chatalog
    <footer className="bg-[#006064] text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Kolom 1: Tentang Chatalog */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Chatalog</h3>
          <p className="text-sm">
            Platform "pabrik website" untuk UMKM go digital dengan mudah, cepat, dan terintegrasi AI.
          </p>
        </div>
        
        {/* Kolom 2: Link Cepat */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tentang" className="hover:text-white">Tentang Kami</Link></li>
            <li><Link to="/simulator" className="hover:text-white">Simulator</Link></li>
            <li><Link to="/kontak" className="hover:text-white">Kontak</Link></li>
            <li><Link to="/register" className="hover:text-white">Daftar Sekarang</Link></li>
          </ul>
        </div>
        
        {/* Kolom 3: Kontak */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Hubungi Kami</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: admin@chatalog.com</li>
            <li>Telepon: +62 123 456 789</li>
            <li>Madiun, Indonesia</li>
          </ul>
        </div>

      </div>
      <div className="container mx-auto px-6 text-center mt-8 border-t border-gray-700 pt-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Chatalog. Dibuat oleh [Nama Anda & Teman Anda].
        </p>
      </div>
    </footer>
  );
}

export default FooterChatalog;