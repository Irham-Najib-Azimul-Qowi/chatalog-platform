import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../services/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Spinner from '../../components/common/Spinner';

// Halaman untuk menampilkan portofolio toko klien (Redesign v3)
function TokoListPage() {
  const [tokos, setTokos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTokos = async () => {
      setLoading(true);
      setError('');
      try {
        const tokosRef = collection(db, "tokos");
        const q = query(tokosRef, where("status", "==", "active"));
        const querySnapshot = await getDocs(q);
        const tokosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTokos(tokosList);
      } catch (err) {
        console.error("Error fetching tokos:", err);
        setError("Gagal memuat daftar toko.");
      }
      setLoading(false);
    };
    fetchTokos();
  }, []);

  // Komponen Card Toko (Internal)
  const TokoCard = ({ toko }) => {
    const tokoUrl = toko.customDomain ? `http://${toko.customDomain}` : `/toko/${toko.slug}`;
    
    return (
      <Link
        to={tokoUrl}
        target={toko.customDomain ? '_blank' : '_self'}
        rel={toko.customDomain ? 'noopener noreferrer' : ''}
        className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col 
                   transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 group"
      >
        {/* Placeholder Gambar Toko (Warna) */}
        <div className="h-48 flex items-center justify-center bg-placeholder">
          {toko.logoUrl ? (
            <img src={toko.logoUrl} alt={`Logo ${toko.name}`} className="h-24 w-24 object-contain rounded-full bg-white p-2 shadow-md" />
          ) : (
            <span className="text-5xl font-bold text-gray-500">
              {toko.name ? toko.name.charAt(0).toUpperCase() : '?'}
            </span>
          )}
        </div>
        
        {/* Bagian Bawah Card (Info) */}
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-text-dark mb-2 truncate" title={toko.name}>
            {toko.name}
          </h3>
          <p className="text-text-body text-sm mb-4 capitalize">
            {toko.categories?.join(', ') || 'UMKM'}
          </p>
          
          {/* Tombol Aksi (Ganti warna saat di-hover) */}
          <div className="mt-auto">
            <span 
              className="inline-block bg-gray-100 text-chatalog-primary font-bold py-2 px-5 rounded-md 
                         transition-colors duration-300 group-hover:bg-chatalog-secondary group-hover:text-black"
            >
              Kunjungi Toko
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    // Latar belakang halaman menggunakan 'bg-background-light'
    <div className="bg-background-light min-h-[70vh]">
      <div className="container mx-auto px-6 py-16">
        
        {/* Header Halaman */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-text-dark mb-4">
            Toko-Toko Kebanggaan Kami
          </h1>
          <p className="text-lg text-text-body leading-relaxed">
            Jelajahi berbagai UMKM yang telah mempercayai platform Chatalog
            untuk go-digital.
          </p>
        </div>

        {/* Konten (Grid Card) */}
        <div className="mt-16">
          {loading && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tokos.length === 0 && <p className="text-center col-span-4 text-text-body">Belum ada toko yang aktif.</p>}
              
              {tokos.map(toko => (
                <TokoCard key={toko.id} toko={toko} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TokoListPage;