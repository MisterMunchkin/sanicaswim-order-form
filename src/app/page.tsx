import OrderForm from '@/components/order-form/order-form';
import ProductList from '@/components/product-list/product-list';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className='flex max-h-full items-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className="w-full space-y-8">
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight pb-8 text-ss-blue'>Order Form</h2>
          <p className='text-center text-sm leading-6'>
            <a target="_blank" href="https://www.instagram.com/sanicaswim/" className="text-ss-blue underline decoration-wavy underline-offset-4 hover:underline hover:decoration-wavy sm:no-underline">@SanicaSwim</a> will DM to confirm your order after submission
          </p>
        </div>

        <div className='flex flex-col sm:flex-row items-start justify-start sm:space-x-4 space-y-4 sm:space-y-0'>
          <OrderForm></OrderForm>
          <ProductList></ProductList>
        </div>
      </div>
    </main>
  )
}
