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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('theme');var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=s|| (prefersDark?'dark':'light');if(theme==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()",
          }}
        />
      </head>
      <body>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
