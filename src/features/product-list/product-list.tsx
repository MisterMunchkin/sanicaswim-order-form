'use client';

import type { Product } from '@/interfaces/product';
import useSwr from "swr";
import Image from 'next/image';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductList() {
  const { data, error, isLoading } = useSwr<Product[]>('/api/products', fetcher)

  if (error) return <div>Failed to load users</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  return (
    <div className="lg:grid lg:grid-cols-3 h-screen sm:h-[500px] items-center overflow-y-scroll rounded-lg">
      {data.map((product) => (
        <div key={product.id} className="h-fit p-3 hover:drop-shadow-lg ease-in-out duration-300">
          <Image
            className="max-w-md w-full h-2/3 object-cover object-center rounded-lg"
            src={product.image}
            width="200"
            height="300"
            alt="Product Picture"
          />
          <div className="relative px-4 -mt-16 max-w-md sm:max-w-xs w-full">
            <div className="bg-white pt-3 pb-3 pl-3 pr-12 rounded-lg h-content">
              <div className="mb-2">
                <div className="text-gray-900 font-medium tracking-wider text-lg mb-2">
                  {product.name} 
                </div>
                <div className="font-bold">
                  {product.price} PHP
                </div>
              </div>

              <a className='absolute top-2 ease-in-out duration-300 right-6 w-9 h-9 flex items-center justify-center rounded-lg text-center no-underline bg-ss-blue text-ss-pink hover:bg-ss-pink hover:text-ss-blue cursor-pointer'>
                <ShoppingCartIcon
                  className='w-6 h-6'
                >
                </ShoppingCartIcon>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}