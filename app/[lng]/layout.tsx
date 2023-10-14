import '../globals.css'
import type { Metadata } from 'next'
import { Inter, Noto_Sans_Arabic } from 'next/font/google'
 
import { SonnerToaster } from '@/components/ui/sonner-toaster';
import { Analytics } from "@vercel/analytics/react";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import AppProvider from '@/components/app-provider';
import Boostrap from '@/components/bootstrap';
import { languages } from '../i18n/settings';
import { dir } from 'i18next';
 
const arabicFont = Noto_Sans_Arabic({ 
  subsets: ['arabic']
 })
const inter = Inter({
  subsets: ['latin']
})
export const metadata: Metadata = {
  title: '',
  description: '',
}
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
export default function RootLayout({
  children,params: {lng}
}: {
  children: React.ReactNode,
  params
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={lng == 'ar' ? arabicFont.className: inter.className}>
        <AppProvider>
         {children} 
        </AppProvider>
        <SonnerToaster/>
         <Analytics />
         <Boostrap/>
         <TailwindIndicator />
      </body>
    </html>
  )
}
