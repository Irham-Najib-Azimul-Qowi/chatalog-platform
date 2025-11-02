import { Link } from 'react-router-dom';
import NavbarChatalog from '../../components/layout/NavbarChatalog';
import FooterChatalog from '../../components/layout/FooterChatalog';

/**
 * HomePageChatalog Component
 * Halaman beranda utama untuk platform Chatalog
 */
const HomePageChatalog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarChatalog />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6">
                Platform Toko Online untuk Bisnis Anda
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Buat toko online profesional dalam hitungan menit. 
                Kelola produk, order, dan pelanggan dengan mudah.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/register"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Daftar Sekarang
                </Link>
                <Link
                  to="/simulator"
                  className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
                >
                  Coba Simulator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Fitur Unggulan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🛍️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Kelola Produk Mudah</h3>
                <p className="text-gray-600">
                  Tambah, edit, dan kelola produk dengan interface yang intuitif
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
                <p className="text-gray-600">
                  Toko Anda otomatis responsive dan siap untuk semua perangkat
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Template Menarik</h3>
                <p className="text-gray-600">
                  Pilih dari berbagai template yang profesional dan modern
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Siap Memulai Toko Online Anda?
            </h2>
            <p className="text-gray-600 mb-8">
              Bergabunglah dengan ratusan bisnis yang sudah mempercayai Chatalog
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Daftar Gratis Sekarang
            </Link>
          </div>
        </section>
      </main>

      <FooterChatalog />
    </div>
  );
};

export default HomePageChatalog;
