import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { SizeSelect } from './SizeSelect';
import { Product } from '@/interfaces/product';
import { useAppDispatch } from '../../hooks';
import { add } from './selectedProductListSlice';
import { SelectedProduct } from '@/interfaces/selected-product';
import { useCallback, useState } from 'react';
import { SizeTypes } from '../../enums/size';

interface ProductCardProps {
  product: Product
}

export default function ProductCard({product}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    size: SizeTypes.S
  })

  const handleAddToCart = (product: Product) => {
    dispatch(add(selectedProduct));
  }

  const handleSizeChange = useCallback(
    (selectedSize: string) => {
      //update product
      let typedSizeString = selectedSize as keyof typeof SizeTypes;
      selectedProduct.size = SizeTypes[typedSizeString];

      setSelectedProduct(selectedProduct);
    },
    [selectedProduct]
  );

  return (
    <div>
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
              onClick={() => handleAddToCart(product)}
            >
            </ShoppingCartIcon>
          </a>

          {product.sizeOptions &&
            <SizeSelect sizeOptions={product.sizeOptions} handleSizeChange={handleSizeChange}></SizeSelect>
          }
        </div>
      </div>
    </div>
  )
}