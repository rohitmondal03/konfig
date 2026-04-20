import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchIcon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/shared/icon";
import { WEB_APP_PATH } from "@repo/shared";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-6 text-center px-4">
      <div className="relative">
        <div className="absolute inset-0 blur-3xl rounded-full bg-primary/20 opacity-50"></div>
        <div className="relative rounded-full bg-muted p-6 ring-1 ring-border/50 shadow-sm">
          <Icon icon={SearchIcon} size={48} className="text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">404 - Page Not Found</h1>
        <p className="text-muted-foreground max-w-[500px] mx-auto text-lg">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
        </p>
      </div>

      <div className="pt-6 relative z-10">
        <Button asChild size="lg" className="h-12 px-8">
          <Link href={WEB_APP_PATH.dashboard}>
            <Icon icon={ArrowLeft01Icon} size={18} className="mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {/* Decorative background gradients */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [bg-size:16px_16px] opacity-10 pointer-events-none"></div>
    </div>
  );
}
