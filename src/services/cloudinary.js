// Konfigurasi Cloudinary
// Ganti dengan Cloud Name dan Upload Preset Anda yang sebenarnya
const CLOUDINARY_CLOUD_NAME = 'your-cloudinary-cloud-name';
const CLOUDINARY_UPLOAD_PRESET = 'chatalog_toko_preset'; // Harus Unsigned

/**
 * Fungsi untuk mengupload file gambar ke Cloudinary.
 * @param {File} file - Objek file (dari input type="file")
 * @returns {Promise<string>} URL gambar yang diupload
 */
export const uploadImageToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            // Log response error secara detail
            const errorData = await response.json();
            console.error("Cloudinary Detailed Error:", errorData);
            throw new Error(`Cloudinary upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.secure_url; // Mengembalikan URL gambar yang sudah diupload

    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw new Error("Gagal mengupload gambar. Cek CLOUD_NAME dan UPLOAD_PRESET.");
    }
};
