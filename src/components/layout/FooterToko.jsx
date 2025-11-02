/**
 * FooterToko Component
 * Footer untuk halaman toko klien
 */
const FooterToko = ({ tokoData = null }) => {
  const namaToko = tokoData?.namaToko || 'Toko';
  const mediaSocial = tokoData?.mediaSocial || {};

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Toko */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{namaToko}</h3>
            {tokoData?.deskripsi && (
              <p className="text-gray-400 text-sm">
                {tokoData.deskripsi}
              </p>
            )}
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {tokoData?.email && <li>Email: {tokoData.email}</li>}
              {tokoData?.telepon && <li>Telepon: {tokoData.telepon}</li>}
              {tokoData?.alamat && <li>Alamat: {tokoData.alamat}</li>}
            </ul>
          </div>

          {/* Social Media */}
          {(mediaSocial.instagram || mediaSocial.facebook || mediaSocial.twitter) && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Media Sosial</h3>
              <div className="flex space-x-4">
                {mediaSocial.instagram && (
                  <a
                    href={`https://instagram.com/${mediaSocial.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                    aria-label="Instagram"
                  >
                    Instagram
                  </a>
                )}
                {mediaSocial.facebook && (
                  <a
                    href={mediaSocial.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                    aria-label="Facebook"
                  >
                    Facebook
                  </a>
                )}
                {mediaSocial.twitter && (
                  <a
                    href={`https://twitter.com/${mediaSocial.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                    aria-label="Twitter"
                  >
                    Twitter
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {namaToko}. All rights reserved.</p>
          <p className="mt-2">Powered by Chatalog</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterToko;
