import { useContext } from 'react';
import { TokoContext } from '../contexts/TokoContext';

const useToko = () => {
  const context = useContext(TokoContext);

  if (context === undefined) {
    throw new Error('useToko must be used within a TokoProvider');
  }

  return context;
};

export default useToko;
