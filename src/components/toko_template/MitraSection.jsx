/**
 * MitraSection Component
 * Section untuk menampilkan mitra/partner toko
 */
const MitraSection = ({ mitraData = [] }) => {
  // TODO: Fetch mitra from Firebase
  const defaultMitra = mitraData.length > 0 ? mitraData : [
    {
      id: 1,
      nama: 'Mitra 1',
      jenis: 'supplier',
      logo: '',
    },
    {
      id: 2,
      nama: 'Mitra 2',
      jenis: 'distributor',
      logo: '',
    },
  ];

  if (defaultMitra.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Mitra Kami</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {defaultMitra.map((mitra) => (
            <div
              key={mitra.id}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
            >
              {mitra.logo ? (
                <img
                  src={mitra.logo}
                  alt={mitra.nama}
                  className="w-full h-24 object-contain mb-3"
                />
              ) : (
                <div className="w-full h-24 flex items-center justify-center bg-gray-100 rounded mb-3">
                  <span className="text-2xl">🏢</span>
                </div>
              )}
              <h3 className="font-semibold">{mitra.nama}</h3>
              {mitra.jenis && (
                <p className="text-sm text-gray-500 mt-1">
                  {mitra.jenis.charAt(0).toUpperCase() + mitra.jenis.slice(1)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MitraSection;
