import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">FakeStore</h3>
            <p className="text-gray-800 text-sm">
            Discover amazing products at unbeatable prices. Your one-stop shop for quality goods.
            </p>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
              <Link href="/" className="text-gray-800 hover:text-blue-600 text-sm transition-colors">
              Home
              </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Contact</h4>
            <p className="text-gray-800 text-sm">
            Email: info@fakestore.com<br />
            Phone: (555) 123-4567
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-800 text-sm">
          © {new Date().getFullYear()} FakeStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
