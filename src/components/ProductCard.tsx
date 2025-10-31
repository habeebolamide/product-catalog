import { Plus } from "lucide-react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div 
        className="relative pt-[100%] bg-gray-100 cursor-pointer" 
        onClick={onSelect}
      >
        <img
          src={product.image}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 
          className="mt-2 text-lg font-semibold text-gray-900 line-clamp-2 cursor-pointer hover:text-indigo-600" 
          onClick={onSelect}
        >
          {product.title}
        </h3>
        <div className="mt-2 flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm text-gray-600">{product.rating.rate}</span>
          <span className="text-sm text-gray-400">({product.rating.count})</span>
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
          onClick={onAddToCart}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};