import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Spinner from '../../components/common/Spinner';

// Impor Toolbar
import ContentEditorToolbar from '../../components/admin/toolbars/ContentEditorToolbar'; 
// Impor Halaman Preview
import HomePageChatalog from './HomePageChatalog';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import ShopPage from './ShopPage'; // <-- PERBAIKAN (TokoListPage dihapus dan diganti ShopPage)
import FooterChatalog from '../../components/layout/FooterChatalog';
import NavbarChatalog from '../../components/layout/NavbarChatalog';

// Halaman Editor "Canva" untuk Super Admin
function ContentEditorPage() {
  
  // State untuk data live (Style + Konten)
  const [liveData, setLiveData] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // State untuk UI Editor
  const [previewPage, setPreviewPage] = useState('homepage'); 
  const [isMobile, setIsMobile] = useState(false);

  // 1. Ambil data dari Firestore saat halaman dimuat
  const fetchAllSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const homepageDocRef = doc(db, "chatalog_content", "homepage");
      const aboutDocRef = doc(db, "chatalog_content", "about_us");
      const contactDocRef = doc(db, "chatalog_content", "contact");
      const footerDocRef = doc(db, "chatalog_content", "footer");
      const settingsDocRef = doc(db, "chatalog_content", "settings");

      const [homepageSnap, aboutSnap, contactSnap, footerSnap, settingsSnap] = await Promise.all([
        getDoc(homepageDocRef), getDoc(aboutDocRef), getDoc(contactDocRef), getDoc(footerDocRef), getDoc(settingsDocRef)
      ]);

      const loadedData = {
        // Data Konten
        heroTitle: homepageSnap.data()?.heroTitle || 'Mulai Digitalisasi Bisnis Anda',
        heroSubtitle: homepageSnap.data()?.heroSubtitle || 'Platform Chatalog dirancang...',
        storyText: homepageSnap.data()?.storyText || 'Chatalog dimulai...',
        aboutText: aboutSnap.data()?.team_profile || 'Kami adalah tim...',
        contactPhone: contactSnap.data()?.phone || '0812-3456-7890',
        contactEmail: contactSnap.data()?.email || 'halo@chatalog.com',
        contactAddress: contactSnap.data()?.address || 'Jl. Contoh No. 123',
        footerCopyright: footerSnap.data()?.copyrightText || `© ${new Date().getFullYear()} Chatalog.`,
        
        // Data Style (Warna Default Chatalog)
        primaryColor: settingsSnap.data()?.primaryColor || '#006064',
        secondaryColor: settingsSnap.data()?.secondaryColor || '#FFAB40',
        textDark: settingsSnap.data()?.textDark || '#212121',
        textBody: settingsSnap.data()?.textBody || '#424242',
        backgroundLight: settingsSnap.data()?.backgroundLight || '#F5F5F5',
        placeholder: settingsSnap.data()?.placeholder || '#E0E0E0',
        fontFamily: settingsSnap.data()?.fontFamily || 'Poppins, sans-serif',
        
        // Data Halaman Aktif
        showAboutPage: settingsSnap.data()?.showAboutPage ?? true,
        showContactPage: settingsSnap.data()?.showContactPage ?? true,
        showTokoPage: settingsSnap.data()?.showTokoPage ?? true,
      };
      
      setLiveData(loadedData);
      
    } catch (err) {
      console.error("Gagal memuat konten:", err);
      setError("Gagal memuat data");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAllSettings();
  }, [fetchAllSettings]);

  // 2. Terapkan style dinamis ke PREVIEW
  useEffect(() => {
    if (!liveData) return;
    const previewElement = document.getElementById('preview-window');
    if (!previewElement) return;

    previewElement.style.setProperty('--color-chatalog-primary', liveData.primaryColor);
    previewElement.style.setProperty('--color-chatalog-secondary', liveData.secondaryColor);
    previewElement.style.setProperty('--color-text-dark', liveData.textDark);
    previewElement.style.setProperty('--color-text-body', liveData.textBody);
    previewElement.style.setProperty('--color-background-light', liveData.backgroundLight);
    previewElement.style.setProperty('--color-placeholder', liveData.placeholder);
    previewElement.style.fontFamily = liveData.fontFamily;
    previewElement.style.color = liveData.textBody; 

  }, [liveData]);

  // 3. Fungsi Simpan (Dipanggil dari Toolbar)
  const handleSave = async (newData) => {
    setIsSaving(true);
    setError('');
    setSuccess('');
    try {
      const contentHomepage = {
        heroTitle: newData.heroTitle, heroSubtitle: newData.heroSubtitle, storyText: newData.storyText,
      };
      const contentAbout = { team_profile: newData.aboutText };
      const contentContact = { 
        phone: newData.contactPhone, email: newData.contactEmail, address: newData.contactAddress 
      };
      const contentFooter = { copyrightText: newData.footerCopyright };
      const settings = {
        primaryColor: newData.primaryColor, secondaryColor: newData.secondaryColor,
        textDark: newData.textDark, textBody: newData.textBody,
        backgroundLight: newData.backgroundLight, placeholder: newData.placeholder,
        fontFamily: newData.fontFamily, showAboutPage: newData.showAboutPage,
        showContactPage: newData.showContactPage, showTokoPage: newData.showTokoPage,
      };

      await Promise.all([
        setDoc(doc(db, "chatalog_content", "homepage"), contentHomepage, { merge: true }),
        setDoc(doc(db, "chatalog_content", "about_us"), contentAbout, { merge: true }),
        setDoc(doc(db, "chatalog_content", "contact"), contentContact, { merge: true }),
        setDoc(doc(db, "chatalog_content", "footer"), contentFooter, { merge: true }),
        setDoc(doc(db, "chatalog_content", "settings"), settings, { merge: true })
      ]);
      
      setSuccess("Perubahan berhasil disimpan!");
      setTimeout(() => setSuccess(''), 2000); 

    } catch (err) {
      console.error("Gagal menyimpan:", err);
      setError("Gagal menyimpan data");
    }
    setIsSaving(false);
  };

  if (isLoading || !liveData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  // Helper untuk merender halaman di preview
  const renderPreviewContent = () => {
    switch(previewPage) {
      case 'homepage':
        return <HomePageChatalog isPreview={true} previewData={liveData} />;
      case 'toko': // <-- PERBAIKAN
        return <ShopPage isPreview={true} previewData={liveData} />; // <-- Ganti ke ShopPage
      case 'tentang':
        return <AboutPage isPreview={true} previewData={liveData} />;
      case 'kontak':
        return <ContactPage isPreview={true} previewData={liveData} />;
      default:
        return <HomePageChatalog isPreview={true} previewData={liveData} />;
    }
  }

  return (
    // Layout utama Editor
    <div className="flex flex-col md:flex-row h-screen bg-gray-200 overflow-hidden">
      
      {/* =====================================
        TOOLBAR KIRI (Desktop) / BAWAH (Mobile)
        =====================================
      */}
      <aside className="w-full md:w-80 bg-white shadow-lg order-2 md:order-1 
                      flex-shrink-0 overflow-y-auto">
        <ContentEditorToolbar 
          liveData={liveData} 
          setLiveData={setLiveData} 
          onSave={handleSave}
          isSaving={isSaving}
          error={error}
          success={success}
          setPreviewPage={setPreviewPage}
        />
      </aside>

      {/* =====================================
        AREA PREVIEW TENGAH
        =====================================
      */}
      <main className="flex-1 flex flex-col items-center justify-center p-0 md:p-4 order-1 md:order-2 overflow-hidden">
        
        {/* Header Preview */}
        <div className="w-full max-w-7xl flex justify-between items-center mb-4 px-4 py-2 bg-white rounded-lg shadow">
           <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm text-text-dark">PREVIEW:</span>
            <button 
              onClick={() => setPreviewPage('homepage')}
              className={`p-2 rounded-md text-sm ${previewPage === 'homepage' ? 'bg-chatalog-primary/10 text-chatalog-primary' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Home
            </button>
            {liveData.showTokoPage && (
              <button 
                onClick={() => setPreviewPage('toko')} // <-- PERBAIKAN
                className={`p-2 rounded-md text-sm ${previewPage === 'toko' ? 'bg-chatalog-primary/10 text-chatalog-primary' : 'text-gray-500 hover:bg-gray-100'}`} // <-- PERBAIKAN
              >
                Toko
              </button>
            )}
            {liveData.showAboutPage && (
              <button 
                onClick={() => setPreviewPage('tentang')}
                className={`p-2 rounded-md text-sm ${previewPage === 'tentang' ? 'bg-chatalog-primary/10 text-chatalog-primary' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Tentang
              </button>
            )}
            {liveData.showContactPage && (
              <button 
                onClick={() => setPreviewPage('kontak')}
                className={`p-2 rounded-md text-sm ${previewPage === 'kontak' ? 'bg-chatalog-primary/10 text-chatalog-primary' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Kontak
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsMobile(false)}
              className={`p-2 rounded-md ${!isMobile ? 'bg-chatalog-primary/10 text-chatalog-primary' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              🖥️
            </button>
            <button 
              onClick={() => setIsMobile(true)}
              className={`p-2 rounded-md ${isMobile ? 'bg-chatalog-primary/10 text-chatalog-primary' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              📱
            </button>
          </div>
          <Link to="/" className="text-sm text-gray-600 hover:text-chatalog-primary" target="_blank" rel="noopener noreferrer">
            Buka Web Publik
          </Link>
        </div>

        {/* Jendela Preview (Wrapper) */}
        <div 
          className={`bg-white shadow-xl overflow-hidden transition-all duration-300 ${
            isMobile 
              ? 'w-[375px] h-[667px] rounded-[20px] border-8 border-gray-800' // Tampilan HP
              : 'w-full max-w-7xl h-full rounded-lg' // Tampilan Desktop
          }`}
        >
          <div id="preview-window" className="w-full h-full overflow-y-auto">
            <NavbarChatalog isPreview={true} previewData={liveData} />
            
            {renderPreviewContent()}
            
            <FooterChatalog isPreview={true} previewData={liveData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ContentEditorPage;