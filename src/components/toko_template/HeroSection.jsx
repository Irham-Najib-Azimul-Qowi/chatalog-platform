/**
 * HeroSection Component
 * Hero section untuk halaman beranda toko
 */
const HeroSection = ({ tokoData = null }) => {
  // TODO: Get toko data from props or context
  const namaToko = tokoData?.namaToko || 'Toko Kami';
  const deskripsi = tokoData?.deskripsi || 'Selamat datang di toko kami';
  const bannerUrl = tokoData?.banner || '';

  return (
    <section 
      className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      style={bannerUrl ? {
        backgroundImage: `url(${bannerUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : {}}
    >
      {bannerUrl && (
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      )}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">{namaToko}</h1>
        <p className="text-xl mb-8 opacity-90">{deskripsi}</p>
      </div>
    </section>
  );
};

export default HeroSection;
