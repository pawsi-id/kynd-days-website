import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kynd Days - Family Massage & Reflexology",
    template: "%s | Kynd Days",
  },
  description:
    "Rasakan pengalaman relaksasi terbaik bersama keluarga di Kynd Days. Layanan pijat profesional dan refleksi dengan suasana nyaman dan terapis berpengalaman.",
  keywords: [
    "massage",
    "pijat",
    "reflexology",
    "refleksi",
    "spa",
    "relaksasi",
    "Jakarta",
    "keluarga",
    "aromatherapy",
    "hot stone",
    "thai massage",
  ],
  authors: [{ name: "Kynd Days" }],
  creator: "Kynd Days",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kynddays.com",
    siteName: "Kynd Days",
    title: "Kynd Days - Family Massage & Reflexology",
    description:
      "Rasakan pengalaman relaksasi terbaik bersama keluarga di Kynd Days.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kynd Days Family Massage & Reflexology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kynd Days - Family Massage & Reflexology",
    description:
      "Rasakan pengalaman relaksasi terbaik bersama keluarga di Kynd Days.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
