import LokasiSection from '../../components/toko_template/LokasiSection';

/**
 * TokoLokasiPage Component
 * Halaman lokasi untuk toko klien
 */
const TokoLokasiPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Lokasi Toko</h1>
        <LokasiSection />
      </div>
    </div>
  );
};

export default TokoLokasiPage;
