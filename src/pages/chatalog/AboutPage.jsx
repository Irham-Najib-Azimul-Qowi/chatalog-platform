import React from 'react';
import { FaUsers, FaBullseye, FaLightbulb } from 'react-icons/fa';

// Tambahkan props: { isPreview = false, previewData = {} }
function AboutPage({ isPreview = false, previewData = {} }) {
  
  // Data default
  const defaultData = {
    heroTitle: "Tentang Chatalog",
    heroSubtitle: "Memberdayakan UMKM Indonesia melalui teknologi yang mudah dan terjangkau.",
    storyTitle: "Kisah Kami",
    storyText: "Chatalog dimulai dari sebuah visi sederhana...",
    teamTitle: "Tim Kami",
    teamText: "Kami adalah tim pengembang..."
  };
  
  // --- DATA PREVIEW (DIPERBARUI) ---
  const aboutData = isPreview ? {
    ...defaultData,
    // Ambil data live dari previewData, jika tidak ada, gunakan default
    storyText: previewData.storyText || defaultData.storyText,
    teamText: previewData.aboutText || defaultData.teamText,
  } : defaultData;
  // --- AKHIR PREVIEW ---

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

      {/* 2. Kisah Kami (Layout Split - Live) */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="bg-placeholder rounded-lg shadow-xl aspect-video"></div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-text-dark mb-4">{aboutData.storyTitle}</h2>
            <p className="text-lg text-text-body leading-relaxed">
              {aboutData.storyText} {/* <-- Data Live */}
            </p>
            <h2 className="text-4xl font-bold text-text-dark mt-12 mb-4">{aboutData.teamTitle}</h2>
            <p className="text-lg text-text-body leading-relaxed">
              {aboutData.teamText} {/* <-- Data Live */}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Visi & Misi (Card - Tetap) */}
      <section className="bg-background-light py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* ... (Konten Visi Misi Card) ... */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;