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
    <div>
      {data.map((product) => (
        <span key={product.name}>
          {product.name}
          {product.price}

          <Image
            src={product.image}
            width="200"
            height="300"
            alt="Product Picture"
          />
        </span>
      ))}
    </div>
  )
}