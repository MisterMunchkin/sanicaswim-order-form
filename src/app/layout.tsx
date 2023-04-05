import '@/styles/globals.css';
import { Montserrat } from 'next/font/google';

export const metadata = {
  title: 'Sanica Swim Order Form',
  description: 'Order your bikinies now!',
}

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
      <body>{children}</body>
    </html>
  )
}
