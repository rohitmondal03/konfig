import { Footer } from "../../components/layout/footer";
import { Navbar } from "../../components/layout/navbar";
import { CodeExample } from "../../components/sections/code-example";
import { CTASection } from "../../components/sections/cta";
import { FeatureGrid } from "../../components/sections/features";
import { HeroSection } from "../../components/sections/hero";
import { SDKInstall } from "../../components/sections/sdk-install";

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