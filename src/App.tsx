import { useEffect, useMemo, useState } from 'react';
import SearchBar from './components/SearchBar';
import { useStore } from './state/useStore';
import { useFilteredProducts } from './hooks/useFilteredProducts';
import { ProductCard } from './components/ProductCard';
import type { Product } from './types';
import { CartSidebar } from './components/CartSidebar';

function App() {
  const {
    fetchProducts,
    products,
    cart,
    searchQuery,
    setSearchQuery,
    setSelectedProduct,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity
  } = useStore();
  const [cartOpen, setCartOpen] = useState(false);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return ['all', ...cats];
  }, [products]);
  

  const [selectedCategory, setSelectedCategory] = useState('all');


  const filteredProducts = useFilteredProducts(
    products,
    searchQuery,
    selectedCategory
  );
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);




  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30 w-full">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">ShopHub</h1>
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <span className="font-medium">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Main Content  */}

      <div className='px-5'>
        {!loading && !error && filteredProducts.length > 0 && (
          <>
            <div className="mb-6 text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={() => setSelectedProduct(product)}
                onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          </>
        )}
      </div>



      {/* Cart Modal */}
      <CartSidebar
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}

export default App;
