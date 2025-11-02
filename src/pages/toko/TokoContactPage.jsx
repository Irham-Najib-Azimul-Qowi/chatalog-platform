import { useState } from 'react';

/**
 * TokoContactPage Component
 * Halaman kontak untuk toko klien
 */
const TokoContactPage = ({ tokoData = null }) => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    subjek: '',
    pesan: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement contact form submission to Firebase
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ nama: '', email: '', telepon: '', subjek: '', pesan: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Hubungi Kami</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Informasi Kontak</h2>
            <div className="space-y-4">
              {tokoData?.email && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Email</h3>
                  <p className="text-gray-600">
                    <a href={`mailto:${tokoData.email}`} className="hover:text-blue-600">
                      {tokoData.email}
                    </a>
                  </p>
                </div>
              )}

              {tokoData?.telepon && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Telepon</h3>
                  <p className="text-gray-600">
                    <a href={`tel:${tokoData.telepon}`} className="hover:text-blue-600">
                      {tokoData.telepon}
                    </a>
                  </p>
                </div>
              )}

              {tokoData?.alamat && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Alamat</h3>
                  <p className="text-gray-600">{tokoData.alamat}</p>
                </div>
              )}

              {/* Social Media */}
              {tokoData?.mediaSocial && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Media Sosial</h3>
                  <div className="flex gap-4">
                    {tokoData.mediaSocial.instagram && (
                      <a
                        href={`https://instagram.com/${tokoData.mediaSocial.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Instagram
                      </a>
                    )}
                    {tokoData.mediaSocial.facebook && (
                      <a
                        href={tokoData.mediaSocial.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Facebook
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Kirim Pesan</h2>
            
            {submitted && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                Terima kasih! Pesan Anda telah terkirim.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telepon
                  </label>
                  <input
                    type="tel"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subjek
                </label>
                <input
                  type="text"
                  name="subjek"
                  value={formData.subjek}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pesan
                </label>
                <textarea
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokoContactPage;

