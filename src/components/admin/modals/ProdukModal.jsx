import React, { useState } from 'react';
import { useToko } from '../../../hooks/useToko';
import { saveProduct, deleteProduct } from '../../../services/firebaseFunctions';
import { uploadImageToCloudinary } from '../../../services/cloudinary'; 

// Fungsi bantuan (dari Step 2)
const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);


const ProdukModal = () => {
    const { produk, info, closeAdminModal } = useToko();
    
    // State UI
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [currentProduct, setCurrentProduct] = useState(null); // Produk yang sedang diedit
    const [isFormOpen, setIsFormOpen] = useState(false); // Status form CRUD
    const [imageFile, setImageFile] = useState(null); // Untuk file gambar yang baru diupload

    const storeSlug = info?.slug;

    // --- LOGIKA UTAMA MODAL ---

    const handleSelectProduct = (product) => {
        setCurrentProduct(product);
        setIsFormOpen(true);
        setMessage('');
        setImageFile(null);
    };

    const handleNewProduct = () => {
        setCurrentProduct({ 
            nama: '', 
            deskripsi_singkat: '', 
            harga: 0, 
            gambar_url: '', 
            isFeatured: false 
        });
        setIsFormOpen(true);
        setMessage('');
        setImageFile(null);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name === 'harga' ? parseInt(value) || 0 : value),
        }));
    };

    // --- SUBMIT FORM (UPLOAD & SAVE) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading || !storeSlug || !currentProduct?.nama) return;

        setLoading(true);
        setMessage('');

        try {
            let finalImageUrl = currentProduct.gambar_url;

            // 1. Upload Gambar Baru ke Cloudinary jika ada file baru
            if (imageFile) {
                setMessage('Mengupload gambar ke Cloudinary...');
                finalImageUrl = await uploadImageToCloudinary(imageFile);
            }

            // 2. Siapkan data produk akhir
            const productToSave = {
                ...currentProduct,
                gambar_url: finalImageUrl,
            };

            // 3. Simpan ke Firestore
            setMessage('Menyimpan data produk ke Firestore...');
            const result = await saveProduct(storeSlug, productToSave);

            setMessage(result.message);
            setIsFormOpen(false);
            setCurrentProduct(null);
            setImageFile(null);

        } catch (error) {
            setMessage(`Gagal menyimpan produk: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    // --- DELETE PRODUK ---
    const handleDelete = async () => {
        if (!currentProduct?.id || !window.confirm(`Yakin ingin menghapus produk "${currentProduct.nama}"?`)) return;

        setLoading(true);
        setMessage('');
        try {
            await deleteProduct(storeSlug, currentProduct);
            setMessage('Produk berhasil dihapus.');
            setIsFormOpen(false);
            setCurrentProduct(null);
        } catch (error) {
            setMessage(`Gagal menghapus: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex">
                
                {/* 1. Panel Daftar Produk (Kiri) */}
                <div className="w-full md:w-1/3 border-r p-4 flex flex-col">
                    <h2 className="text-xl font-bold mb-4 text-[var(--color-primary)]">Daftar Produk ({produk.length})</h2>
                    <button 
                        onClick={handleNewProduct} 
                        className="w-full py-2 mb-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
                    >
                        + Tambah Produk Baru
                    </button>
                    
                    <ul className="space-y-2 flex-grow overflow-y-auto pr-2">
                        {produk.map((p) => (
                            <li 
                                key={p.id} 
                                onClick={() => handleSelectProduct(p)}
                                className={`p-3 text-sm rounded-lg cursor-pointer transition 
                                            ${currentProduct?.id === p.id ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
                            >
                                {p.nama} - {formatRupiah(p.harga)}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 pt-2 border-t">
                        <button onClick={closeAdminModal} className="w-full py-2 text-gray-600 hover:text-gray-800 rounded-lg">
                            Tutup Modal
                        </button>
                    </div>
                </div>

                {/* 2. Panel Form CRUD (Kanan) */}
                <div className="w-full md:w-2/3 p-6">
                    {message && (
                        <div className={`p-3 rounded-lg mb-4 text-sm ${message.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {message}
                        </div>
                    )}

                    {!isFormOpen && (
                        <div className="text-center p-10 text-gray-500">
                            Pilih produk di samping untuk mengedit, atau klik "Tambah Produk Baru".
                        </div>
                    )}

                    {currentProduct && isFormOpen && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h3 className="text-2xl font-bold mb-4">
                                {currentProduct.id ? 'Edit Produk' : 'Buat Produk Baru'}
                            </h3>

                            {/* Nama Produk */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
                                <input type="text" name="nama" value={currentProduct.nama} onChange={handleInputChange} 
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                            </div>

                            {/* Harga */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Harga (IDR)</label>
                                <input type="number" name="harga" value={currentProduct.harga} onChange={handleInputChange} 
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                            </div>

                            {/* Deskripsi Singkat */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deskripsi Singkat</label>
                                <textarea name="deskripsi_singkat" value={currentProduct.deskripsi_singkat} onChange={handleInputChange} rows="3"
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                            </div>

                            {/* Gambar Produk */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gambar Produk (Max 5MB)</label>
                                {currentProduct.gambar_url && !imageFile && (
                                    <div className="mb-2">
                                        <img src={currentProduct.gambar_url} alt="Gambar saat ini" className="w-32 h-32 object-cover rounded-md" />
                                        <p className="text-xs text-gray-500 mt-1">Gambar saat ini. Pilih file untuk mengganti.</p>
                                    </div>
                                )}
                                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                            </div>

                            {/* Featured Checkbox */}
                            <div className="flex items-center pt-2">
                                <input id="isFeatured" type="checkbox" name="isFeatured" checked={currentProduct.isFeatured} onChange={handleInputChange} 
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                <label htmlFor="isFeatured" className="ml-2 block text-sm font-medium text-gray-700">
                                    Tampilkan di Homepage (Featured)
                                </label>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex justify-between pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="py-2 px-6 font-bold text-white rounded-lg transition-colors 
                                                bg-[var(--color-primary)] hover:opacity-90 disabled:opacity-50"
                                >
                                    {loading ? 'Memproses...' : (currentProduct.id ? 'Simpan Perubahan' : 'Buat Produk')}
                                </button>
                                
                                {currentProduct.id && (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={loading}
                                        className="py-2 px-6 font-bold text-white rounded-lg transition-colors bg-red-600 hover:bg-red-700 disabled:opacity-50"
                                    >
                                        Hapus
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProdukModal;