import Image from 'next/image';

function Home() {
  return (
    <main className='flex h-screen items-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='fixed w-screen h-screen top-0 left-0 -z-10 brightness-75'>
        <Image 
          src='/sanicaswim-bg.webp'
          alt='background image'
          sizes='100vw'
          fill
        />
      </div>
      <div className="w-full space-y-8">
        <div className='frosted-glass p-8 rounded-lg'>
          <h2 className='mt-6 text-center text-5xl font-bold tracking-tight pb-8 text-ss-pink'>Hey, babe 👩🏽‍💻</h2>
          <h2 className='text-center text-5xl font-bold tracking-tight pb-8 text-ss-pink'>🚧 We&apos;re under construction 🚧</h2>
          <p className='text-center text-l leading-6 text-white'>
            Our website is currently undergoing construction in hopes to make your experience here more enjoyable.
            <p className='mt-2'>
              Please DM <a target="_blank" href="https://www.instagram.com/sanicaswim/" className="text-ss-pink underline decoration-wavy underline-offset-4 hover:underline hover:decoration-wavy sm:no-underline">@SanicaSwim</a> to order.
            </p>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Home;
