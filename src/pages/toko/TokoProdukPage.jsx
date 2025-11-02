import { useState } from 'react';
import ProductCard from '../../components/toko_template/ProductCard';

/**
 * TokoProdukPage Component
 * Halaman produk untuk toko klien
 */
const TokoProdukPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('semua');

  // TODO: Fetch products from Firebase based on category
  const products = [
    // Placeholder data
    { id: 1, nama: 'Produk 1', harga: 50000, kategori: 'kategori1', gambar: '' },
    { id: 2, nama: 'Produk 2', harga: 75000, kategori: 'kategori2', gambar: '' },
    { id: 3, nama: 'Produk 3', harga: 100000, kategori: 'kategori1', gambar: '' },
  ];

  const categories = ['semua', 'kategori1', 'kategori2'];

  const filteredProducts = selectedCategory === 'semua'
    ? products
    : products.filter(p => p.kategori === selectedCategory);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Semua Produk</h1>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada produk untuk kategori ini</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokoProdukPage;
