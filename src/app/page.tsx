import OrderContainer from '@/components/OrderContainer';

function Home() {
  return (
    <main className='flex max-h-full items-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className="w-full space-y-8">
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight pb-8 text-ss-blue'>Order Form</h2>
          <p className='text-center text-sm leading-6'>
            <a target="_blank" href="https://www.instagram.com/sanicaswim/" className="text-ss-blue underline decoration-wavy underline-offset-4 hover:underline hover:decoration-wavy sm:no-underline">@SanicaSwim</a> will DM to confirm your order after submission
          </p>
        </div>

        <OrderContainer></OrderContainer>
      </div>
    </main>
  )
}

export default Home;
