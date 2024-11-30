'use client';
import Link from 'next/link';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Form from 'next/form';
import { TrolleyIcon } from '@sanity/icons';

export default function Header() {
  const { user } = useUser();
  const createClerkPasskey = async () => {};

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
        {user ? (
          <div className="flex items-center space-x-2">
            <UserButton />
            <div className="hidden text-xs sm:block">
              <p className="text-gray-400">Welcome Back</p>
              <p className="font-bold">{user.fullName}!</p>
            </div>
          </div>
        ) : (
          <SignInButton mode="modal" />
        )}
        {user?.passkeys.length === 0 && (
          <button
            onClick={createClerkPasskey}
            className="animate-pulse rounded border border-blue-300 bg-white px-4 py-2 font-bold text-blue-500 hover:bg-blue-700 hover:text-white"
          >
            Create a passkey now
          </button>
        )}
      </div>
    </header>
  );
}
