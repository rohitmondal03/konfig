import type { ReactNode } from 'react';
import { type Metadata } from 'next';
import { Outfit } from "next/font/google"
import { RootProvider } from 'fumadocs-ui/provider/next';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import './globals.css';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`flex flex-col min-h-screen ${outfit.className}`}>
        <RootProvider>
          <DocsLayout tree={source.pageTree}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}