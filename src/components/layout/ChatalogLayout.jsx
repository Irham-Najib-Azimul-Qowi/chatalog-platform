import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarChatalog from './NavbarChatalog';
import FooterChatalog from './FooterChatalog';
import { db } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

// File ini sekarang bertugas memuat dan menerapkan style dinamis
function ChatalogLayout() {

  // Ambil style dari Firestore saat layout dimuat
  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const settingsDocRef = doc(db, "chatalog_content", "settings");
        const docSnap = await getDoc(settingsDocRef);

        let s; // settingsData
        if (docSnap.exists()) {
          s = docSnap.data();
        } else {
          // Jika tidak ada, gunakan data default (sesuai tema kita)
          console.warn("Dokumen 'settings' tidak ditemukan di Firestore. Menggunakan default.");
          s = {
            primaryColor: '#006064',
            secondaryColor: '#FFAB40',
            fontFamily: 'Poppins, sans-serif',
            textDark: '#212121',
            textBody: '#424242',
            backgroundLight: '#F5F5F5',
            placeholder: '#E0E0E0'
          }
        }

        // Terapkan style ini ke root dokumen (HTML)
        const root = document.documentElement;
        root.style.setProperty('--color-chatalog-primary', s.primaryColor);
        root.style.setProperty('--color-chatalog-secondary', s.secondaryColor);
        root.style.setProperty('--color-text-dark', s.textDark);
        root.style.setProperty('--color-text-body', s.textBody);
        root.style.setProperty('--color-background-light', s.backgroundLight);
        root.style.setProperty('--color-placeholder', s.placeholder);
        
        // Terapkan ke body
        document.body.style.fontFamily = s.fontFamily;
        document.body.style.color = s.textBody; // Atur warna teks default

      } catch (err) {
        console.error("Gagal memuat style dinamis:", err);
      }
    };

    fetchStyles();
  }, []); // [] = Hanya jalankan sekali saat dimuat

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarChatalog />
      {/* Kita terapkan font default ke body, 
        tapi halaman kita akan pakai class 'text-text-body' 
      */}
      <main className="flex-grow text-text-body">
        <Outlet />
      </main>
      <FooterChatalog />
    </div>
  );
}

export default ChatalogLayout;