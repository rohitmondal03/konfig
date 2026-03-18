import { LockIcon, CodeIcon, GlobeIcon, KeyIcon, BlockedIcon, ZapIcon } from "@hugeicons/core-free-icons"
import { Icon } from "../shared/icon"

const FEATURES = [
  {
    icon: <Icon icon={LockIcon} />,
    title: "Secure Secret Storage",
    description: "End-to-end encryption ensures your sensitive data never leaves our servers in plaintext.",
  },
  // {
  //   icon: <Icon icon={CodeIcon} />,
  //   title: "SDK for Multiple Platforms",
  //   description: "Native SDKs for Node.js, Python, Go, and Rust. Integrate in minutes.",
  // },
  {
    icon: <Icon icon={BlockedIcon} />,
    title: "Environment Management",
    description: "Seamlessly switch between development, staging, and production configs.",
  },
  {
    icon: <Icon icon={KeyIcon} />,
    title: "Project-based API Keys",
    description: "Granular access control with automatically rotating API keys for enhanced security.",
  },
  // {
  //   icon: <Icon icon={GlobeIcon} />,
  //   title: "Fast Global Edge API",
  //   description: "Sub-50ms latency globally thanks to our globally distributed edge network.",
  // },
  {
    icon: <Icon icon={ZapIcon} />,
    title: "Simple Developer Experience",
    description: "Clean, intuitive dashboard and CLI that developers actually want to use.",
  },
]

export function FeatureGrid() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16 text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="text-white">Everything you need.</span> <br />
            <span className="text-white/40 ">Nothing you don't.</span>
          </h2>
          <p className="text-lg text-white/75">
            A developer-first platform designed to solve configuration management without the bloat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="space-y-6 relative overflow-hidden rounded-2xl border border-zinc-600 hover:border-zinc-600 bg-white/2 p-8 transition-all duration-300 ease-out hover:bg-white hover:text-black hover:scale-[1.03]"
            >
              <div className="inline-flex size-12 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                {<>{feature.icon}</>}
              </div>
              <div className="space-y-3 hover:text-black">
                <h3 className="text-lg font-semibold ">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
