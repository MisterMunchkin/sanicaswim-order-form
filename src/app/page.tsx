import OrderContainer from '@/components/OrderContainer';
import { Metadata } from 'next';
import Image from 'next/image';
import backgroundImage from '../../public/gradient-bg.jpeg';

export const metadata: Metadata = {
  title: 'Sanica Swim',
  description: 'Sanica Swim order form.',
  keywords: ['Sanica', 'Swim', 'Order', 'Form', 'Bikinis', 'Swimwear', 'Beach', 'Vacation'],
  robots: {
    index: true,
    follow: true
  }
}

function Home() {
  return (
    <main className='flex max-h-full items-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='fixed w-screen h-screen top-0 left-0 -z-10'>
        <Image 
          src={backgroundImage}
          alt='background image'
          sizes='100vw'
          placeholder='blur'
          fill
          priority
        />
      </div>
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
