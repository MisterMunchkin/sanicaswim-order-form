import type { Product } from "@/interfaces/product";
import { products } from "@/data/product-list.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const {searchParams} = request.nextUrl;
  const sort = searchParams.get("sort") // retrieving ?searchParam= for sorting/filtering

  return NextResponse.json(products, {status: 200});
}
