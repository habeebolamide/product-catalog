import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

interface StoreState {
  products: Product[];
  cart: CartItem[]; 
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  searchQuery: string;
  selectedCategory: string;

  // Actions
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedProduct: (product: Product | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  fetchProducts: () => Promise<void>;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      loading: false,
      error: null,
      selectedProduct: null,
      searchQuery: '',
      selectedCategory: '',

      // Actions
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setProducts: (products) => set({ products }),


      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        });
      },

      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          if (!response.ok) throw new Error('Failed to fetch products');
          const data = await response.json();
          set({ products: data, loading: false });
        } catch (err) {
          set({
            loading: false,
            error: err instanceof Error ? err.message : 'An error occurred'
          });
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
