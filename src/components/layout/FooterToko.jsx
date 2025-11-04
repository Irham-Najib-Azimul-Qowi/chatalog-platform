import React from 'react';
import { useToko } from '../../hooks/useToko';

const FooterToko = () => {
    const { info, settings } = useToko();
    
    const namaToko = info?.name || 'Chatalog Store';
    const primaryColor = settings?.colors?.primary;
    const tahun = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap justify-between items-center">
                    
                    {/* Info Toko */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>{namaToko}</h3>
                        <p className="text-gray-600 text-sm">
                            {info?.deskripsi_singkat || 'Toko online terbaik yang dibuat dengan Chatalog.'}
                        </p>
                    </div>

                    {/* Navigasi Cepat (Sederhana) */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h4 className="font-semibold text-gray-700 mb-2">Tautan Cepat</h4>
                        <ul className="space-y-1 text-sm">
                            <li><a href="/" className="text-gray-600 hover:text-opacity-80" style={{ '--color-primary': primaryColor }} onMouseOver={e => e.currentTarget.style.color = primaryColor} onMouseOut={e => e.currentTarget.style.color = '#4b5563'}>Home</a></li>
                            <li><a href="/produk" className="text-gray-600 hover:text-opacity-80" style={{ '--color-primary': primaryColor }} onMouseOver={e => e.currentTarget.style.color = primaryColor} onMouseOut={e => e.currentTarget.style.color = '#4b5563'}>Produk</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 pt-4 border-t border-gray-300">
                    <p className="text-xs text-gray-500">
                        &copy; {tahun} {namaToko}. Powered by Chatalog.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterToko;