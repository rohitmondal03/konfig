import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CodeExample } from "@/components/landing/code-example";
import { CTASection } from "@/components/landing/cta";
import { FeatureGrid } from "@/components/landing/features";
import { HeroSection } from "@/components/landing/hero";
import { SDKInstall } from "@/components/landing/sdk-install";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground dark">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeatureGrid />
        <SDKInstall />
        <CodeExample />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}