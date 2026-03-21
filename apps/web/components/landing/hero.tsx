import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CodeBlock } from "../ui/code-block"
import { URLS } from "@repo/shared"

export function HeroSection() {
  const sdkCode = `
    import { Konfig } from "@konfig/sdk"

    const konfig = new Konfig({
      \tapiKey: process.env.KONFIG_API_KEY
    })

    const dbUrl = await konfig.get("DATABASE_URL")
    console.log("Connected to", dbUrl)
  `

  return (
    <section className="relative overflow-hidden pt-24 pb-32">
      {/* Background glow similar to zed.dev */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-white/5 opacity-50 blur-[120px]" />

      <div className="container mx-auto px-4 max-w-6xl flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-white/80 backdrop-blur-md mb-8">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
          Konfig SDK v1.0 is now live
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Configuration management <br className="hidden md:block" />
          for modern apps.
        </h1>

        <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/60 mb-10 leading-relaxed">
          Store secrets securely. Fetch configs anywhere using the Konfig SDK.
          Stop hardcoding environment variables and build with confidence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto">
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

        {/* Code Preview */}
        <CodeBlock code={sdkCode} className="w-xl" />
      </div>
    </section>
  )
}
