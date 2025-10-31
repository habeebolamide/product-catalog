import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import { useStore } from './state/useStore';
import { useFilteredProducts } from './hooks/useFilteredProducts';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { AlertCircle, Loader2 } from 'lucide-react';
import { ProductDetailModal } from './components/ProductDetailModal';

function App() {
  const {
    fetchProducts,
    products,
    cart,
    searchQuery,
    setSearchQuery,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    selectedProduct,
    setSelectedProduct
  } = useStore();
  const [cartOpen, setCartOpen] = useState(false);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = ['all'];
  products.forEach(product => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });


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
          {/* <h1 className="text-2xl font-bold text-indigo-600">ShopHub</h1> */}
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 ml-auto"
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
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center gap-4 text-red-800">
            <AlertCircle size={24} />
            <div>
              <h3 className="font-semibold">Error loading products</h3>
              <p>{error}</p>
            </div>
          </div>
        )}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No products found</p>
          </div>
        )}
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


      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => addToCart(selectedProduct)}
        />
      )}

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
