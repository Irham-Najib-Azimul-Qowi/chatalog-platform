import React, { useState } from 'react';
import { useToko } from '../../../hooks/useToko';
import { updateStoreSettings } from '../../../services/firebaseFunctions';

const PaletWarna = [
    { name: 'Ungu (Default)', hex: '#4f46e5' },
    { name: 'Oranye', hex: '#ff8c00' }, // Warna yang kita uji
    { name: 'Merah', hex: '#ef4444' },
    { name: 'Hijau Laut', hex: '#10b981' },
    { name: 'Biru', hex: '#3b82f6' },
    { name: 'Pink', hex: '#ec4899' },
];

const TampilanModal = () => {
    // settings?.colors?.primary adalah jalur yang benar
    const { settings, info, closeAdminModal, features } = useToko();
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    
    // State lokal untuk form: ambil nilai yang sedang aktif dari settings
    const [warnaPrimer, setWarnaPrimer] = useState(settings?.colors?.primary || PaletWarna[0].hex);

    const tokoId = info?.tokoId; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading || !tokoId) return;
        
        setLoading(true);
        setMessage('');

        try {
            // Kita hanya perlu mengirimkan objek { colors: { primary: value } }
            const update = { colors: { primary: warnaPrimer } };
            await updateStoreSettings(tokoId, update); 
            
            setMessage('Warna berhasil diperbarui! Perubahan sudah terlihat.');
            
            // Tutup modal agar Admin bisa kembali ke Editor
            setTimeout(closeAdminModal, 1000); 

        } catch (error) {
            setMessage(`Gagal menyimpan: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold" style={{ color: settings?.colors?.primary }}>Atur Tampilan Toko</h2>
                    <button onClick={closeAdminModal} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Pemilihan Palet Warna */}
                    <div>
                        <label className="block text-lg font-semibold mb-3">Pilih Warna Primer (Aksen)</label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                            {PaletWarna.map((warna) => (
                                <button
                                    key={warna.hex}
                                    type="button"
                                    className={`h-16 rounded-lg shadow-md border-4 ${
                                        warnaPrimer === warna.hex ? 'border-gray-500 ring-2 ring-offset-2 ring-gray-400' : 'border-transparent'
                                    } transition-all duration-150`}
                                    style={{ backgroundColor: warna.hex }}
                                    onClick={() => setWarnaPrimer(warna.hex)}
                                    title={warna.name}
                                >
                                    <span className="sr-only">{warna.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Color Picker Kustom (Conditional Rendering) */}
                    {features.allow_custom_theme && ( // Cek feature flag
                        <div>
                            <label htmlFor="custom_color" className="block text-lg font-semibold mb-2">Warna Kustom Pilihan</label>
                            <input 
                                id="custom_color" 
                                type="color" 
                                value={warnaPrimer} 
                                onChange={(e) => setWarnaPrimer(e.target.value)}
                                className="w-full h-10 cursor-pointer p-0 border-none rounded-lg overflow-hidden"
                            />
                        </div>
                    )}
                    
                    {/* Tampilan Upsell jika fitur kustom terkunci tapi tombol diklik (seharusnya tombol Desain dikunci di AdminBarToko) */}
                    {!features.allow_custom_theme && (
                        <p className="p-3 bg-yellow-100 text-yellow-800 rounded-lg">
                            Fitur Color Picker Kustom terkunci. Pilih dari palet di atas.
                        </p>
                    )}

                    {/* Pesan Status */}
                    {message && (
                        <div className={`p-3 rounded-lg ${message.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {message}
                        </div>
                    )}

                    {/* Tombol Simpan */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 text-lg font-bold text-white rounded-lg transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                        style={{ backgroundColor: settings?.colors?.primary }}
                    >
                        {loading ? 'Menyimpan...' : 'Simpan Perubahan Tampilan'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TampilanModal;
