import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext'; // 1. Impor Provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* 2. Bungkus App dengan AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);