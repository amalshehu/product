export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const fetchProducts = async (): Promise<Product[]> => {
const res = await fetch("/api/products");
if (!res.ok) throw new Error("Failed to fetch products");
return res.json();
};
