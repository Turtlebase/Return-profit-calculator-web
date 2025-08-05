import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Returnprofit.online - D2C Profit & RTO Calculators',
    template: '%s | Returnprofit.online',
  },
  description: 'Free, AI-powered tools for D2C entrepreneurs. Calculate net profit, break-even ROAS, COD risk, and reduce RTO losses to scale profitably.',
  keywords: ['D2C', 'ecommerce', 'profit calculator', 'ROAS calculator', 'RTO reduction', 'COD risk', 'ecommerce profitability'],
  openGraph: {
    title: 'Returnprofit.online - D2C Profit & RTO Calculators',
    description: 'AI-powered tools for Direct-to-Consumer entrepreneurs to maximize profits and minimize losses.',
    url: 'https://returnprofit.online',
    siteName: 'Returnprofit.online',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
