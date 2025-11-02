import NavbarChatalog from '../../components/layout/NavbarChatalog';
import FooterChatalog from '../../components/layout/FooterChatalog';

/**
 * AboutPage Component
 * Halaman tentang platform Chatalog
 */
const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarChatalog />
      
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Tentang Chatalog</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Visi Kami</h2>
              <p className="leading-relaxed">
                Chatalog adalah platform yang memungkinkan setiap bisnis untuk membuat 
                toko online profesional dengan mudah dan cepat. Kami percaya bahwa setiap 
                bisnis, baik kecil maupun besar, berhak memiliki kehadiran online yang 
                menarik dan profesional.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Misi Kami</h2>
              <p className="leading-relaxed">
                Menyediakan solusi e-commerce yang mudah digunakan, terjangkau, dan 
                lengkap untuk membantu bisnis berkembang di era digital. Kami berkomitmen 
                untuk terus meningkatkan fitur dan layanan kami sesuai kebutuhan pasar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Mengapa Pilih Chatalog?</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Mudah digunakan, tidak perlu pengetahuan teknis</li>
                <li>Template profesional yang siap digunakan</li>
                <li>Dukungan pelanggan yang responsif</li>
                <li>Harga yang terjangkau untuk semua kalangan</li>
                <li>Fitur lengkap untuk mengelola toko online</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <FooterChatalog />
    </div>
  );
};

export default AboutPage;
