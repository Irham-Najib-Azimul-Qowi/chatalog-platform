import { useState } from 'react';

/**
 * TokoGaleriPage Component
 * Halaman galeri foto untuk toko klien
 */
const TokoGaleriPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('semua');

  // TODO: Fetch gallery images from Firebase
  const galleryImages = [
    {
      id: 1,
      judul: 'Foto Produk 1',
      gambar: '',
      kategori: 'produk',
      deskripsi: 'Deskripsi foto produk',
    },
    {
      id: 2,
      judul: 'Foto Kegiatan 1',
      gambar: '',
      kategori: 'kegiatan',
      deskripsi: 'Deskripsi kegiatan',
    },
    {
      id: 3,
      judul: 'Foto Fasilitas 1',
      gambar: '',
      kategori: 'fasilitas',
      deskripsi: 'Deskripsi fasilitas',
    },
    {
      id: 4,
      judul: 'Foto Produk 2',
      gambar: '',
      kategori: 'produk',
      deskripsi: 'Deskripsi foto produk',
    },
  ];

  const categories = ['semua', 'produk', 'kegiatan', 'fasilitas'];

  const filteredImages = selectedCategory === 'semua'
    ? galleryImages
    : galleryImages.filter(img => img.kategori === selectedCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Galeri</h1>

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

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition"
                onClick={() => openModal(image)}
              >
                {image.gambar ? (
                  <img
                    src={image.gambar}
                    alt={image.judul}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl">🖼️</span>
                  </div>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    {image.judul}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Belum ada gambar untuk kategori ini
            </p>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div
              className="max-w-4xl w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage.gambar ? (
                <img
                  src={selectedImage.gambar}
                  alt={selectedImage.judul}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <span className="text-6xl">🖼️</span>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {selectedImage.judul}
                </h3>
                {selectedImage.deskripsi && (
                  <p className="text-gray-600">{selectedImage.deskripsi}</p>
                )}
                <button
                  onClick={closeModal}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokoGaleriPage;

