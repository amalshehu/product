"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../services/productService";
import { useCart } from "./CartContext";

const fetchProduct = async (url: string): Promise<Product> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

interface ProductDetailClientProps {
  initialProduct?: Product;
}

export default function ProductDetailClient({ initialProduct }: ProductDetailClientProps) {
  const params = useParams();
  const productId = params.id as string;
  const { data: product, error, isLoading } = useSWR<Product>(
    `https://fakestoreapi.com/products/${productId}`,
    fetchProduct,
    {
      fallbackData: initialProduct,
    }
  );
  const { addItem, state } = useCart();

  const isInCart = state.items.some((item) => item.product.id === parseInt(productId));

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center text-red-600 mb-4">
          Failed to load product. Please try again.
          <button
            onClick={() => window.location.reload()}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            aria-label="Retry loading product"
          >
            Retry
          </button>
        </div>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Products
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-6 w-1/3"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-300 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-20 bg-gray-300 rounded"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-10 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <nav className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-96 md:h-[500px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="rounded-lg object-contain"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full capitalize">
              {product.category}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center" aria-label={`Rating: ${product.rating.rate} out of 5 stars`}>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < Math.floor(product.rating.rate)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  aria-hidden="true"
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-600 ml-2">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-green-600">
            ${product.price}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Add to Cart Button */}
          <div className="pt-4">
            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                isInCart
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              aria-label={isInCart ? "Product already in cart" : "Add product to cart"}
            >
              {isInCart ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added to Cart
                </span>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
