import { NextApiRequest, NextApiResponse } from "next";
import type { Product } from "@/interfaces/product";
import { products } from "@/data/product-list.js";

export default function handler(req: NextApiRequest, res: NextApiResponse<Product[]>) {
  const getHandler = async () => {
    res.status(200).json(products);
  }

  switch (req.method) {
    case "GET":
      getHandler();
      break;

    default:
    break;
  }
}

