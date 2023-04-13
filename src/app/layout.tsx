import '@/styles/globals.css';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ 
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className='bg-ss-pink'>
        {children}
      </body>
    </html>
  )
}
