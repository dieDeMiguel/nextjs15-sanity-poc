'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { imageUrl } from '@/sanity/lib/imageUrl';
import useBasketStore from '@/app/store/store';
import Loader from '@/components/Loader';
import AddToBasketButton from '@/components/AddToBasketButton';

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center p-4">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Your Basket</h1>
        <p className="text-lg text-gray-600">Your basket is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Your Basket</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-grow">
          {groupedItems?.map((item) => (
            <div key={item.product._id} className="mb-4 flex items-center justify-between rounded border p-4">
              <div
                className="flex min-w-0 flex-1 cursor-pointer items-center"
                onClick={() => {
                  router.push(`/store/product/${item.product.slug?.current}`);
                }}
              >
                <div className="mr-4 h-20 w-20 flex-shrink-0 sm:h-24 sm:w-24">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? 'Product image'}
                      className="h-full w-full rounded object-cover"
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold sm:text-xl">{item.product.name}</h2>
                  <p className="text-sm sm:text-base">
                    Price: £{((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="ml-4 flex flex-shrink-0 items-center">
                <AddToBasketButton disabled={false} product={item.product} />
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 order-first h-fit w-full rounded border bg-white p-6 lg:sticky lg:left-auto lg:top-4 lg:order-last lg:w-80">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>{groupedItems.reduce((total, item) => total + item.quantity, 0)}</span>
            </div>
            <p className="flex justify-between border-t pt-2 text-2xl font-bold">
              <span>Total:</span>
              <span>£{useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BasketPage;
