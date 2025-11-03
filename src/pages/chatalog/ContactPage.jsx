import React from 'react';

// Halaman Kontak (Chatalog)
function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Hubungi Kami</h1>
      <p className="text-lg text-gray-700 mb-8">
        Punya pertanyaan? Kami siap membantu.
      </p>
      {/* Placeholder: Nanti kita tambahkan form kontak di sini */}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nama Anda</label>
          <input type="text" className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email Anda</label>
          <input type="email" className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium">Pesan</label>
          <textarea rows="5" className="w-full mt-1 p-2 border rounded-md"></textarea>
        </div>
        <button type="submit" className="bg-[#006064] text-white font-bold py-2 px-6 rounded-md">
          Kirim
        </button>
      </form>
    </div>
  );
}

export default ContactPage;