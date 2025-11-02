import { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../services/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

export const TokoContext = createContext(null);

/**
 * TokoProvider Component
 * Context provider untuk data toko
 */
export const TokoProvider = ({ children, slug }) => {
  const [tokoData, setTokoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    // TODO: Implement proper slug to tokoId mapping
    // For now, assuming slug can be used directly or needs mapping
    const fetchTokoData = async () => {
      try {
        setLoading(true);
        // TODO: Query toko by slug from Firestore
        // const tokoQuery = query(collection(db, 'tokos'), where('slug', '==', slug));
        // const querySnapshot = await getDocs(tokoQuery);
        // 
        // if (!querySnapshot.empty) {
        //   const tokoDoc = querySnapshot.docs[0];
        //   setTokoData({ id: tokoDoc.id, ...tokoDoc.data() });
        // } else {
        //   setError('Toko tidak ditemukan');
        // }
        
        // Placeholder: Set sample data
        setTokoData({
          id: slug,
          namaToko: 'Toko Contoh',
          slug: slug,
          deskripsi: 'Deskripsi toko',
          logo: '',
          banner: '',
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching toko data:', err);
        setError('Gagal memuat data toko');
      } finally {
        setLoading(false);
      }
    };

    fetchTokoData();
  }, [slug]);

  const value = {
    tokoData,
    loading,
    error,
  };

  return <TokoContext.Provider value={value}>{children}</TokoContext.Provider>;
};

/**
 * Hook to use TokoContext
 */
export const useTokoContext = () => {
  const context = useContext(TokoContext);
  if (!context) {
    throw new Error('useTokoContext must be used within TokoProvider');
  }
  return context;
};
