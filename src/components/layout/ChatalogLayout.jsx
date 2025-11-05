import React, { useEffect } from 'react'; // <-- Tambah useEffect
import { Outlet } from 'react-router-dom';
import NavbarChatalog from './NavbarChatalog';
import FooterChatalog from './FooterChatalog';
import { db } from '../../services/firebase'; // <-- Impor db
import { doc, getDoc } from 'firebase/firestore'; // <-- Impor getDoc

// File ini sekarang bertugas memuat dan menerapkan style dinamis
function ChatalogLayout() {

  // 1. Ambil style dari Firestore saat layout dimuat
  useEffect(() => {
    const fetchStyles = async () => {
      try {
        // Ambil dokumen 'settings' dari koleksi 'chatalog_content'
        const settingsDocRef = doc(db, "chatalog_content", "settings");
        const docSnap = await getDoc(settingsDocRef);

        let settingsData;
        if (docSnap.exists()) {
          settingsData = docSnap.data();
        } else {
          // Jika tidak ada, gunakan data default (sesuai tema kita)
          console.warn("Dokumen 'settings' tidak ditemukan di Firestore. Menggunakan default.");
          settingsData = {
            primaryColor: '#006064',
            secondaryColor: '#FFAB40',
            fontFamily: 'Poppins, sans-serif'
          }
        }

        // 2. Terapkan style ini ke root dokumen (HTML)
        const root = document.documentElement;
        root.style.setProperty('--color-chatalog-primary', settingsData.primaryColor);
        root.style.setProperty('--color-chatalog-secondary', settingsData.secondaryColor);
        document.body.style.fontFamily = settingsData.fontFamily;

      } catch (err) {
        console.error("Gagal memuat style dinamis:", err);
      }
    };

    fetchStyles();
  }, []); // [] = Hanya jalankan sekali saat dimuat

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarChatalog />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FooterChatalog />
    </div>
  );
}

export default ChatalogLayout;