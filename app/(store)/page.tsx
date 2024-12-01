import ProductsView from '@/components/ProductsView';
import { getAllCategories } from '@/sanity/lib/getAllCategories';
import { getAllProducts } from '@/sanity/lib/getAllProducts';

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
