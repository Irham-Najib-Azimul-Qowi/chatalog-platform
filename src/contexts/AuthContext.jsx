import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase'; // Impor dari firebase.js
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// 1. Buat Konteksnya
export const AuthContext = createContext(null);

// 2. Buat "Provider" (Penyedia) Konteks
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // Menyimpan data user (role, tokoId)
  const [loading, setLoading] = useState(true); // Status loading untuk cek auth

  // 3. Listener (Pendengar) Otomatis dari Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Pengguna baru saja login
        // Ambil data peran (role) mereka dari Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const dbUserData = userDocSnap.data();
          setCurrentUser(user);
          setUserData(dbUserData); // Simpan semua data (role, name, tokoId)
        } else {
          console.error("User tidak ditemukan di Firestore!");
          setCurrentUser(null);
          setUserData(null);
        }
      } else {
        // Pengguna baru saja logout
        setCurrentUser(null);
        setUserData(null);
      }
      setLoading(false); // Selesai loading
    });

    // Cleanup listener
    return () => unsubscribe();
  }, []);

  // 4. Fungsi Login (Kita pakai Email/Password untuk No. Telp)
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
    userData, // Kirim role, tokoId, dll.
    loading,
    login,
    logout
  };

  // 7. Render children (aplikasi kita)
  return (
    <AuthContext.Provider value={value}>
      {children} {/* Jangan blok render, biarkan AppLoading yg urus */}
    </AuthContext.Provider>
  );
};