import React, { useState } from 'react';
import { useToko } from '../../../hooks/useToko';
import { updateStoreInfo } from '../../../services/firebaseFunctions';

const ProfilModal = () => {
    const { info, closeAdminModal, settings } = useToko();
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    
    // State lokal untuk form: name, slogan, dan deskripsi singkat
    const [formData, setFormData] = useState({
        name: info.name || '',
        slug: info.slug || '', // Hanya untuk tampilan, tidak bisa diedit
        deskripsi_singkat: info.deskripsi_singkat || '', // Asumsi field ini ada
    });

    const tokoId = info?.tokoId; 
    const primaryColor = settings?.colors?.primary;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading || !tokoId) return;
        
        setLoading(true);
        setMessage('');

        try {
            // Hanya kirim field yang ingin diupdate ke dokumen Induk Toko
            const update = { 
                name: formData.name, 
                deskripsi_singkat: formData.deskripsi_singkat 
            };
            
            await updateStoreInfo(tokoId, update); 
            
            setMessage('Profil Toko berhasil diperbarui! Perubahan sudah terlihat.');
            
            // Tunggu sebentar lalu tutup modal
            setTimeout(closeAdminModal, 1000); 

        } catch (error) {
            setMessage(`Gagal menyimpan: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>Atur Profil Toko</h2>
                    <button onClick={closeAdminModal} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Nama Toko */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Toko</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} 
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                    </div>

                    {/* Slug URL (Read-Only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">URL Slug Publik</label>
                        <input type="text" value={formData.slug} readOnly
                            className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md p-2 text-sm" />
                        <p className="text-xs text-gray-500 mt-1">Slug tidak bisa diubah setelah pendaftaran.</p>
                    </div>

                    {/* Deskripsi Singkat */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deskripsi Singkat/Slogan</label>
                        <textarea name="deskripsi_singkat" value={formData.deskripsi_singkat} onChange={handleInputChange} rows="3"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                    </div>
                    
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
                        style={{ backgroundColor: primaryColor }}
                    >
                        {loading ? 'Menyimpan...' : 'Simpan Profil'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilModal;
