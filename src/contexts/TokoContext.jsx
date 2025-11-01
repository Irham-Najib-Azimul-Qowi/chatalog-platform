import { createContext } from 'react';

export const TokoContext = createContext({});

export const TokoProvider = ({ children }) => {
  return (
    <TokoContext.Provider value={{}}>
      {children}
    </TokoContext.Provider>
  );
};
