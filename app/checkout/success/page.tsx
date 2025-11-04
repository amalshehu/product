"use client";

import Link from "next/link";
import ErrorBoundary from "../../../components/ErrorBoundary";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <ErrorBoundary>
        <div className="text-center py-16">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-green-800 mb-2">What&apos;s Next?</h2>
            <ul className="text-green-700 text-left space-y-2">
              <li>• You&apos;ll receive an email confirmation shortly</li>
              <li>• Your order will be processed within 1-2 business days</li>
              <li>• Shipping updates will be sent to your email</li>
              <li>• Estimated delivery: 3-5 business days</li>
            </ul>
          </div>

          <div className="space-x-4">
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors inline-block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}
