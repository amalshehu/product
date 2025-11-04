"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../components/CartContext";
import ErrorBoundary from "../../components/ErrorBoundary";

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <ErrorBoundary>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <ErrorBoundary>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 font-medium"
            aria-label="Clear all items from cart"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4"
              >
                <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="rounded-md object-contain"
                  />
                </div>

                <div className="flex-1">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {item.product.title}
                  </Link>
                  <p className="text-gray-600 text-sm mt-1 capitalize">{item.product.category}</p>
                  <p className="text-green-600 font-bold text-lg mt-2">${item.product.price}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      aria-label={`Decrease quantity of ${item.product.title}`}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-center min-w-[3rem]">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      aria-label={`Increase quantity of ${item.product.title}`}
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-lg font-semibold text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    aria-label={`Remove ${item.product.title} from cart`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({state.itemCount})</span>
                <span className="text-gray-900">${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${(state.total * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Total</span>
              <span>${(state.total * 1.08).toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center block"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/"
              className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors text-center block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}
