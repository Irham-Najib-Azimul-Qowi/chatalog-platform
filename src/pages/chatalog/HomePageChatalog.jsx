import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// --- Helper Hook untuk Animasi Counter (Tetap sama) ---
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


// Tambahkan props: { isPreview = false, previewData = {} }
function HomePageChatalog({ isPreview = false, previewData = {} }) {
  
  const JUMLAH_TOKO = 150; 
  const [count, setCount] = useState(0); 
  const countUpRef = useCountUp(JUMLAH_TOKO, setCount); 

  // --- DATA PREVIEW ---
  // Jika ini mode preview, gunakan data dari props.
  // Jika tidak (mode publik), gunakan data default (atau fetch data nanti)
  const data = isPreview ? previewData : {
    heroTitle: "Mulai Digitalisasi Bisnis Anda Hari Ini",
    storyText: "Chatalog dimulai dari sebuah visi sederhana...",
  };
  // --- AKHIR PREVIEW ---

  return (
    <>
      {/* Bagian 1: Hero Section */}
      <section 
        className="bg-gradient-to-b from-white to-gray-50 text-center py-20 md:py-32"
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            {data.heroTitle || "Mulai Digitalisasi Bisnis Anda Hari Ini"} {/* <-- Gunakan data */}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Platform Chatalog dirancang khusus untuk UMKM Indonesia. Dapatkan website
            profesional dengan editor visual yang mudah dipahami dan terintegrasi AI.
          </p>
          <Link 
            to="/register" 
            className="bg-[#FFAB40] text-black font-bold py-4 px-10 rounded-lg text-lg 
                       hover:bg-orange-400 transition-all duration-300
                       transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Daftar Sekarang
          </Link>
        </div>
      </section>

      {/* Bagian 2: Statistik (Counter) */}
      <section ref={countUpRef} className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bergabung dengan Ratusan Lainnya
          </h2>
          <div 
            className="text-7xl md:text-8xl font-extrabold text-[#006064] my-4"
          >
            {count}+
          </div>
          <p className="text-xl text-gray-600">
            Toko UMKM telah mempercayai Chatalog.
          </p>
        </div>
      </section>

      {/* Bagian 3: Logo Cloud (Portofolio) */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-12">
            Telah Dipercaya oleh Berbagai Bisnis
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-70">
            <p className="text-3xl font-bold text-gray-500">LOGO KLIEN A</p>
            <p className="text-3xl font-bold text-gray-500">LOGO KLIEN B</p>
            <p className="text-3xl font-bold text-gray-500">LOGO KLIEN C</p>
            <p className="text-3xl font-bold text-gray-500">LOGO KLIEN D</p>
            <p className="text-3xl font-bold text-gray-500">LOGO KLIEN E</p>
          </div>
        </div>
      </section>
      
      {/* Bagian 4: Kisah Chatalog */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kisah Kami</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {data.storyText || "Chatalog dimulai dari sebuah visi sederhana..."} {/* <-- Gunakan data */}
            </p>
            <Link 
              to="/tentang" 
              className="text-[#006064] hover:underline font-semibold"
            >
              Baca lebih lanjut
            </Link>
        </div>
      </section>
    </>
  );
}

export default HomePageChatalog;