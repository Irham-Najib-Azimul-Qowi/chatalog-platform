import React from 'react';
import { Link } from 'react-router-dom';

// Homepage Web Utama Chatalog
function HomePageChatalog() {
  return (
    <>
      {/* Navbar dan Footer sudah diurus oleh ChatalogLayout */}
      
      {/* Bagian 1: Hero Section */}
      <section className="bg-white text-center py-20 md:py-32">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Website UMKM Canggih, <br /> Semudah Mengedit Canva
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Buat toko online profesional Anda sendiri dengan "Live Editor" dan asisten AI. Tidak perlu coding.
          </p>
          <Link 
            to="/register" 
            // Menggunakan warna Secondary Chatalog
            className="bg-[#FFAB40] text-black font-bold py-3 px-8 rounded-md text-lg hover:bg-orange-400 transition-colors"
          >
            Coba Sekarang (Gratis)
          </Link>
        </div>
      </section>

      {/* Bagian 2: Showcase / Portofolio Klien */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Dipercaya oleh Ratusan UMKM
          </h2>
          <p className="text-gray-600 mb-12">
            (Nanti di sini kita tampilkan statistik dan logo-logo klien)
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <span className="text-gray-500 font-semibold">Logo Klien 1</span>
            <span className="text-gray-500 font-semibold">Logo Klien 2</span>
            <span className="text-gray-500 font-semibold">Logo Klien 3</span>
            <span className="text-gray-500 font-semibold">Logo Klien 4</span>
            <span className="text-gray-500 font-semibold">Logo Klien 5</span>
          </div>
        </div>
      </section>

      {/* Bagian 3: Kisah Chatalog */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kisah Kami</h2>
            <p className="text-gray-600 mb-8">
              (Teks "Kisah Chatalog" atau "Tentang Tim" akan kita isi di sini. 
              Data ini akan diambil dari Firestore dan bisa diedit oleh Super Admin)
            </p>
            <Link 
              to="/tentang" 
              className="text-[#006064] hover:underline font-semibold"
            >
              Baca lebih lanjut
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePageChatalog;