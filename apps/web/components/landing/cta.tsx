import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { URLS } from "@repo/shared"

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden mx-auto max-w-4xl text-center space-y-8">
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
        Stop hardcoding <br className="hidden md:block" />
        <span className="text-white/50">environment variables.</span>
      </h2>

      <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
        Join thousands of developers managing secrets securely with Konfig.
        Get started for free today.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href={"/dashboard"}
          className={cn(
            buttonVariants({ variant: "default" }),
            "text-lg p-6"
          )}
        >
          Get Started
        </Link>
        <Link
          href={URLS.docs}
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "text-lg p-6"
          )}
          target="_blank"
        >
          View Docs
        </Link>
      </div>
    </section>
  )
}
