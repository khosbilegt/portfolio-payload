import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './styles.css'

export const metadata = {
  description: 'Personal website of Koso Bilegsaikhan',
  title: 'koso.dev',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
