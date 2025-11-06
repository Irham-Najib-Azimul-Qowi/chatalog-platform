import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { 
  FaHome, FaStore, FaInfoCircle, FaPhone, FaPalette, FaParagraph, FaAngleLeft, FaCog, 
  FaImage, FaAd, FaUserFriends, FaCheckSquare
} from 'react-icons/fa';

// Komponen Card Navigasi Utama
const NavCard = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-3 text-center
               bg-white hover:bg-gray-100 border border-gray-200 
               rounded-lg shadow-sm transition-all duration-200"
  >
    <Icon className="text-3xl text-chatalog-primary mb-2" />
    <span className="text-xs font-semibold text-text-dark">{label}</span>
  </button>
);

// Komponen Card Pengaturan Submenu (untuk toggle halaman opsional)
const SettingCard = ({ icon: Icon, label, description, isActive, onToggle, isPermanent = false }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
    <Icon className="text-3xl text-chatalog-primary flex-shrink-0" />
    <div className="flex-grow">
      <h3 className="font-semibold text-text-dark">{label}</h3>
      <p className="text-sm text-text-body">{description}</p>
    </div>
    {!isPermanent && (
      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
        <input 
          type="checkbox" 
          checked={isActive} 
          onChange={onToggle} 
          className="sr-only peer" 
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-chatalog-primary"></div>
      </label>
    )}
  </div>
);

// Helper untuk Input Form
const FormInput = ({ label, name, value, onChange, placeholder = "" }) => (
  <div>
    <label className="block text-sm font-bold text-text-body mb-2">{label}</label>
    <input 
      type="text" 
      name={name} 
      value={value} 
      onChange={onChange} 
      className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-chatalog-primary"
      placeholder={placeholder}
    />
  </div>
);

// Helper untuk Textarea Form
const FormTextarea = ({ label, name, value, onChange, rows = 3 }) => (
  <div>
    <label className="block text-sm font-bold text-text-body mb-2">{label}</label>
    <textarea 
      name={name} 
      rows={rows}
      value={value} 
      onChange={onChange} 
      className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-chatalog-primary"
    ></textarea>
  </div>
);

// Helper untuk Color Picker
const ColorInput = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-bold text-text-body mb-2">{label}</label>
    <div className="flex items-center space-x-2">
      <HexColorPicker 
        color={value} 
        onChange={(color) => onChange({ target: { name, value: color }})} 
        className="!w-full my-2"
      />
    </div>
     <input 
        type="text" 
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-chatalog-primary"
      />
  </div>
);


// Ini adalah Form di Toolbar Kiri
function ContentEditorToolbar({ liveData, setLiveData, onSave, isSaving, error, success, setPreviewPage }) {
  
  const [activeSection, setActiveSection] = useState('main');

  // Handle perubahan form (dipakai oleh semua input)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setLiveData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };

  // Komponen Header Submenu (dengan tombol Back)
  const SubmenuHeader = ({ title }) => (
    <div className="p-4 border-b bg-white flex items-center shadow-sm sticky top-0 z-10">
      <button 
        onClick={() => setActiveSection('main')} 
        className="mr-3 p-2 rounded-full hover:bg-gray-100"
      >
        <FaAngleLeft className="text-gray-600 text-lg" />
      </button>
      <h2 className="text-xl font-bold text-text-dark capitalize">{title}</h2>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-background-light">
      
      {/* ================================================== */}
      {/* TAMPILAN MENU UTAMA (KARTU NAVIGASI)             */}
      {/* ================================================== */}
      {activeSection === 'main' && (
        <>
          <div className="p-4 border-b bg-white">
            <h2 className="text-xl font-bold text-text-dark">Editor Konten Chatalog</h2>
          </div>
          {/* Layout Toolbar: Horizontal di HP (flex-row), Vertikal di Desktop (md:flex-col) */}
          <div className="flex flex-row md:flex-col p-4 space-x-3 md:space-x-0 md:space-y-3 overflow-x-auto md:overflow-y-auto">
            {/* Untuk layout mobile (flex-row), kita buat card lebih kecil
              Untuk desktop (md:flex-col), kita buat card lebih besar
            */}
            <div className="flex-shrink-0 w-24 md:w-full">
              <NavCard 
                icon={FaHome} 
                label="Homepage" 
                onClick={() => { setActiveSection('homepage'); setPreviewPage('homepage'); }} 
              />
            </div>
            <div className="flex-shrink-0 w-24 md:w-full">
              <NavCard 
                icon={FaStore} 
                label="Toko" 
                onClick={() => { setActiveSection('toko'); setPreviewPage('toko'); }} 
              />
            </div>
            <div className="flex-shrink-0 w-24 md:w-full">
              <NavCard 
                icon={FaInfoCircle} 
                label="Tentang" 
                onClick={() => { setActiveSection('tentang'); setPreviewPage('tentang'); }} 
              />
            </div>
            <div className="flex-shrink-0 w-24 md:w-full">
              <NavCard 
                icon={FaPhone} 
                label="Kontak" 
                onClick={() => { setActiveSection('kontak'); setPreviewPage('kontak'); }} 
              />
            </div>
            <div className="flex-shrink-0 w-24 md:w-full">
              <NavCard 
                icon={FaParagraph} 
                label="Footer" 
                onClick={() => { setActiveSection('footer'); }} 
              />
            </div>
             <div className="flex-shrink-0 w-24 md:w-full">
              <NavCard 
                icon={FaPalette} 
                label="Tema Warna" 
                onClick={() => { setActiveSection('color'); }} 
              />
            </div>
            <div className="flex-shrink-0 w-24 md:w-full">
              <NavCard 
                icon={FaCog} 
                label="Pengaturan" 
                onClick={() => { setActiveSection('settings'); }} 
              />
            </div>
          </div>
        </>
      )}

      {/* ================================================== */}
      {/* SUBMENU PENGATURAN (Muncul saat Card diklik)     */}
      {/* ================================================== */}
      <div className="flex-grow overflow-y-auto">
        
        {/* === Submenu: Pengaturan Homepage === */}
        {activeSection === 'homepage' && (
          <div className="flex flex-col h-full">
            <SubmenuHeader title="Pengaturan Homepage" />
            <div className="p-4 space-y-6">
              <SettingCard 
                icon={FaHome} 
                label="Halaman Homepage" 
                description="Halaman utama website Anda." 
                isActive={true} isPermanent={true}
              />
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 space-y-4">
                <h3 className="font-bold text-text-dark text-lg">Hero Section (Konten Teratas)</h3>
                {/* TODO: Pengaturan Gambar Hero (Full width / Split) */}
                <FormInput label="Judul Hero" name="heroTitle" value={liveData.heroTitle} onChange={handleChange} />
                <FormTextarea label="Subjudul Hero" name="heroSubtitle" value={liveData.heroSubtitle} onChange={handleChange} />
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 space-y-4">
                <h3 className="font-bold text-text-dark text-lg">Kisah Kami Section</h3>
                {/* TODO: Toggle untuk sembunyikan bagian ini */}
                <FormTextarea label="Teks Kisah Kami" name="storyText" value={liveData.storyText} onChange={handleChange} />
              </div>
              {/* TODO: Konten dinamis untuk promosi, statistik, logo klien */}
            </div>
          </div>
        )}

        {/* === Submenu: Pengaturan Toko === */}
        {activeSection === 'toko' && (
          <div className="flex flex-col h-full">
            <SubmenuHeader title="Pengaturan Toko" />
            <div className="p-4 space-y-4">
              <SettingCard 
                icon={FaStore} 
                label="Halaman Toko" 
                description="Menampilkan portofolio toko dari mitra Anda." 
                isActive={liveData.showTokoPage}
                onToggle={() => handleChange({ target: { name: 'showTokoPage', type: 'checkbox', checked: !liveData.showTokoPage }})}
              />
              {/* TODO: Tambahkan pengaturan untuk Halaman Toko di sini */}
            </div>
          </div>
        )}

        {/* === Submenu: Pengaturan Tentang Kami === */}
        {activeSection === 'tentang' && (
          <div className="flex flex-col h-full">
            <SubmenuHeader title="Pengaturan Tentang Kami" />
            <div className="p-4 space-y-4">
              <SettingCard 
                icon={FaInfoCircle} 
                label="Halaman Tentang Kami" 
                description="Informasi tentang perusahaan Anda." 
                isActive={liveData.showAboutPage}
                onToggle={() => handleChange({ target: { name: 'showAboutPage', type: 'checkbox', checked: !liveData.showAboutPage }})}
              />
              {liveData.showAboutPage && (
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 space-y-4">
                  <h3 className="font-bold text-text-dark text-lg">Konten Halaman</h3>
                  {/* TODO: Pengaturan Gambar & Posisi (Left/Right/Center) */}
                  <FormTextarea label="Teks Profil Tim" name="aboutText" value={liveData.aboutText} onChange={handleChange} rows={5} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* === Submenu: Pengaturan Kontak === */}
        {activeSection === 'kontak' && (
          <div className="flex flex-col h-full">
            <SubmenuHeader title="Pengaturan Kontak" />
            <div className="p-4 space-y-4">
              <SettingCard 
                icon={FaPhone} 
                label="Halaman Kontak" 
                description="Cara pengunjung menghubungi Anda." 
                isActive={liveData.showContactPage}
                onToggle={() => handleChange({ target: { name: 'showContactPage', type: 'checkbox', checked: !liveData.showContactPage }})}
              />
              {liveData.showContactPage && (
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 space-y-4">
                  <h3 className="font-bold text-text-dark text-lg">Informasi Kontak</h3>
                  <FormInput label="Telepon" name="contactPhone" value={liveData.contactPhone} onChange={handleChange} placeholder="0812..." />
                  <FormInput label="Email" name="contactEmail" value={liveData.contactEmail} onChange={handleChange} placeholder="admin@chatalog.com" />
                  <FormTextarea label="Alamat" name="contactAddress" value={liveData.contactAddress} onChange={handleChange} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* === Submenu: Pengaturan Footer === */}
        {activeSection === 'footer' && (
          <div className="flex flex-col h-full">
            <SubmenuHeader title="Pengaturan Footer" />
            <div className="p-4 space-y-4">
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 space-y-4">
                <h3 className="font-bold text-text-dark text-lg">Konten Footer</h3>
                <FormInput 
                  label="Teks Hak Cipta" 
                  name="footerCopyright" 
                  value={liveData.footerCopyright} 
                  onChange={handleChange} 
                />
                {/* TODO: Link Medsos, Navigasi Footer, dll */}
              </div>
            </div>
          </div>
        )}

        {/* === Submenu: Kombinasi Warna === */}
        {activeSection === 'color' && (
          <div className="flex flex-col h-full">
            <SubmenuHeader title="Kombinasi Warna" />
            <div className="p-4 space-y-6">
              <ColorInput label="Warna Primer (Navbar, Tombol, Ikon)" name="primaryColor" value={liveData.primaryColor} onChange={handleChange} />
              <ColorInput label="Warna Sekunder (Tombol CTA)" name="secondaryColor" value={liveData.secondaryColor} onChange={handleChange} />
              <ColorInput label="Warna Teks Gelap (Judul)" name="textDark" value={liveData.textDark} onChange={handleChange} />
              <ColorInput label="Warna Teks Body (Paragraf)" name="textBody" value={liveData.textBody} onChange={handleChange} />
              <ColorInput label="Warna Background Terang (Seksi)" name="backgroundLight" value={liveData.backgroundLight} onChange={handleChange} />
              <ColorInput label="Warna Placeholder (Gambar)" name="placeholder" value={liveData.placeholder} onChange={handleChange} />
            </div>
          </div>
        )}

         {/* === Submenu: Pengaturan Global === */}
         {activeSection === 'settings' && (
          <div className="flex flex-col h-full">
            <SubmenuHeader title="Pengaturan Global" />
            <div className="p-4 space-y-4">
              <h3 className="font-bold text-text-dark text-lg">Tipografi</h3>
              <FormInput label="Font Family" name="fontFamily" value={liveData.fontFamily} onChange={handleChange} placeholder="Poppins, sans-serif" />
              {/* TODO: Pengaturan ukuran font dasar */}
            </div>
          </div>
        )}
      </div>

      {/* Footer Toolbar (Tombol Simpan) */}
      <div className="p-4 border-t bg-white sticky bottom-0 z-10 shadow-inner">
        {success && <p className="text-green-500 text-sm text-center mb-2">{success}</p>}
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        <button 
          onClick={() => onSave(liveData)} // Panggil fungsi simpan dari parent
          disabled={isSaving}
          className="w-full bg-chatalog-primary text-white font-bold py-3 px-6 rounded-lg 
                     hover:opacity-80 transition-all duration-300 disabled:opacity-50"
        >
          {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  );
}

export default ContentEditorToolbar;