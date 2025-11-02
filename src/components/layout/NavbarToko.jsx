import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartModal from '../toko_template/CartModal';

/**
 * NavbarToko Component
 * Navbar untuk halaman toko klien
 */
const NavbarToko = ({ tokoData = null, cartItems = [], onCartItemUpdate }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const namaToko = tokoData?.namaToko || 'Toko';
  const logoUrl = tokoData?.logo || '';

  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              {logoUrl ? (
                <img src={logoUrl} alt={namaToko} className="h-10" />
              ) : (
                <span className="text-xl font-bold text-blue-600">{namaToko}</span>
              )}
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
                to="/produk"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Produk
              </Link>
              <Link
                to="/lokasi"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Lokasi
              </Link>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <span>🛒</span>
              <span>Keranjang</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={onCartItemUpdate}
      />
    </>
  );
};

export default NavbarToko;
