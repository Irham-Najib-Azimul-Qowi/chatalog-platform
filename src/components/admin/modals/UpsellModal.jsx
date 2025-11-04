import React from 'react';
import { useToko } from '../../../hooks/useToko'; 

const UpsellModal = () => {
    // Ambil fungsi tutup modal dan nama fitur yang terkunci dari context
    const { closeAdminModal, ui } = useToko();
    const featureName = ui.upsellFeatureName; // Nama fitur yang dikirim dari AdminBarToko

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[60] flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-6 text-center">
                    
                    <span className="text-6xl mb-4 block">💰</span>

                    <h2 className="text-3xl font-bold text-red-600 mb-3">Upgrade Diperlukan!</h2>
                    
                    <p className="text-lg text-gray-700 mb-4">
                        Fitur **{featureName || 'Ini'}** adalah fitur premium Chatalog.
                    </p>

                    <p className="text-gray-600 mb-6">
                        Tingkatkan paket Anda untuk mendapatkan akses penuh ke fitur **Live Editing** untuk **{featureName}**.
                    </p>

                    <div className="space-y-3">
                        {/* Tombol Aksi Utama (Arahkan ke halaman upgrade partner) */}
                        <a 
                            href="/chatalog/upgrade" 
                            target="_blank"
                            className="w-full block py-3 text-lg font-bold text-white rounded-lg transition-colors bg-green-600 hover:bg-green-700"
                        >
                            Lihat Opsi Upgrade
                        </a>
                        
                        {/* Tombol Tutup */}
                        <button
                            onClick={closeAdminModal}
                            className="w-full py-2 text-gray-600 hover:text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                        >
                            Kembali ke Editor
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UpsellModal;
