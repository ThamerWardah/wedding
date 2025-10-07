import { Great_Vibes, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${greatVibes.variable}`}>
        {children}
      </body>
    </html>
  )
}
