'use client';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import Form from 'next/form';
import { TrolleyIcon } from '@sanity/icons';

export default function Header() {
  const { user } = useUser();

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2">
      <div>
        <Link href="/" className="mx-auto cursor-pointer text-2xl font-bold text-blue-500 hover:opacity-50 sm:mx-0">
          Shopr
        </Link>
        <Form
          action="/search"
          className="mt-2 w-full sm:mx-4 sm:mt-0 sm:w-auto sm:flex-1"
          name="query"
          placeholder="Search for products"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="w-full max-w-4xl rounded border bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          />
        </Form>
        <div>
          <Link
            href="/basket"
            className="relative flex flex-1 items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 sm:flex-none sm:justify-start"
          >
            <TrolleyIcon className="h-6 w-6" />
            <span>My Basket</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
