"use client";

import { Button } from "@/components/ui/button";
import { Alert02Icon, RefreshCcw as RefreshCcwIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/shared/icon";
import { Outfit, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={cn("dark", "font-sans", inter.variable)}>
      <body className={`${outfit.className} bg-background text-foreground antialiased`}>
        <div className="flex min-h-screen flex-col items-center justify-center space-y-6 text-center px-4 relative overflow-hidden">
          <div className="relative z-10">
            <div className="absolute inset-0 animate-ping rounded-full bg-destructive/20 opacity-75"></div>
            <div className="relative rounded-full bg-destructive/10 p-6 ring-1 ring-destructive/20 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
              <Icon icon={Alert02Icon} size={56} className="text-destructive" />
            </div>
          </div>

          <div className="space-y-3 relative z-10">
            <h1 className="text-5xl font-bold tracking-tight">Fatal Error</h1>
            <p className="text-muted-foreground max-w-[550px] mx-auto text-xl">
              A critical error occurred while rendering the application layout.
            </p>
            <p className="text-sm text-muted-foreground/60 max-w-[500px] mx-auto pt-2">
              {error.message || "Unknown error"}
            </p>
          </div>

          <div className="pt-6 relative z-10">
            <Button onClick={reset} size="lg" className="h-12 px-8">
              <Icon icon={RefreshCcwIcon} size={18} className="mr-2" />
              Try again
            </Button>
          </div>

          {/* Decorative background gradients */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [bg-size:24px_24px] opacity-10 pointer-events-none"></div>
        </div>
      </body>
    </html>
  );
}
