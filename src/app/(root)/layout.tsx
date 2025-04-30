import { Header } from '@/widgets'
import { Footer } from '@/widgets/Footer/Footer'
import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import './globalStyles/breadcrumbs.css'
import './globalStyles/globals.css'
import './globalStyles/quill.css'


const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight:["400", "500", "600", "700", "800"],
  display: 'swap'
});


export const metadata: Metadata = {
  metadataBase: new URL(`https://maldito.ru`),
  title: {
      template: '%s | Maldito',
      default: 'Рок одежда | Maldito',
    },
  description: "Рок одежда",
};

export const viewport: Viewport = {
  themeColor: 'light',
}


export default function RootLayout({
  modals,
  children,
}: Readonly<{
  modals: React.ReactNode,
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable}`}>
      <NuqsAdapter>
        <Header/>
        {modals}
        {children}
        <Footer/>
      </NuqsAdapter>
      </body>
    </html>
  );
}
