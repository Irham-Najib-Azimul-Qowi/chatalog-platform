import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// Halaman Kontak (Redesign v3)
function ContactPage() {

  const contactData = {
    email: "admin@chatalog.com",
    phone: "+62 123 456 789",
    address: "Madiun, Jawa Timur, Indonesia"
  };

  return (
    <div className="bg-white min-h-[70vh] flex items-center py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Kolom Kiri: Info Kontak */}
          <div>
            <h1 className="text-5xl font-extrabold text-text-dark mb-6">
              Hubungi Kami
            </h1>
            <p className="text-lg text-text-body leading-relaxed mb-10">
              Punya pertanyaan tentang fitur, harga, atau butuh demo?
              Jangan ragu untuk mengirimkan pesan kepada kami.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <FaPhone className="text-3xl text-chatalog-primary mr-5" />
                <div>
                  <h4 className="text-lg font-bold text-text-dark">Telepon</h4>
                  <span className="text-lg text-text-body">{contactData.phone}</span>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-3xl text-chatalog-primary mr-5" />
                <div>
                  <h4 className="text-lg font-bold text-text-dark">Email</h4>
                  <span className="text-lg text-text-body">{contactData.email}</span>
                </div>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-3xl text-chatalog-primary mr-5 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-text-dark">Alamat</h4>
                  <span className="text-lg text-text-body">{contactData.address}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Kolom Kanan: Form */}
          <div className="bg-background-light p-8 rounded-xl shadow-xl border border-gray-200">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-text-body mb-2">Nama Anda</label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm 
                             focus:ring-2 focus:ring-chatalog-primary focus:border-chatalog-primary" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-text-body mb-2">Email Anda</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="Masukkan email Anda"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm 
                             focus:ring-2 focus:ring-chatalog-primary focus:border-chatalog-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-text-body mb-2">Pesan</label>
                <textarea 
                  id="message"
                  rows="5" 
                  placeholder="Tuliskan pesan Anda di sini..."
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm 
                             focus:ring-2 focus:ring-chatalog-primary focus:border-chatalog-primary"
                ></textarea>
              </div>
              <button 
                type="submit" 
                // Tombol dengan warna Primer Chatalog
                className="w-full bg-chatalog-primary text-white font-bold py-3 px-6 rounded-lg 
                           hover:opacity-80 transition-all duration-300"
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