import { useState } from 'react';
import NavbarChatalog from '../../components/layout/NavbarChatalog';
import FooterChatalog from '../../components/layout/FooterChatalog';

/**
 * SimulatorPage Component
 * Halaman simulator untuk preview toko
 */
const SimulatorPage = () => {
  const [slug, setSlug] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handlePreview = () => {
    if (slug.trim()) {
      setPreviewUrl(`/toko/${slug}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarChatalog />
      
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Simulator Toko</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <p className="text-gray-600 mb-6">
              Coba simulator untuk melihat bagaimana toko online Anda akan terlihat.
              Masukkan slug toko yang ingin Anda preview.
            </p>

            <div className="flex gap-4">
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="contoh: toko-saya"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handlePreview()}
              />
              <button
                onClick={handlePreview}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Preview
              </button>
            </div>

            {previewUrl && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  Preview URL:
                </p>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {window.location.origin}{previewUrl}
                </a>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Cara Menggunakan Simulator</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Masukkan slug toko yang ingin Anda preview</li>
              <li>Klik tombol "Preview" atau tekan Enter</li>
              <li>Buka link yang muncul di tab baru untuk melihat preview</li>
              <li>Gunakan simulator ini untuk menguji tampilan toko sebelum publish</li>
            </ol>
          </div>
        </div>
      </main>

      <FooterChatalog />
    </div>
  );
};

export default SimulatorPage;
