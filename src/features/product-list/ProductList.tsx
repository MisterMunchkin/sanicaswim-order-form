'use client';

import type { Product } from '@/interfaces/product';

import useSwr from "swr";
import React from 'react';
import ProductCard from './ProductCard';

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
          <ProductCard product={product}></ProductCard>
        </div>
      ))}
    </div>
  )
}
