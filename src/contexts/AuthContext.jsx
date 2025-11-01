import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase'; // Impor dari firebase.js
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// 1. Buat Konteksnya
export const AuthContext = createContext(null);

// 2. Buat "Provider" (Penyedia) Konteks
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'superadmin' atau 'toko_admin'
  const [loading, setLoading] = useState(true); // Status loading untuk cek auth

  // 3. Listener (Pendengar) Otomatis dari Firebase
  // Ini akan otomatis berjalan saat aplikasi dimuat & saat ada login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Pengguna baru saja login
        // Ambil data peran (role) mereka dari Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setCurrentUser(user);
          setUserRole(userData.role); // Simpan peran (role)
        } else {
          // Kasus aneh: user ada di Auth tapi tidak ada di database
          console.error("User tidak ditemukan di Firestore!");
          setCurrentUser(null);
          setUserRole(null);
        }
      } else {
        // Pengguna baru saja logout
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false); // Selesai loading
    });

    // Cleanup listener saat komponen dibongkar
    return () => unsubscribe();
  }, []);

  // 4. Fungsi Login (Kita pakai Email/Password untuk No. Telp)
  // Firebase Auth menggunakan "email" sebagai ID unik, tapi kita bisa
  // "menipunya" dengan memasukkan nomor telepon sebagai email.
  // Format: 123456789@chatalog.com (Kita akan tambahkan @chatalog.com otomatis)
  const login = (phone, password) => {
    // Ubah nomor telepon menjadi format email
    const email = `${phone}@chatalog.com`; // Trik agar bisa pakai No. Telp
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 5. Fungsi Logout
  const logout = () => {
    return signOut(auth);
  };

  // 6. Nilai yang akan dibagikan ke seluruh aplikasi
  const value = {
    currentUser,
    userRole,
    loading,
    login,
    logout
  };

  // 7. Render children (aplikasi kita)
  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Tampilkan aplikasi HANYA jika loading auth selesai */}
    </AuthContext.Provider>
  );
};