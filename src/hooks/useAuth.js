import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Ini adalah hook kustom kita
export const useAuth = () => {
  return useContext(AuthContext);
};