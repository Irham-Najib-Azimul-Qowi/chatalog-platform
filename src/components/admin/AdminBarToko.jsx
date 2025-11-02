import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

/**
 * AdminBarToko Component
 * Bar admin khusus untuk owner toko
 */
const AdminBarToko = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="bg-green-600 text-white px-4 py-2 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Toko Admin Panel</span>
          <span className="text-sm opacity-90">
            {user.email || 'Owner Toko'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-3 py-1 text-sm bg-green-700 hover:bg-green-800 rounded transition"
          >
            Ke Beranda
          </button>
          
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-3 py-1 text-sm bg-green-700 hover:bg-green-800 rounded transition"
            >
              Menu Toko ▼
            </button>
            
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      // TODO: Navigate to store dashboard
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard Toko
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Navigate to products page
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Kelola Produk
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Navigate to orders page
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Order Saya
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Navigate to store settings
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Pengaturan Toko
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBarToko;
