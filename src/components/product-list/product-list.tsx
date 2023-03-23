'use client';

import type { Product } from '@/interfaces/product';
import useSwr from "swr";
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductList() {
  const { data, error, isLoading } = useSwr<Product[]>('/api/products', fetcher)

  if (error) return <div>Failed to load users</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  return (
    <div className="sm:grid sm:grid-cols-3 h-screen sm:h-[500px] space-y-3 sm:space-x-3 items-center overflow-y-scroll rounded-lg">
      {data.map((product) => (
        <div key={product.id} className="h-fit">
          <Image
            className="max-w-md w-full h-2/3 object-cover object-center rounded-lg shadow-md"
            src={product.image}
            width="200"
            height="300"
            alt="Product Picture"
          />
          <div className="relative px-4 -mt-16 max-w-md sm:max-w-xs w-full">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-8">
                <div className="text-gray-900 font-bold tracking-wider text-xl mb-2">
                  {product.name} - {product.price}
                </div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}