import { useContext } from 'react';
import TokoContext from '../contexts/TokoContext';

/**
 * Custom hook untuk mengakses data toko dan fungsi admin dari TokoContext.
 * * * Data yang dikembalikan meliputi: 
 * { 
 * info, settings, features, produk, testimoni, ui, 
 * openAdminModal, closeAdminModal 
 * }
 */
export const useToko = () => {
  const context = useContext(TokoContext);

  if (context === undefined) {
    throw new Error('useToko harus digunakan di dalam TokoProvider');
  }

  // Destrukturisasi dan return semua nilai, termasuk fungsi admin
  const { 
    loading, error, info, settings, features, produk, testimoni, ui,
    openAdminModal, closeAdminModal
  } = context;

  return { 
    loading, error, info, settings, features, produk, testimoni, ui,
    openAdminModal, closeAdminModal
  };
};