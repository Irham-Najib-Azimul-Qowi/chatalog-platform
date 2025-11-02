import TestimoniSection from '../../components/toko_template/TestimoniSection';

/**
 * TokoAboutPage Component
 * Halaman tentang toko untuk toko klien
 */
const TokoAboutPage = ({ tokoData = null }) => {
  const namaToko = tokoData?.namaToko || 'Toko Kami';
  const deskripsi = tokoData?.deskripsi || 'Deskripsi toko akan muncul di sini';
  const visi = tokoData?.visi || 'Visi toko';
  const misi = tokoData?.misi || 'Misi toko';
  const sejarah = tokoData?.sejarah || 'Sejarah toko';

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Tentang {namaToko}</h1>
          {tokoData?.logo && (
            <img
              src={tokoData.logo}
              alt={namaToko}
              className="mx-auto h-32 w-32 object-contain mb-4"
            />
          )}
        </div>

        {/* Deskripsi */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Deskripsi</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {deskripsi}
          </p>
        </section>

        {/* Visi Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Visi</h2>
            <p className="text-gray-700 leading-relaxed">
              {visi}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Misi</h2>
            <p className="text-gray-700 leading-relaxed">
              {misi}
            </p>
          </section>
        </div>

        {/* Sejarah */}
        {sejarah && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Sejarah</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {sejarah}
            </p>
          </section>
        )}

        {/* Contact Info */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Kontak Kami</h2>
          <div className="space-y-2 text-gray-700">
            {tokoData?.email && (
              <p>
                <span className="font-medium">Email:</span> {tokoData.email}
              </p>
            )}
            {tokoData?.telepon && (
              <p>
                <span className="font-medium">Telepon:</span> {tokoData.telepon}
              </p>
            )}
            {tokoData?.alamat && (
              <p>
                <span className="font-medium">Alamat:</span> {tokoData.alamat}
              </p>
            )}
          </div>
        </section>

        {/* Testimoni */}
        <div className="mt-12">
          <TestimoniSection />
        </div>
      </div>
    </div>
  );
};

export default TokoAboutPage;

