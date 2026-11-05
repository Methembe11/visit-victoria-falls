import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import LenisScroll from "@/components/LenisScroll";
import SiteFooter from "@/components/SiteFooter";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import AiConcierge from "@/components/AiConcierge";
import { images } from "@/data/site";

/*
 * Brand typography: Instrument Serif for editorial display, Manrope for body and interface.
 * Both are open-source Google Fonts, self-hosted by next/font at build time.
 */
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Visit Victoria Falls | Discover Victoria Falls, Zimbabwe",
    template: "%s | Visit Victoria Falls",
  },
  description:
    "An independent guide to Victoria Falls, Zimbabwe — experiences, places to stay, restaurants, local businesses and practical travel planning.",
  applicationName: "Visit Victoria Falls",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "Victoria Falls",
    "Zimbabwe travel",
    "Victoria Falls activities",
    "Victoria Falls accommodation",
    "Mosi-oa-Tunya",
    "Zambezi",
  ],
  openGraph: {
    type: "website",
    siteName: "Visit Victoria Falls",
    title: "Visit Victoria Falls | Discover Victoria Falls, Zimbabwe",
    description:
      "Experiences, places to stay, restaurants, local businesses and practical travel planning for Victoria Falls, Zimbabwe.",
    locale: "en_ZW",
    images: [
      {
        url: images.hero,
        alt: "Victoria Falls and the Zambezi gorge seen from the Zimbabwe side",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Victoria Falls",
    description:
      "Experiences, places to stay, restaurants and travel planning for Victoria Falls, Zimbabwe.",
    images: [images.hero],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#F5F1E8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${manrope.variable} h-full antialiased`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <LenisScroll />
        <main id="main">{children}</main>
        <SiteFooter />
        <AnalyticsProvider />
        <AiConcierge />
      </body>
    </html>
  );
}
