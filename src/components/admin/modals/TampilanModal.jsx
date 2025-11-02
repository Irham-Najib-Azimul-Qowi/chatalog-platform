import { useState } from 'react';

/**
 * TampilanModal Component
 * Modal untuk mengelola tampilan dan pengaturan template toko
 */
const TampilanModal = ({ isOpen, onClose, onSave, data = null }) => {
  const [formData, setFormData] = useState({
    tema: data?.tema || 'default',
    warnaPrimer: data?.warnaPrimer || '#3B82F6',
    warnaSekunder: data?.warnaSekunder || '#1E40AF',
    logo: data?.logo || '',
    favicon: data?.favicon || '',
    fontFamily: data?.fontFamily || 'inter',
    layout: data?.layout || 'standard',
    tampilkanKategori: data?.tampilkanKategori ?? true,
    tampilkanTestimoni: data?.tampilkanTestimoni ?? true,
    tampilkanChat: data?.tampilkanChat ?? true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement save logic
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Pengaturan Tampilan</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Tema & Layout */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tema
                </label>
                <select
                  name="tema"
                  value={formData.tema}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="default">Default</option>
                  <option value="minimal">Minimal</option>
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Layout
                </label>
                <select
                  name="layout"
                  value={formData.layout}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="standard">Standard</option>
                  <option value="wide">Wide</option>
                  <option value="narrow">Narrow</option>
                </select>
              </div>
            </div>

            {/* Warna */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna Primer
                </label>
                <input
                  type="color"
                  name="warnaPrimer"
                  value={formData.warnaPrimer}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna Sekunder
                </label>
                <input
                  type="color"
                  name="warnaSekunder"
                  value={formData.warnaSekunder}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>
            </div>

            {/* Font */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Family
              </label>
              <select
                name="fontFamily"
                value={formData.fontFamily}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="inter">Inter</option>
                <option value="roboto">Roboto</option>
                <option value="poppins">Poppins</option>
                <option value="opensans">Open Sans</option>
              </select>
            </div>

            {/* Logo & Favicon */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Logo
                </label>
                <input
                  type="url"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Favicon
                </label>
                <input
                  type="url"
                  name="favicon"
                  value={formData.favicon}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Opsi Tampilan */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">Opsi Tampilan</h3>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="tampilkanKategori"
                  id="tampilkanKategori"
                  checked={formData.tampilkanKategori}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="tampilkanKategori" className="ml-2 text-sm text-gray-700">
                  Tampilkan Kategori
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="tampilkanTestimoni"
                  id="tampilkanTestimoni"
                  checked={formData.tampilkanTestimoni}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="tampilkanTestimoni" className="ml-2 text-sm text-gray-700">
                  Tampilkan Testimoni
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="tampilkanChat"
                  id="tampilkanChat"
                  checked={formData.tampilkanChat}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="tampilkanChat" className="ml-2 text-sm text-gray-700">
                  Tampilkan Chat Widget
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TampilanModal;
