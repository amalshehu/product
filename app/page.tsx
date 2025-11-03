import ProductList from "../components/ProductList";
import ErrorBoundary from "../components/ErrorBoundary";

export default function Home() {
  return (
    <div className="p-8">
      <ErrorBoundary>
        <ProductList />
      </ErrorBoundary>
    </div>
  );
}
