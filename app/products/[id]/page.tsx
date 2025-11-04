import { Product } from "../../../services/productService";
import { notFound } from "next/navigation";
import ProductDetailClient from "../../../components/ProductDetailClient";
import ErrorBoundary from "../../../components/ErrorBoundary";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!res.ok) {
      return null;
    }
    const product: Product = await res.json();
    return product;
  } catch {
    return null;
  }
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <ErrorBoundary>
      <ProductDetailClient initialProduct={product} />
    </ErrorBoundary>
  );
}
