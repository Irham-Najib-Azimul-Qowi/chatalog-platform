import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../services/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Spinner from '../../components/common/Spinner';

// Halaman untuk menampilkan portofolio toko klien
function TokoListPage() {
  const [tokos, setTokos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTokos = async () => {
      setLoading(true);
      setError('');
      try {
        // 1. Ambil semua toko dari koleksi 'tokos'
        const tokosRef = collection(db, "tokos");
        // 2. Filter hanya toko yang statusnya "active" (sudah di-approve Super Admin)
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

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Toko-Toko Kebanggaan Kami
        </h1>
        <p className="text-lg text-gray-600">
          Jelajahi berbagai UMKM yang telah mempercayai platform Chatalog
          untuk go-digital.
        </p>
      </div>

      <div className="mt-16">
        {loading && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tokos.length === 0 && <p className="text-center col-span-3">Belum ada toko yang aktif.</p>}

            {tokos.map(toko => (
              <div key={toko.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                {/* Placeholder Gambar Toko */}
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">(Gambar Toko)</span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{toko.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 capitalize">
                    Bidang: {toko.categories?.join(', ') || 'N/A'}
                  </p>

                  {/* Tombol Aksi */}
                  <div className="mt-auto">
                    <Link 
                      // Arahkan ke halaman toko klien (Tugas Teman Anda)
                      to={`/toko/${toko.slug}`} 
                      // Gunakan warna Secondary Chatalog
                      className="inline-block bg-[#FFAB40] text-black font-bold py-2 px-5 rounded-md hover:bg-orange-400 transition-colors text-center"
                    >
                      Kunjungi Toko
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TokoListPage;