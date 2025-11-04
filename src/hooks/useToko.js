import { useContext } from 'react';
import TokoContext from '../contexts/TokoContext';

export const useToko = () => {
  const context = useContext(TokoContext);

  if (context === undefined) {
    throw new Error('useToko harus digunakan di dalam TokoProvider');
  }

  const { 
    loading, error, info, settings, features, produk, ui,
    openAdminModal, closeAdminModal
  } = context;

  return { 
    loading, error, info, settings, features, produk, ui,
    openAdminModal, closeAdminModal
  };
};