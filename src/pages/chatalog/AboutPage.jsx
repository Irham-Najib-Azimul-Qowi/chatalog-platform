import React from 'react';
import { FaUsers, FaBullseye, FaLightbulb } from 'react-icons/fa';

// Halaman Tentang Kami (Redesign v3)
function AboutPage({ isPreview = false, previewData = {} }) {
  
  const defaultData = {
    heroTitle: "Tentang Chatalog",
    heroSubtitle: "Memberdayakan UMKM Indonesia melalui teknologi yang mudah dan terjangkau.",
    storyTitle: "Kisah Kami",
    storyText: "Chatalog dimulai dari sebuah visi sederhana: memberdayakan setiap UMKM di Indonesia dengan alat digital yang setara dengan bisnis besar. Kami melihat banyak pemilik usaha kecil yang kesulitan bersaing secara online karena keterbatasan teknis dan biaya. Oleh karena itu, kami membangun platform ini dengan satu misi: membuat teknologi e-commerce canggih menjadi sesuatu yang bisa digunakan oleh siapa saja, semudah mengedit kanvas.",
    teamTitle: "Tim Kami",
    teamText: "Kami adalah tim pengembang, desainer, dan pegiat UMKM yang bersemangat untuk menciptakan solusi nyata. (Konten ini bisa diedit oleh Super Admin)."
  };

  const aboutData = isPreview ? {
    ...defaultData,
    storyText: previewData.storyText || defaultData.storyText,
    teamText: previewData.aboutText || defaultData.teamText,
  } : defaultData;

  return (
    <div className="bg-white">
      {/* 1. Hero Section Halaman */}
      <section className="bg-background-light py-20 md:py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-text-dark mb-4">
            {aboutData.heroTitle}
          </h1>
          <p className="text-xl text-text-body max-w-3xl mx-auto leading-relaxed">
            {aboutData.heroSubtitle}
          </p>
        </div>
      </section>

      {/* 2. Kisah Kami (Layout Split) */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            {/* Placeholder Gambar Tim/Cerita (Warna) */}
            <div className="bg-placeholder rounded-lg shadow-xl aspect-video"></div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-text-dark mb-4">{aboutData.storyTitle}</h2>
            <p className="text-lg text-text-body leading-relaxed">
              {aboutData.storyText}
            </p>
            <h2 className="text-4xl font-bold text-text-dark mt-12 mb-4">{aboutData.teamTitle}</h2>
            <p className="text-lg text-text-body leading-relaxed">
              {aboutData.teamText}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Visi & Misi (Card) */}
      <section className="bg-background-light py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <FaBullseye className="text-5xl text-chatalog-secondary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-text-dark mb-3">Visi Kami</h3>
              <p className="text-text-body leading-relaxed">
                Menjadi platform digitalisasi #1 untuk UMKM di Indonesia.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <FaLightbulb className="text-5xl text-chatalog-secondary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-text-dark mb-3">Misi Kami</h3>
              <p className="text-text-body leading-relaxed">
                Menyediakan teknologi AI dan editor visual yang intuitif bagi semua lapisan masyarakat.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <FaUsers className="text-5xl text-chatalog-secondary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-text-dark mb-3">Nilai Kami</h3>
              <p className="text-text-body leading-relaxed">
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