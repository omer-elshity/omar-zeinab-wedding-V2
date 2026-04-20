import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omar & Zeinab Wedding",
  description: "We are honored to invite you to our wedding - May 11, 2026",
  metadataBase: new URL('https://omar-zeinab-wedding.vercel.app'),
  openGraph: {
    title: "Omar & Zeinab Wedding",
    description: "We are honored to invite you to our wedding - May 11, 2026",
    url: 'https://omar-zeinab-wedding.vercel.app',
    siteName: 'Omar & Zeinab Wedding',
    images: [
      {
        url: '/envelope.jpg', 
        width: 1200,
        height: 630,
        alt: 'Wedding Invitation Envelope',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Omar & Zeinab Wedding",
    description: "We are honored to invite you to our wedding - May 11, 2026",
    images: ['/envelope.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
