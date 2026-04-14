import Link from "next/link"
import { GithubIcon, Target } from "@hugeicons/core-free-icons"
import { Icon } from "../shared/icon"
import { Logo } from "../shared/logo"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { DOCS_SITE_URL, GITHUB_URL, WEB_APP_PATH } from "@repo/shared"

const FOOTER_LINKS = [
  {
    href: DOCS_SITE_URL,
    title: "Docs",
    target: "_blank"
  },
  {
    href: WEB_APP_PATH.dashboard,
    title: "Dashboard",
    target: "_self"
  },
  {
    href: GITHUB_URL,
    title: "Github",
    target: "_blank",
    icon: <Icon icon={GithubIcon} fill="#fff" />
  },
]

export function Footer() {
  return (
    <footer className="border-t border-white/20 bg-background py-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <Logo mode="dark" size="default" />

        <div className="flex flex-wrap items-center justify-center gap-x-4 text-sm">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: link.icon ? "secondary" : "ghost" }),
              )}
              target={link.target}
            >
              {link.icon} {link.title}
            </Link>
          ))}
        </div>

        <div className="text-sm text-white/40">
          &copy; {new Date().getFullYear()} Konfig, Inc. All rights reserved.
        </div>
      </div>
    </footer >
  )
}
