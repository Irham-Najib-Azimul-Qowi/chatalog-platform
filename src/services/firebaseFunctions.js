import { 
    doc, updateDoc, collection, 
    addDoc, deleteDoc
} from 'firebase/firestore';
// eslint-disable-next-line import/no-unresolved
import { db } from './firebase'; // Asumsi db diexport oleh partner Anda

// Path Collection Induk di Firestore
const TOKOS_COLLECTION = 'tokos';

// --- FUNGSI PRODUK CRUD (Menggunakan Sub-Koleksi Products) ---
// ... (Kode saveProduct dan deleteProduct tetap sama)
/**
 * Menambah atau Mengubah produk dalam Sub-Koleksi 'products'.
 * Menggunakan ID Dokumen produk sebagai kunci.
 * @param {string} tokoId ID unik toko klien (misal: EdkbbRm7nBHAn8uFJBJ)
 * @param {object} produkData Data produk baru/update (produkData.id harus ada untuk update)
 */
export const saveProduct = async (tokoId, produkData) => {
    // Referensi ke Koleksi Products di bawah Toko spesifik
    const productsCollectionRef = collection(db, TOKOS_COLLECTION, tokoId, 'products');

    if (produkData.id) {
        // Logika UPDATE: ID Dokumen produk adalah produkData.id
        const productDocRef = doc(productsCollectionRef, produkData.id);
        
        // Hapus ID dari data yang akan diupdate agar tidak menjadi field di Firestore
        const { id, ...dataToUpdate } = produkData;
        await updateDoc(productDocRef, dataToUpdate);
        
        return { success: true, message: "Produk berhasil diperbarui." };

    } else {
        // Logika TAMBAH Produk Baru (Firestore akan membuat ID Dokumen otomatis)
        await addDoc(productsCollectionRef, produkData);
        
        return { success: true, message: "Produk baru berhasil ditambahkan." };
    }
};

/**
 * Menghapus produk dari Sub-Koleksi 'products'.
 * @param {string} tokoId ID unik toko klien
 * @param {string} produkId ID Dokumen produk yang akan dihapus (yaitu doc.id Firestore)
 */
export const deleteProduct = async (tokoId, produkId) => {
    // Path: tokos/{tokoId}/products/{produkId}
    const productDocRef = doc(db, TOKOS_COLLECTION, tokoId, 'products', produkId);
    await deleteDoc(productDocRef);

    return { success: true, message: "Produk berhasil dihapus." };
};

// --- FUNGSI BLOG POST CRUD (Menggunakan Sub-Koleksi Blog) ---

/**
 * Menambah atau Mengubah blog post dalam Sub-Koleksi 'blog_posts'.
 * @param {string} tokoId ID unik toko klien
 * @param {object} postData Data post baru/update
 */
export const saveBlogPost = async (tokoId, postData) => {
    const blogCollectionRef = collection(db, TOKOS_COLLECTION, tokoId, 'blog_posts');
    const { id, ...dataToSave } = postData; // Pastikan 'id' tidak tersimpan sebagai field

    if (id) {
        const postDocRef = doc(blogCollectionRef, id);
        await updateDoc(postDocRef, { ...dataToSave, updatedAt: new Date().toISOString() });
        return { success: true, message: "Postingan blog berhasil diperbarui." };
    } else {
        await addDoc(blogCollectionRef, { ...dataToSave, createdAt: new Date().toISOString() });
        return { success: true, message: "Postingan blog baru berhasil ditambahkan." };
    }
};

/**
 * Menghapus blog post dari Sub-Koleksi 'blog_posts'.
 * @param {string} tokoId ID unik toko klien
 * @param {string} postId ID Dokumen blog post yang akan dihapus
 */
export const deleteBlogPost = async (tokoId, postId) => {
    const postDocRef = doc(db, TOKOS_COLLECTION, tokoId, 'blog_posts', postId);
    await deleteDoc(postDocRef);
    return { success: true, message: "Postingan blog berhasil dihapus." };
};

// --- FUNGSI INFORMASI TOKO (INFO) ---

/**
 * Mengubah field di dokumen Toko Induk (tokos/{tokoId}).
 * @param {string} tokoId ID unik toko klien
 * @param {object} infoUpdate Objek yang berisi field info yang ingin diubah (misal: { name: 'New Name' })
 */
export const updateStoreInfo = async (tokoId, infoUpdate) => {
    const tokoDocRef = doc(db, TOKOS_COLLECTION, tokoId);
    
    // updateDoc akan me-merge field baru ke dokumen yang sudah ada
    await updateDoc(tokoDocRef, infoUpdate);
    
    return { success: true, message: "Informasi toko berhasil diperbarui." };
};


// --- FUNGSI PENGATURAN TOKO (SETTINGS) ---

/**
 * Mengubah field di dokumen settings/config.
 * @param {string} tokoId ID unik toko klien
 * @param {object} settingsUpdate Objek yang berisi field settings yang ingin diubah (misal: { colors: { primary: '#fff' }})
 */
export const updateStoreSettings = async (tokoId, settingsUpdate) => {
    // Path: tokos/{tokoId}/settings/config
    const settingsConfigRef = doc(db, TOKOS_COLLECTION, tokoId, 'settings', 'config');
    
    // updateDoc akan me-merge field settings yang baru ke dokumen yang sudah ada
    await updateDoc(settingsConfigRef, settingsUpdate);
    
    return { success: true, message: "Pengaturan toko berhasil diperbarui." };
};
