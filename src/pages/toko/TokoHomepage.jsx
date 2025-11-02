import HeroSection from '../../components/toko_template/HeroSection';
import PromoBanner from '../../components/toko_template/PromoBanner';
import ProductCard from '../../components/toko_template/ProductCard';

/**
 * TokoHomepage Component
 * Halaman beranda untuk toko klien
 */
const TokoHomepage = () => {
  // TODO: Fetch products and promo data from Firebase
  const sampleProducts = [
    // Placeholder data
    { id: 1, nama: 'Produk 1', harga: 50000, gambar: '' },
    { id: 2, nama: 'Produk 2', harga: 75000, gambar: '' },
    { id: 3, nama: 'Produk 3', harga: 100000, gambar: '' },
  ];

  return (
    <div>
      <HeroSection />
      
      <PromoBanner />

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Produk Kami</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* TODO: Add more sections like testimonials, about, etc. */}
    </div>
  );
};

export default TokoHomepage;
