import React from 'react';
// Impor ikon
import { FaUsers, FaBullseye, FaLightbulb } from 'react-icons/fa';

// Halaman Tentang Kami (Desain Ulang)
function AboutPage() {
  
  // Nanti, data ini akan diambil dari Firestore
  // via SuperAdmin_ContentModal
  const aboutData = {
    heroTitle: "Tentang Chatalog",
    heroSubtitle: "Memberdayakan UMKM Indonesia melalui teknologi yang mudah dan terjangkau.",
    storyTitle: "Kisah Kami",
    storyText: "Chatalog dimulai dari sebuah visi sederhana: memberdayakan setiap UMKM di Indonesia dengan alat digital yang setara dengan bisnis besar. Kami melihat banyak pemilik usaha kecil yang kesulitan bersaing secara online karena keterbatasan teknis dan biaya. Oleh karena itu, kami membangun platform ini dengan satu misi: membuat teknologi e-commerce canggih menjadi sesuatu yang bisa digunakan oleh siapa saja, semudah mengedit kanvas.",
    teamTitle: "Tim Kami",
    teamText: "Kami adalah tim pengembang, desainer, dan pegiat UMKM yang bersemangat untuk menciptakan solusi nyata. (Konten ini bisa diedit oleh Super Admin)."
  };

  return (
    <div className="bg-white">
      {/* 1. Hero Section Halaman */}
      <section className="bg-gray-50 py-20 md:py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {aboutData.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {aboutData.heroSubtitle}
          </p>
        </div>
      </section>

      {/* 2. Kisah Kami (Layout Split) */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            {/* Placeholder Gambar Tim/Cerita */}
            <div className="bg-[#006064] rounded-lg shadow-xl aspect-video flex items-center justify-center">
              <span className="text-white text-2xl font-bold">(Gambar Tim/Cerita)</span>
            </div>
          </div>
          {/* --- PERBAIKAN: Hapus class 'prose' & 'prose-lg' --- */}
          <div className="max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{aboutData.storyTitle}</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {aboutData.storyText}
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{aboutData.teamTitle}</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {aboutData.teamText}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Visi & Misi (Card) */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            {/* Card Visi */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <FaBullseye className="text-4xl text-[#FFAB40] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Visi Kami</h3>
              <p className="text-gray-600">
                Menjadi platform digitalisasi #1 untuk UMKM di Indonesia.
              </p>
            </div>
            
            {/* Card Misi */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <FaLightbulb className="text-4xl text-[#FFAB40] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Misi Kami</h3>
              <p className="text-gray-600">
                Menyediakan teknologi AI dan editor visual yang intuitif bagi semua lapisan masyarakat.
              </p>
            </div>

            {/* Card Nilai */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <FaUsers className="text-4xl text-[#FFAB40] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Nilai Kami</h3>
              <p className="text-gray-600">
                Kemudahan, Keterjangkauan, dan Pertumbuhan Bersama.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;