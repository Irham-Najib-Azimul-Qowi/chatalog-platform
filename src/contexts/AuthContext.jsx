import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"; // Pastikan ini diimpor
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true); // <-- Perbaikan Cacat #7: Set loading saat auth berubah
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setCurrentUser(user);
          setUserData(userDocSnap.data());
        } else {
          console.warn("User ada di Auth tapi belum ada di Firestore (Mungkin sedang mendaftar?)");
          setCurrentUser(user);
          setUserData(null);
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Perbaikan Cacat #5: Fungsi untuk merefresh data user
  const refreshUserData = async (uid) => {
    if (!uid) return;
    
    console.log("AuthContext: Merefresh data user secara manual...");
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      setUserData(userDocSnap.data());
    } else {
      console.error("refreshUserData: Gagal menemukan dokumen user.");
    }
  };

  // --- PERBAIKAN CACAT #1 DIMULAI DI SINI ---
  const login = (phone, password) => {
    const email = `${phone}@chatalog.com`;
    // Fungsi ini sekarang DIISI dengan logic Firebase
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    // Fungsi ini sekarang DIISI dengan logic Firebase
    return signOut(auth);
  };
  // --- PERBAIKAN CACAT #1 SELESAI ---

  const value = {
    currentUser,
    userData,
    loading,
    login, // Sekarang berisi fungsi asli
    logout, // Sekarang berisi fungsi asli
    refreshUserData // Diekspor untuk dipakai RegisterPage
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};