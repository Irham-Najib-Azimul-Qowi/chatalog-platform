import React from 'react';
// Impor ikon
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// Halaman Kontak (Desain Ulang)
function ContactPage() {

  // Nanti, data ini akan diambil dari Firestore
  // via SuperAdmin_ContentModal
  const contactData = {
    email: "admin@chatalog.com",
    phone: "+62 123 456 789",
    address: "Madiun, Jawa Timur, Indonesia"
  };

  return (
    <div className="bg-white min-h-[70vh] flex items-center">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Kolom Kiri: Info Kontak */}
          {/* --- PERBAIKAN: Hapus class 'prose' & 'prose-lg' --- */}
          <div className="max-w-none">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
              Hubungi Kami
            </h1>
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              Punya pertanyaan tentang fitur, harga, atau butuh demo?
              Jangan ragu untuk mengirimkan pesan kepada kami.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaPhone className="text-2xl text-[#006064] mr-4" />
                <span className="text-gray-800">{contactData.phone}</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-2xl text-[#006064] mr-4" />
                <span className="text-gray-800">{contactData.email}</span>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-2xl text-[#006064] mr-4 mt-1" />
                <span className="text-gray-800">{contactData.address}</span>
              </div>
            </div>
          </div>
          
          {/* Kolom Kanan: Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Anda</label>
                <input 
                  type="text" 
                  id="name"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#006064] focus:border-[#006064]" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Anda</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#006064] focus:border-[#006064]"
                />
              </div>
              <div>
                {/* --- PERBAIKAN: Typo </Cetak> dihapus --- */}
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Pesan</label>
                <textarea 
                  id="message"
                  rows="5" 
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#006064] focus:border-[#006064]"
                ></textarea>
              </div>
              <button 
                type="submit" 
                // Tombol dengan warna Primer Chatalog
                className="w-full bg-[#006064] text-white font-bold py-3 px-6 rounded-md 
                           hover:bg-[#004D40] transition-colors duration-300"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactPage;