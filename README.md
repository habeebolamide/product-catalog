# Product Catalog Viewer

A modern, responsive e-commerce product catalog application built with React, TypeScript, and Tailwind CSS. Features real-time search, filtering, and persistent cart functionality.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Zustand** - Lightweight state management with persistence
- **Tailwind CSS** - Utility-first styling framework
- **Lucide React** - Modern icon library
- **Fake Store API** - Public product data source

## ✨ Features

- **Product Browsing** - Responsive grid layout with product cards
- **Search & Filter** - Real-time search with category filtering
- **Product Details** - Modal view with full product information and reviews
- **Shopping Cart** - Add/remove items with quantity management
- **Persistent Storage** - Cart state persists across browser sessions
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Loading States** - Clear feedback for async operations
- **Error Handling** - Graceful error messages for failed requests

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CartSidebar.tsx
│   ├── SearchBar.tsx
│   ├── ProductCard.tsx
│   └── ProductDetailModal.tsx
├── hooks/              # Custom React hooks
│   └── useFilteredProducts.ts
├── state/              # Zustand state management
│   └── useStore.ts
├── types/              # TypeScript type definitions
│   └── index.d.ts
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🎨 Architecture Decisions

- **Zustand with Persistence** - Chosen for its simplicity and built-in localStorage middleware, avoiding boilerplate while maintaining type safety
- **Component Composition** - Small, focused components for better reusability and testing
- **Custom Hooks** - Extracted filtering logic for cleaner components and easier testing
- **TypeScript** - Strict typing throughout for fewer runtime errors
- **Modular File Structure** - Clear separation of concerns for maintainability


## 📝 Notes

- Cart data persists in localStorage under the key `cart-storage`
- The application uses Fake Store API which returns 20 products across 4 categories
- All monetary values are formatted to 2 decimal places

## 📄 License

MIT