import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import type { CartItem } from "../types";

interface CartSidebarProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemove
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          
          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <ShoppingCart size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cart.map(item => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 mb-4 pb-4 border-b last:border-b-0"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-20 h-20 object-contain bg-gray-100 rounded" 
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full text-red-500 "
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full text-green-500"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t px-6 py-4 bg-gray-50">
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Items ({itemCount})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 mb-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
