import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Protection } from "@/components/protection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zypher.ooguy.com'), // Replace with your actual domain
  title: {
    default: "~/blog - Thoughts",
    template: "%s | ~/blog"
  },
  description: "A blog about my thoughts on technology, programming, and life.",
  keywords: ["blog", "technology", "programming", "thoughts", "observations", "life", "articles", "essays", "me", "zypher", "ooguy", "development", "coding", "memories"],
  authors: [{ name: "Anonymous" }],
  creator: "Anonymous",
  publisher: "~/blog",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zypher.ooguy.com",
    siteName: "~/blog",
    title: "~/blog - Thoughts",
    description: "A blog about my thoughts on technology, programming, and life.",
    images: [
      {
        url: "/og-image.png", // Create this image later
        width: 1200,
        height: 630,
        alt: "~/blog - Thoughts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "~/blog - Thoughts",
    description: "A blog about my thoughts on technology, programming, and life.",
    images: ["/og-image.png"],
    creator: "@zypher", // Replace with your Twitter handle
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="blog-theme"
        >
          <Protection />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
