import Link from "next/link"
import { GithubIcon, DashboardCircleIcon, } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/shared/icon"
import { Logo } from "../shared/logo"
import { URLS } from "@repo/shared"

const NAV_LINKS = [
  {
    href: URLS.docs,
    target: "_blank",
    title: "Docs",
  },
  {
    href: URLS.github,
    title: "Github",
    target: "_blank",
    icon: <Icon icon={GithubIcon} fill="#fff" />
  }
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-600 bg-background/60 backdrop-blur-xl py-2">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Simple Logo Placeholder */}
        <Logo mode="default" size="default" />

        <nav className="hidden md:flex items-center gap-4 font-medium">
          {NAV_LINKS.map(link => (
            <Link
              key={link.title}
              href={link.href}
              className={cn(
                buttonVariants({ variant: link.icon ? "secondary" : "link" }),
                "hover:text-white transition-colors gap-2"
              )}
              target={link.target}
            >
              {link.icon} {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "default" }),
              "gap-2"
            )}
          >
            Dashboard
            <Icon icon={DashboardCircleIcon} fill="#000" />
          </Link>
        </div>
      </div>
    </header>
  )
}
