import { useState } from 'react';

/**
 * ProductCard Component
 * Card komponen untuk menampilkan produk
 */
const ProductCard = ({ product, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      // TODO: Implement default add to cart logic
      console.log('Add to cart:', product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-200">
        {product.gambar && !imageError ? (
          <img
            src={product.gambar}
            alt={product.nama}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">🛍️</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.nama || 'Produk'}
        </h3>
        
        {product.deskripsi && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.deskripsi}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div>
            {product.hargaDiskon ? (
              <div>
                <span className="text-red-600 font-bold text-lg">
                  Rp {parseInt(product.hargaDiskon).toLocaleString('id-ID')}
                </span>
                <span className="text-gray-400 line-through text-sm ml-2">
                  Rp {parseInt(product.harga).toLocaleString('id-ID')}
                </span>
              </div>
            ) : (
              <span className="text-gray-800 font-bold text-lg">
                Rp {parseInt(product.harga || 0).toLocaleString('id-ID')}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
