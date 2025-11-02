/**
 * LokasiSection Component
 * Section untuk menampilkan lokasi toko
 */
const LokasiSection = ({ lokasiData = [] }) => {
  // TODO: Fetch lokasi from Firebase
  const defaultLokasi = lokasiData.length > 0 ? lokasiData : [
    {
      id: 1,
      nama: 'Toko Utama',
      alamat: 'Jl. Contoh No. 123',
      kota: 'Jakarta',
      provinsi: 'DKI Jakarta',
      telepon: '081234567890',
      latitude: -6.2088,
      longitude: 106.8456,
    },
  ];

  return (
    <div className="space-y-6">
      {defaultLokasi.map((lokasi) => (
        <div key={lokasi.id} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">{lokasi.nama}</h3>
          
          <div className="space-y-2 text-gray-700 mb-4">
            <p>
              <span className="font-medium">Alamat:</span> {lokasi.alamat}
            </p>
            <p>
              <span className="font-medium">Kota:</span> {lokasi.kota}, {lokasi.provinsi}
            </p>
            {lokasi.telepon && (
              <p>
                <span className="font-medium">Telepon:</span> {lokasi.telepon}
              </p>
            )}
          </div>

          {lokasi.latitude && lokasi.longitude && (
            <div className="mt-4">
              <iframe
                title={lokasi.nama}
                width="100%"
                height="300"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${lokasi.latitude},${lokasi.longitude}&output=embed`}
                allowFullScreen
              />
            </div>
          )}
        </div>
      ))}

      {defaultLokasi.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Tidak ada lokasi yang tersedia</p>
        </div>
      )}
    </div>
  );
};

export default LokasiSection;
