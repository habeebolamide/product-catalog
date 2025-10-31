import type { Product } from '../types';

export const useFilteredProducts = (
  products: Product[],
  searchQuery: string,
  selectedCategory: string
) => {
  return products.filter(product => {
    const matchesCategory = 
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};