import ProductList from "../components/ProductList";
import ErrorBoundary from "../components/ErrorBoundary";
import { Product } from "../services/productService";

async function getProducts(): Promise<{ products: Product[]; error?: string }> {
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=6', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const products: Product[] = await res.json();
    return { products };
  } catch {
    return {
      products: [],
      error: 'Failed to fetch products',
    };
  }
}

export default async function Home() {
  const { products, error } = await getProducts();

  return (
    <div className="p-8">
      <ErrorBoundary>
        <ProductList initialProducts={products} initialError={error} />
      </ErrorBoundary>
    </div>
  );
}
