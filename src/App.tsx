import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import { useStore } from './state/useStore';
import { useFilteredProducts } from './hooks/useFilteredProducts';
import { ProductCard } from './components/ProductCard';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItemCount = 3;
  const categories = ['electronics', 'fashion', 'home', 'sports'];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('electronics');
  const {
    fetchProducts,
    products,
    searchQuery,
    setSearchQuery,
    setSelectedProduct,
    // addToCart,
    loading,
    error
  } = useStore();

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
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
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
                  // onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          </>
        )}
      </div>



      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <p>No items in cart yet.</p>
            <button
              onClick={() => setCartOpen(false)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
