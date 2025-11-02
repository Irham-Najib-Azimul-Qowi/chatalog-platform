import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

/**
 * AdminBar Component
 * Bar admin yang muncul di semua halaman ketika user login sebagai admin
 */
const AdminBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Check user role and show appropriate admin bar
  // For now, show admin bar if user is logged in

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
    <div className="bg-blue-600 text-white px-4 py-2 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Admin Panel</span>
          <span className="text-sm opacity-90">
            {user.email || 'User'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-3 py-1 text-sm bg-blue-700 hover:bg-blue-800 rounded transition"
          >
            Ke Beranda
          </button>
          
          {/* TODO: Add admin navigation links based on user role */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-3 py-1 text-sm bg-blue-700 hover:bg-blue-800 rounded transition"
            >
              Menu Admin ▼
            </button>
            
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      // TODO: Navigate to admin dashboard
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
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
                    Kelola Order
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Navigate to settings page
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Pengaturan
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

export default AdminBar;
