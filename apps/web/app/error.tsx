"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert02Icon, ArrowLeft01Icon, RefreshCcw as RefreshCcwIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/shared/icon";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-6 text-center px-4">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-destructive/20 opacity-75"></div>
        <div className="relative rounded-full bg-destructive/10 p-6 ring-1 ring-destructive/20 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
          <Icon icon={Alert02Icon} size={48} className="text-destructive" />
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <h1 className="text-4xl font-bold tracking-tight">Something went wrong!</h1>
        <p className="text-muted-foreground max-w-[500px] mx-auto text-lg">
          An unexpected error has occurred. We've been notified and are looking into it.
          Please try again or head back home.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 relative z-10">
        <Button onClick={reset} size="lg" className="w-full sm:w-auto h-12 px-8">
          <Icon icon={RefreshCcwIcon} size={18} className="mr-2" />
          Try again
        </Button>
        <Button variant="outline" asChild size="lg" className="w-full sm:w-auto h-12 px-8">
          <Link href="/">
            <Icon icon={ArrowLeft01Icon} size={18} className="mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Decorative background gradients */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [bg-size:16px_16px] opacity-10 pointer-events-none"></div>
    </div>
  );
}
