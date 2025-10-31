import { ShoppingCart, X } from "lucide-react";
import type { Product } from "../types";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.title} 
                className="max-h-96 object-contain" 
              />
            </div>
            <div>
              <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                {product.category}
              </span>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {product.title}
              </h1>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="text-lg font-medium text-gray-900">
                    {product.rating.rate}
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{product.rating.count} reviews</span>
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => {
                    onAddToCart();
                    onClose();
                  }}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};