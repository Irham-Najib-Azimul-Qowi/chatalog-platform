import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * TokoBlogPage Component
 * Halaman blog untuk toko klien
 */
const TokoBlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('semua');

  // TODO: Fetch blog posts from Firebase
  const blogPosts = [
    {
      id: 1,
      judul: 'Tips Memilih Produk Terbaik',
      excerpt: 'Panduan lengkap untuk memilih produk yang sesuai kebutuhan Anda...',
      gambar: '',
      kategori: 'tips',
      tanggalPublikasi: '2024-01-15',
      slug: 'tips-memilih-produk-terbaik',
    },
    {
      id: 2,
      judul: 'Cara Merawat Produk',
      excerpt: 'Tips dan trik merawat produk agar tetap awet dan berkualitas...',
      gambar: '',
      kategori: 'tips',
      tanggalPublikasi: '2024-01-20',
      slug: 'cara-merawat-produk',
    },
    {
      id: 3,
      judul: 'Berita Terbaru',
      excerpt: 'Update terbaru dari toko kami...',
      gambar: '',
      kategori: 'berita',
      tanggalPublikasi: '2024-01-25',
      slug: 'berita-terbaru',
    },
  ];

  const categories = ['semua', 'tips', 'berita', 'promo'];

  const filteredPosts = selectedCategory === 'semua'
    ? blogPosts
    : blogPosts.filter(post => post.kategori === selectedCategory);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>

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

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Featured Image */}
                {post.gambar ? (
                  <img
                    src={post.gambar}
                    alt={post.judul}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium">
                      {post.kategori?.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(post.tanggalPublikasi).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold mb-3">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition"
                    >
                      {post.judul}
                    </Link>
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Belum ada artikel untuk kategori ini
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokoBlogPage;

