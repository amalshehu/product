"use client";

import { useMemo, useState, useEffect } from "react";
import useSWR from "swr";
import {
  Product,
  fetchProducts as fetchProductsService,
} from "../services/productService";
import ProductCard from "./ProductCard";

interface ProductListProps {
  initialProducts: Product[];
  initialError?: string;
}

export default function ProductList({ initialProducts, initialError }: ProductListProps) {
  const [sortAsc, setSortAsc] = useState(true);
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR<Product[]>("products", fetchProductsService, {
    fallbackData: initialProducts,
    revalidateOnFocus: false,
    dedupingInterval: 300000, // 5 minutes
  });

  // Handle initial error from server-side rendering
  useEffect(() => {
    if (initialError && !products) {
      mutate();
    }
  }, [initialError, products, mutate]);

  const sortedProducts = useMemo(() => {
    if (!products) return [];
    return [...products].sort((a, b) =>
      sortAsc ? a.price - b.price : b.price - a.price
    );
  }, [products, sortAsc]);

  const toggleSort = () => {
    setSortAsc(!sortAsc);
  };

  const handleRetry = () => {
    mutate();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
        FakeStore
      </h1>
      <p className="text-center text-gray-800 mb-8">
      Discover amazing products at unbeatable prices
      </p>
      {error && (
        <div className="text-center text-red-600 mb-4">
          Failed to load products. Please try again.
          <button
            onClick={handleRetry}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            aria-label="Retry loading products"
          >
            Retry
          </button>
        </div>
      )}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-4 animate-pulse min-h-[400px] flex flex-col"
              aria-hidden="true"
            >
              <div className="w-full h-48 mb-4 relative">
                <div className="w-full h-full bg-gray-300 rounded-md"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-5 bg-gray-300 rounded-full mb-2 w-20"></div>
              <div className="h-3 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded mb-2 w-2/3"></div>
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded ml-1 w-20"></div>
              </div>
              <div className="h-5 bg-gray-300 rounded w-16"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-6">
            <button
            onClick={toggleSort}
            disabled={isLoading}
            className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors border border-gray-400"
            aria-label={`Sort products by price ${
            sortAsc ? "ascending" : "descending"
            }`}
            aria-pressed={sortAsc}
            >
              Sort by Price {sortAsc ? "↑" : "↓"}
            </button>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            {sortedProducts.map((p, index) => (
              <ProductCard key={p.id} product={p} priority={index === 0} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
