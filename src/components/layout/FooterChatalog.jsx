import { Link } from 'react-router-dom';

/**
 * FooterChatalog Component
 * Footer untuk halaman-halaman Chatalog
 */
const FooterChatalog = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tentang Chatalog</h3>
            <p className="text-gray-400 text-sm">
              Platform toko online profesional untuk bisnis Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-gray-400 hover:text-white transition">
                  Tentang
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-gray-400 hover:text-white transition">
                  Kontak
                </Link>
              </li>
              <li>
                <Link to="/simulator" className="text-gray-400 hover:text-white transition">
                  Simulator
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Bantuan</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Panduan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@chatalog.com</li>
              <li>Telepon: +62 812-3456-7890</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Chatalog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterChatalog;
