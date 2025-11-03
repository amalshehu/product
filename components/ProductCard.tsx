import Image from "next/image";
import { Product } from "../services/productService";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <div
    key={product.id}
    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow min-h-[400px] flex flex-col"
    role="listitem"
    aria-labelledby={`product-title-${product.id}`}
    >
      <div className="w-full h-48 mb-4 relative">
        <Image
        src={product.image}
        alt={product.title}
        fill
        priority={priority}
          className="rounded-md object-contain"
        />
      </div>
      <h2
        id={`product-title-${product.id}`}
        className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2"
      >
        {product.title}
      </h2>
      <span
        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize mb-2"
        aria-label={`Category: ${product.category}`}
      >
        {product.category}
      </span>
      <p className="text-sm text-gray-800 mb-2 line-clamp-3" aria-label="Product description">
      {product.description}
      </p>
      <div className="flex items-center mb-2" aria-label={`Rating: ${product.rating.rate} out of 5 stars`}>
      <span className="text-yellow-500" aria-hidden="true">★</span>
      <span className="text-sm text-gray-800 ml-1">
      {product.rating.rate} ({product.rating.count} reviews)
      </span>
      </div>
      <p className="text-xl font-bold text-green-600" aria-label={`Price: ${product.price} dollars`}>
        ${product.price}
      </p>
    </div>
  );
}
