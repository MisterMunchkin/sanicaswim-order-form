import OrderForm from '@/components/order-form';

export default function Home() {
  return (
    <main className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight'>SanicaSwim Order Form</h2>
          <p className='mt-2 text-center text-sm'>
            Please fill out the form below! After you submit the form, @SanicaSwim will DM to confirm your order!
          </p>
        </div>

        <OrderForm></OrderForm>
      </div>
    </main>
  )
}
