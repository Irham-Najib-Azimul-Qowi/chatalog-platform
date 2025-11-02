import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../common/Logo';

/**
 * NavbarChatalog Component
 * Navbar untuk halaman-halaman Chatalog
 */
const NavbarChatalog = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-bold text-blue-600">Chatalog</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Beranda
            </Link>
            <Link
              to="/tentang"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Tentang
            </Link>
            <Link
              to="/kontak"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Kontak
            </Link>
            <Link
              to="/simulator"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Simulator
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <Link
                to="/"
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarChatalog;
