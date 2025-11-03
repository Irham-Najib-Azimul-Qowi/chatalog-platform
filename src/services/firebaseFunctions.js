import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
// eslint-disable-next-line import/no-unresolved
import { db } from './firebase'; // db dari file partner Anda

// Path Collection di Firestore
const TOKO_COLLECTION = 'toko_klien';

// --- FUNGSI PRODUK CRUD ---

/**
 * Menambah atau Mengubah produk dalam array 'produk' di dokumen toko.
 * Jika produk.id ada, lakukan update. Jika tidak, tambahkan baru.
 * @param {string} storeSlug Slug Toko Klien
 * @param {object} produkData Data produk baru/update
 */
export const saveProduct = async (storeSlug, produkData) => {
    const tokoRef = doc(db, TOKO_COLLECTION, storeSlug);

    if (produkData.id) {
        // Logika UPDATE Produk (kompleks, karena produk adalah array)
        // Cara termudah dan tercepat: tarik seluruh array, modifikasi, dan simpan kembali.
        const docSnap = await getDoc(tokoRef);
        if (!docSnap.exists()) throw new Error("Toko tidak ditemukan.");
        
        const data = docSnap.data();
        let produkArray = data.produk || [];
        
        const index = produkArray.findIndex(p => p.id === produkData.id);
        if (index > -1) {
            // Update item yang ada
            produkArray[index] = produkData;
        } else {
            // Seharusnya tidak terjadi, tapi jika terjadi, tambahkan item baru
            produkArray.push({ ...produkData, id: Date.now().toString() }); 
        }

        await updateDoc(tokoRef, { produk: produkArray });
        return { success: true, message: "Produk berhasil diperbarui." };

    } else {
        // Logika TAMBAH Produk Baru
        const newProduct = {
            ...produkData,
            id: Date.now().toString(), // ID unik sederhana
        };

        // Menggunakan arrayUnion untuk menambahkan item baru ke array
        await updateDoc(tokoRef, {
            produk: arrayUnion(newProduct)
        });
        return { success: true, message: "Produk baru berhasil ditambahkan." };
    }
};

/**
 * Menghapus produk dari array 'produk'.
 * @param {string} storeSlug Slug Toko Klien
 * @param {object} produkData Data produk yang akan dihapus (minimal harus ada id)
 */
export const deleteProduct = async (storeSlug, produkData) => {
    const tokoRef = doc(db, TOKO_COLLECTION, storeSlug);
    
    // Untuk menghapus array item, kita perlu menggunakan arrayRemove
    await updateDoc(tokoRef, {
        produk: arrayRemove(produkData)
    });

    return { success: true, message: "Produk berhasil dihapus." };
};

// --- FUNGSI PENGATURAN TOKO (SETTINGS) ---

/**
 * Mengubah pengaturan toko (misalnya, warna, logo, tampilan).
 * @param {string} storeSlug Slug Toko Klien
 * @param {object} settingsUpdate Objek yang berisi field settings yang ingin diubah
 */
export const updateStoreSettings = async (storeSlug, settingsUpdate) => {
    const tokoRef = doc(db, TOKO_COLLECTION, storeSlug);
    
    // Catatan: Ini akan me-merge field settings yang baru ke field settings yang lama
    await updateDoc(tokoRef, {
        settings: settingsUpdate
    });
    
    return { success: true, message: "Pengaturan toko berhasil diperbarui." };
};