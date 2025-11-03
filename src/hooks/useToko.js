import { useContext } from 'react';
import TokoContext from '../contexts/TokoContext';

/**
 * Custom hook untuk mengakses data toko dari TokoContext.
 * * Data yang dikembalikan: 
 * { 
 * loading: boolean, 
 * error: string | null, 
 * info: object, 
 * settings: object, 
 * features: object, 
 * produk: array,
 * testimoni: array
 * }
 */
export const useToko = () => {
  const context = useContext(TokoContext);

  if (context === undefined) {
    throw new Error('useToko harus digunakan di dalam TokoProvider');
  }

  return context;
};