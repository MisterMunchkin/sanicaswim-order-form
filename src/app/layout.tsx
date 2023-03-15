import '@/styles/globals.css';
import { Montserrat } from 'next/font/google';

export const metadata = {
  title: 'SanicaSwim Order Form',
  description: 'Order your bikinies now!',
}

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} font-sans`}>
      <body>{children}</body>
    </html>
  )
}
