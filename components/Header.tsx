"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function Header() {
const { state } = useCart();

return (
<header className="bg-white shadow-sm border-b border-gray-200">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between items-center h-16">
<div className="flex items-center">
  <Link href="/" className="text-2xl font-bold text-gray-900">
    FakeStore
</Link>
</div>
<nav className="hidden md:flex space-x-8">
  <Link href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
    Home
  </Link>
</nav>
<div className="flex items-center space-x-4">
  {/* Cart Icon */}
  <Link
    href="/cart"
    className="relative text-gray-900 hover:text-blue-600 transition-colors p-2"
      aria-label={`Shopping cart with ${state.itemCount} items`}
      >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 002-2v-3a2 2 0 00-2-2H7z" />
              </svg>
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount > 99 ? "99+" : state.itemCount}
                </span>
              )}
            </Link>

            <div className="md:hidden">
              {/* Mobile menu button - can be expanded later */}
              <button className="text-gray-700 hover:text-blue-600" aria-label="Open menu">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
