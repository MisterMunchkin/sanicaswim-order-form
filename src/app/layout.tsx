import './globals.css'

export const metadata = {
  title: 'SanicaSwim Order Form',
  description: 'Order your bikinies now!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
