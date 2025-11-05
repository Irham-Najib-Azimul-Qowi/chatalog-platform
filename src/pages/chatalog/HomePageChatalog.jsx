import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// Ikon untuk bagian Fitur
import { FaBolt, FaPalette, FaMobileAlt, FaUsers, FaChartLine, FaShieldAlt } from 'react-icons/fa';

// --- Helper Hook untuk Animasi Counter (dari step kita sebelumnya [cite: 3715]) ---
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
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(node);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [end, duration, setCount, hasAnimated]);

  return ref;
}
// --- Akhir Helper Hook ---


// Homepage Web Utama Chatalog (Versi Desain Ulang)
function HomePageChatalog({ isPreview = false, previewData = {} }) {
  
  // (Target jumlah toko, nanti bisa diambil dari Firestore)
  const JUMLAH_TOKO_TARGET = 150; 
  const [jumlahToko, setJumlahToko] = useState(0); 
  const countUpRef = useCountUp(JUMLAH_TOKO_TARGET, setJumlahToko);

  // Data default jika tidak dalam mode preview
  const data = isPreview ? previewData : {
    heroTitle: "Mulai Digitalisasi Bisnis Anda Hari Ini",
    heroSubtitle: "Platform Chatalog dirancang khusus untuk UMKM Indonesia. Dapatkan website profesional dengan editor visual yang mudah dipahami dan terintegrasi AI.",
    storyText: "Chatalog dimulai dari sebuah visi sederhana: memberdayakan setiap UMKM di Indonesia dengan alat digital yang setara dengan bisnis besar...",
  };

  // Komponen internal untuk Kartu Fitur
  const FeatureCard = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
      <div className="mb-4">
        {/* Ikon menggunakan warna Primer Chatalog */}
        {React.createElement(icon, { className: "text-4xl text-[#006064]" })}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  );

  // Komponen internal untuk Kartu Testimoni
  const TestimonialCard = ({ quote, name, title }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 h-full flex flex-col">
      <p className="text-gray-700 italic flex-grow">"{quote}"</p>
      <div className="flex items-center mt-4">
        <div className="w-12 h-12 rounded-full bg-[#006064] flex items-center justify-center text-white font-bold text-xl mr-4">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Bagian 1: Hero Section (Layout dari image_276427.png) */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Kiri: Teks Konten */}
          <div className="text-left">
            <span 
              // Badge/Tagline menggunakan warna Primer Chatalog
              className="inline-block bg-cyan-100 text-[#006064] text-sm font-semibold px-4 py-1 rounded-full mb-4"
              style={{ backgroundColor: '#E0F7FA' }} // Fallback jika Tailwind purge
            >
              Platform Digital untuk UMKM
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {data.heroTitle}
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg">
              {data.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/register" 
                // Tombol "Daftar" (CTA Utama) menggunakan warna Secondary
                className="bg-[#FFAB40] text-black font-bold py-3 px-8 rounded-lg text-lg 
                           hover:bg-orange-400 transition-all duration-300
                           transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
              >
                Daftar Sekarang
              </Link>
              <Link 
                to="/simulator" 
                // Tombol "Lihat Demo" (CTA Sekunder) menggunakan outline Primer
                className="bg-transparent border-2 border-[#006064] text-[#006064] font-bold py-3 px-8 rounded-lg text-lg 
                           hover:bg-cyan-50 transition-all duration-300 text-center"
              >
                Lihat Demo
              </Link>
            </div>
          </div>
          
          {/* Kanan: Gambar (Layout dari image_276427.png) */}
          <div className="flex justify-center">
            {/* Ganti URL gambar ini dengan gambar Anda sendiri */}
            <img 
              src="https://images.unsplash.com/photo-1556761175-59736f623265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Mengembangkan Bisnis UMKM"
              className="rounded-lg shadow-2xl object-cover w-full h-full max-h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Bagian 2: Statistik (Counter) (Layout dari image_276441.png) */}
      <section ref={countUpRef} className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-extrabold text-[#006064]">{jumlahToko}+</h3>
              <p className="text-lg text-gray-600 mt-2">UMKM Aktif</p>
            </div>
            <div>
              {/* Dummy data untuk statistik lain */}
              <h3 className="text-5xl font-extrabold text-[#006064]">50K+</h3>
              <p className="text-lg text-gray-600 mt-2">Produk Terjual</p>
            </div>
            <div>
              <h3 className="text-5xl font-extrabold text-[#006064]">98%</h3>
              <p className="text-lg text-gray-600 mt-2">Kepuasan Pengguna</p>
            </div>
            <div>
              <h3 className="text-5xl font-extrabold text-[#006064]">24/7</h3>
              <p className="text-lg text-gray-600 mt-2">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian 3: Logo Cloud (Permintaan Anda ) */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-12">
            Telah Dipercaya oleh Berbagai Bisnis
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-70">
            {/* Ganti dengan URL logo klien Anda */}
            <img src="https://via.placeholder.com/150x60?text=LOGO+A" alt="Logo Klien A" className="h-12" />
            <img src="https://via.placeholder.com/150x60?text=LOGO+B" alt="Logo Klien B" className="h-12" />
            <img src="https://via.placeholder.com/150x60?text=LOGO+C" alt="Logo Klien C" className="h-12" />
            <img src="https://via.placeholder.com/150x60?text=LOGO+D" alt="Logo Klien D" className="h-12" />
            <img src="https://via.placeholder.com/150x60?text=LOGO+E" alt="Logo Klien E" className="h-12" />
          </div>
        </div>
      </section>
      
      {/* Bagian 4: Fitur Unggulan (Layout dari image_276441.png) */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Fitur Unggulan Kami</h2>
            <p className="text-lg text-gray-600">
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

      {/* Bagian 5: Testimoni (Layout dari image_276427.png) */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Apa Kata Mereka?</h2>
            <p className="text-lg text-gray-600">
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

      {/* Bagian 6: Final CTA (Layout dari image_276441.png) */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Siap Mengembangkan Bisnis Anda?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Bergabunglah dengan ribuan UMKM yang telah mempercayai Chatalog untuk
            mengembangkan bisnis mereka di dunia digital.
          </p>
          <Link 
            to="/register" 
            // Tombol CTA Utama menggunakan warna Secondary
            className="bg-[#FFAB40] text-black font-bold py-4 px-10 rounded-lg text-lg 
                       hover:bg-orange-400 transition-all duration-300
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