import { Header } from '@/widgets'
import { Footer } from '@/widgets/Footer/Footer'
import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import './globalStyles/auth-popup.css'
import './globalStyles/breadcrumbs.css'
import './globalStyles/cart-popup.css'
import './globalStyles/catalog-menu.css'
import './globalStyles/cookie-popup.css'
import './globalStyles/footer.css'
import './globalStyles/globals.css'
import './globalStyles/header-profile.css'
import './globalStyles/header.css'
import './globalStyles/map.css'
import './globalStyles/menu.css'
import './globalStyles/mobile-navbar.css'
import './globalStyles/normalize.css'
import './globalStyles/search-modal.css'
import './globalStyles/slick-theme.css'
import './globalStyles/slick.css'

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight:["400", "500", "600", "700", "800"]
});


export const metadata: Metadata = {
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
        <Header/>
        {modals}
        {children}
        <Footer/>
      </body>
    </html>
  );
}
