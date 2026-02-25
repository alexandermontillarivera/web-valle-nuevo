import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { geistMono } from '@/config/fonts'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Valle Nuevo - Parque Nacional | Documental Interactivo',
  description:
    'Explora el Parque Nacional Valle Nuevo de la Republica Dominicana. Descubre su biodiversidad, ecosistemas unicos, mapa 3D interactivo y esfuerzos de conservacion.',
  keywords: [
    'Valle Nuevo',
    'Parque Nacional',
    'Republica Dominicana',
    'biodiversidad',
    'bosque de pinos',
    'conservacion',
  ],
}

export const viewport: Viewport = {
  themeColor: '#1a3a2a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href="/logo.svg" type="image/svg" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
