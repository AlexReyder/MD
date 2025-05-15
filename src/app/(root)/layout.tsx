import { Header } from '@/widgets'
import { Footer } from '@/widgets/Footer/Footer'
import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import Script from 'next/script'
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
  description: "«Maldito» - легендарный питерский рок магазин метал мерча из Перу. Самый большой ассортимент футболок, лонгсливов и постеров для любителей тяжелой музыки и не только.",
  	openGraph: {
      title: '«Maldito» - легендарный питерский рок магазин метал мерча из Перу.',
      description:
        'Самый большой ассортимент футболок, лонгсливов и постеров для любителей тяжелой музыки и не только.',
      url: 'https://maldito.ru/',
      siteName: 'Maldito',
      images: [
        {
          url: 'https://maldito.ru/img/og.png', // Must be an absolute URL
          width: 1200,
          height: 630,
          alt: 'Самый большой ассортимент футболок, лонгсливов и постеров для любителей тяжелой музыки и не только.',
        },
      ],
      locale: 'ru_RU',
      type: 'website',
	},
	  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow"
  },
   applicationName: "Рок одежда | Maldito",
   appleWebApp: {
      title: "Рок одежда | Maldito",
      statusBarStyle: "default",
      capable: true
   },
  	alternates: {
      canonical: 'https://maldito.ru',
    },
    icons: {
    icon: [
      {
        url: "/img/favicon.ico",
        type: "image/x-icon"
      },
      {
        url: "/img/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
        {
        url: "/img/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
        {
        url: "/img/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png"
      },
        {
        url: "/img/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      }
    ],
    shortcut: [
      {
        url: "/img/favicon.ico",
        type: "image/x-icon"
      }
    ],
    apple: [
      {
        url: "/img/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png"
      },
      {
        url: "/img/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png"
      },
       {
        url: "/img/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png"
      },
       {
        url: "/img/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png"
      },
       {
        url: "/img/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png"
      },
       {
        url: "/img/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png"
      },
       {
        url: "/img/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png"
      },
       {
        url: "/img/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png"
      },
       {
        url: "/img/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png"
      },
    ]
  }
};

export const viewport: Viewport = {
  themeColor: 'light',
  width: "device-width",
  initialScale: 1,
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
      <Script async strategy="afterInteractive" id="analytics">
            {`

<!-- Yandex.Metrika counter -->

   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(12388639, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });


<!-- /Yandex.Metrika counter -->
            `}
          </Script>
    </html>
  );
}
