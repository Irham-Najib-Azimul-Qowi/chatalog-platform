import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBolt, FaPalette, FaMobileAlt, FaUsers, FaChartLine, FaShieldAlt } from 'react-icons/fa';

// --- Helper Hook untuk Animasi Counter (Tidak Berubah) ---
function useCountUp(end, setCount, duration = 2000) {
  const ref = useRef(null);
  const observerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let startTime = null;
        const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(node);
    observerRef.current = observer;
    return () => { if (observerRef.current) observerRef.current.disconnect(); };
  }, [end, duration, setCount, hasAnimated]);
  return ref;
}

// Homepage Web Utama Chatalog (Redesign v3)
function HomePageChatalog({ isPreview = false, previewData = {} }) {
  
  const JUMLAH_TOKO_TARGET = 150; 
  const [jumlahToko, setJumlahToko] = useState(0); 
  const countUpRef = useCountUp(JUMLAH_TOKO_TARGET, setJumlahToko);

  const data = isPreview ? previewData : {
    heroTitle: "Mulai Digitalisasi Bisnis Anda Hari Ini",
    heroSubtitle: "Platform Chatalog dirancang khusus untuk UMKM Indonesia. Dapatkan website profesional dengan editor visual yang mudah dipahami dan terintegrasi AI.",
    storyText: "Chatalog dimulai dari sebuah visi sederhana: memberdayakan setiap UMKM di Indonesia dengan alat digital yang setara dengan bisnis besar...",
  };

  const FeatureCard = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="mb-4">
        {React.createElement(icon, { className: "text-4xl text-chatalog-primary" })}
      </div>
      <h3 className="text-xl font-bold text-text-dark mb-2">{title}</h3>
      <p className="text-text-body leading-relaxed">{children}</p>
    </div>
  );

  const TestimonialCard = ({ quote, name, title }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
      <p className="text-text-body text-lg italic flex-grow">"{quote}"</p>
      <div className="flex items-center mt-4">
        <div className="w-12 h-12 rounded-full bg-chatalog-primary flex items-center justify-center text-white font-bold text-xl mr-4">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-text-dark">{name}</p>
          <p className="text-sm text-text-body">{title}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Bagian 1: Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Kiri: Teks Konten */}
          <div className="text-left">
            <span 
              className="inline-block bg-chatalog-primary/10 text-chatalog-primary text-sm font-semibold px-4 py-1 rounded-full mb-4"
            >
              Platform Digital untuk UMKM
            </span>
            {/* H1 (Style Baru) */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-text-dark mb-6 leading-tight">
              {data.heroTitle}
            </h1>
            {/* Paragraf (Style Baru) */}
            <p className="text-lg text-text-body mb-10 max-w-lg leading-relaxed">
              {data.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/register" 
                className="bg-chatalog-secondary text-black font-bold py-3 px-8 rounded-lg text-lg 
                           hover:opacity-80 transition-all duration-300
                           transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
              >
                Daftar Sekarang
              </Link>
              <Link 
                to="/simulator" 
                className="bg-transparent border-2 border-chatalog-primary text-chatalog-primary font-bold py-3 px-8 rounded-lg text-lg 
                           hover:bg-chatalog-primary/10 transition-all duration-300 text-center"
              >
                Lihat Demo
              </Link>
            </div>
          </div>
          
          {/* Kanan: Gambar Placeholder (Warna) */}
          <div className="flex justify-center">
            <div className="w-full h-full max-h-[500px] min-h-[400px] bg-placeholder rounded-lg shadow-2xl">
              {/* Placeholder gambar diganti warna solid */}
            </div>
          </div>
        </div>
      </section>

      {/* Bagian 2: Statistik */}
      <section ref={countUpRef} className="bg-background-light py-20">
        <div className="container mx-auto px-6 text-center">
          {/* H2 (Style Baru) */}
          <h2 className="text-4xl font-bold text-text-dark mb-4">
            Bergabung dengan Ratusan Lainnya
          </h2>
          <div 
            className="text-7xl md:text-8xl font-extrabold text-chatalog-primary my-4"
          >
            {jumlahToko}+
          </div>
          <p className="text-xl text-text-body">
            Toko UMKM telah mempercayai Chatalog.
          </p>
        </div>
      </section>

      {/* Bagian 3: Logo Cloud */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-xl font-semibold text-text-body mb-12">
            Telah Dipercaya oleh Berbagai Bisnis
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60">
            <span className="text-2xl font-semibold text-gray-500 italic">Logo Klien A</span>
            <span className="text-2xl font-semibold text-gray-500 italic">Logo Klien B</span>
            <span className="text-2xl font-semibold text-gray-500 italic">Logo Klien C</span>
            <span className="text-2xl font-semibold text-gray-500 italic">Logo Klien D</span>
            <span className="text-2xl font-semibold text-gray-500 italic">Logo Klien E</span>
          </div>
        </div>
      </section>
      
      {/* Bagian 4: Fitur Unggulan */}
      <section className="bg-background-light py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-text-dark mb-4">Fitur Unggulan Kami</h2>
            <p className="text-lg text-text-body leading-relaxed">
              Semua yang Anda butuhkan untuk mengembangkan bisnis online Anda, dalam satu platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={FaBolt} title="Editor Visual Cepat">
              Atur tampilan web Anda secara visual. Cukup klik dan edit, tanpa perlu coding.
            </FeatureCard>
            <FeatureCard icon={FaPalette} title="Kustomisasi Tema">
              Pilih dari 10+ palet warna profesional atau atur warna kustom Anda sendiri.
            </FeatureCard>
            <FeatureCard icon={FaMobileAlt} title="Desain Responsif">
              Website Anda akan otomatis tampil sempurna di desktop, tablet, dan mobile.
            </FeatureCard>
            <FeatureCard icon={FaUsers} title="Manajemen Mitra">
              Tampilkan logo-logo mitra bisnis Anda di homepage untuk membangun kepercayaan.
            </FeatureCard>
            <FeatureCard icon={FaChartLine} title="Analitik Sederhana">
              Pantau performa toko Anda dengan data analitik yang mudah dipahami (Segera Hadir).
            </FeatureCard>
            <FeatureCard icon={FaShieldAlt} title="Aman & Terpercaya">
              Didukung oleh infrastruktur Google Firebase yang cepat dan aman.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Bagian 5: Testimoni */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-text-dark mb-4">Apa Kata Mereka?</h2>
            <p className="text-lg text-text-body leading-relaxed">
              Testimoni dari ribuan UMKM yang telah berkembang bersama Chatalog.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Chatalog membantu saya meningkatkan penjualan hingga 200% dalam 3 bulan!"
              name="Budi Santoso"
              title="Kopi Kenangan Senja"
            />
            <TestimonialCard 
              quote="Platform yang mudah digunakan dan ramah-pengguna. Customer service-nya juga sangat responsif."
              name="Siti Rahayu"
              title="Batik Mawar"
            />
            <TestimonialCard 
              quote="Pilihan terbaik untuk UMKM. Fitur lengkap dengan harga yang sangat terjangkau."
              name="Andi Wijaya"
              title="Roti Nusantara"
            />
          </div>
        </div>
      </section>

      {/* Bagian 6: Final CTA */}
      <section className="bg-background-light py-20">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-text-dark mb-6">
            Siap Mengembangkan Bisnis Anda?
          </h2>
          <p className="text-lg text-text-body mb-10 leading-relaxed">
            Bergabunglah dengan ribuan UMKM yang telah mempercayai Chatalog untuk
            mengembangkan bisnis mereka di dunia digital.
          </p>
          <Link 
            to="/register" 
            className="bg-chatalog-secondary text-black font-bold py-4 px-10 rounded-lg text-lg 
                       hover:opacity-80 transition-all duration-300
                       transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Daftar Sekarang
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePageChatalog;