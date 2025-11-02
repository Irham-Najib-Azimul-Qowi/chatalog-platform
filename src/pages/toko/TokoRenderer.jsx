import { useParams, Routes, Route } from 'react-router-dom';
import TokoHomepage from './TokoHomepage';
import TokoProdukPage from './TokoProdukPage';
import TokoLokasiPage from './TokoLokasiPage';

/**
 * TokoRenderer Component
 * Renderer utama untuk halaman toko klien
 * Menangani routing untuk semua halaman toko berdasarkan slug
 */
const TokoRenderer = () => {
  const { slug } = useParams();

  // TODO: Fetch toko data based on slug from Firebase
  // const tokoData = useToko(slug);

  return (
    <div className="min-h-screen">
      {/* TODO: Add NavbarToko and FooterToko based on toko data */}
      
      <Routes>
        <Route path="/" element={<TokoHomepage />} />
        <Route path="/produk" element={<TokoProdukPage />} />
        <Route path="/lokasi" element={<TokoLokasiPage />} />
      </Routes>
      
      {/* TODO: Add FooterToko */}
    </div>
  );
};

export default TokoRenderer;
