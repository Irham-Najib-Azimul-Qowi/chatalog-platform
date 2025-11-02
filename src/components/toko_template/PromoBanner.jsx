import { useState } from 'react';

/**
 * PromoBanner Component
 * Banner promo untuk menampilkan promosi dan diskon
 */
const PromoBanner = ({ promos = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // TODO: Fetch promos from Firebase
  const defaultPromos = promos.length > 0 ? promos : [
    {
      id: 1,
      judul: 'Promo Spesial',
      deskripsi: 'Dapatkan diskon hingga 50%',
      gambar: '',
    },
  ];

  const nextPromo = () => {
    setCurrentIndex((prev) => (prev + 1) % defaultPromos.length);
  };

  const prevPromo = () => {
    setCurrentIndex((prev) => (prev - 1 + defaultPromos.length) % defaultPromos.length);
  };

  if (defaultPromos.length === 0) return null;

  const currentPromo = defaultPromos[currentIndex];

  return (
    <section className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={prevPromo}
            className="px-4 py-2 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition"
            aria-label="Previous"
          >
            ←
          </button>

          <div className="flex-1 text-center mx-4">
            <h2 className="text-2xl font-bold mb-2">{currentPromo.judul}</h2>
            <p className="text-lg">{currentPromo.deskripsi}</p>
          </div>

          <button
            onClick={nextPromo}
            className="px-4 py-2 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition"
            aria-label="Next"
          >
            →
          </button>
        </div>

        {defaultPromos.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {defaultPromos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
                aria-label={`Go to promo ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PromoBanner;
