import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/product-list';
import type { Product } from '@/interfaces/product';

export async function GET(request: NextRequest, {params}) {
  const id = params.id
  const product = products.find(p => p.id === id);

  if (!product) {
    return NextResponse.json(undefined, {status:404, statusText: "No data available"});
  }

  return NextResponse.json(product, {status:200});
}