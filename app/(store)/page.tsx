import { Button } from '@/components/ui/button';
import { getAllProducts } from '@/sanity/lib/getAllProducts';

export default async function Home() {
  const products = await getAllProducts();
  console.log('products:', products);
  return (
    <div>
      <h1 className="main">Hello World!</h1>
      <Button>Button me</Button>
    </div>
  );
}
