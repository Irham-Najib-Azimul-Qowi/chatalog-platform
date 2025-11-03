import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ... (Fungsi onAuthStateChanged Anda tetap sama persis) ...
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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

  // --- 1. TAMBAHKAN FUNGSI BARU INI ---
  // Fungsi ini akan dipanggil manual oleh RegisterPage
  // setelah user document BERHASIL ditulis.
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
  // --- AKHIR FUNGSI BARU ---


  const login = (phone, password) => {
    // ... (fungsi login Anda) ...
  };

  const logout = () => {
    // ... (fungsi logout Anda) ...
  };

  const value = {
    currentUser,
    userData,
    loading,
    login,
    logout,
    refreshUserData // <-- 2. EKSPOR FUNGSI BARU DI SINI
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};