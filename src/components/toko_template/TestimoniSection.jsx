/**
 * TestimoniSection Component
 * Section untuk menampilkan testimoni pelanggan
 */
const TestimoniSection = ({ testimoniData = [] }) => {
  // TODO: Fetch testimoni from Firebase
  const defaultTestimoni = testimoniData.length > 0 ? testimoniData : [
    {
      id: 1,
      nama: 'Pelanggan 1',
      pesan: 'Produk sangat bagus dan sesuai ekspektasi!',
      rating: 5,
      foto: '',
      tanggal: '2024-01-15',
    },
    {
      id: 2,
      nama: 'Pelanggan 2',
      pesan: 'Pelayanan sangat memuaskan, terima kasih!',
      rating: 5,
      foto: '',
      tanggal: '2024-01-20',
    },
    {
      id: 3,
      nama: 'Pelanggan 3',
      pesan: 'Harga terjangkau dan kualitas bagus.',
      rating: 4,
      foto: '',
      tanggal: '2024-01-25',
    },
  ];

  if (defaultTestimoni.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Testimoni Pelanggan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultTestimoni.map((testimoni) => (
            <div
              key={testimoni.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {/* Rating Stars */}
              <div className="mb-4">
                <div className="flex text-yellow-500 text-xl">
                  {'★'.repeat(testimoni.rating || 5)}
                  {'☆'.repeat(5 - (testimoni.rating || 5))}
                </div>
              </div>

              {/* Testimoni Message */}
              <p className="text-gray-700 mb-4 italic">
                "{testimoni.pesan}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-3">
                {testimoni.foto ? (
                  <img
                    src={testimoni.foto}
                    alt={testimoni.nama}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800">
                    {testimoni.nama}
                  </p>
                  {testimoni.tanggal && (
                    <p className="text-sm text-gray-500">
                      {new Date(testimoni.tanggal).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniSection;

