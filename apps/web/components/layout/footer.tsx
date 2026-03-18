import { GithubIcon } from "@hugeicons/core-free-icons"
import { Icon } from "../shared/icon"
import { Logo } from "../shared/logo"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"

const FOOTER_LINKS = [
  {
    href: "/docs",
    title: "Docs",
  },
  {
    href: "/dashboard",
    title: "Dashboard",
  },
  {
    href: "https://github.com",
    title: "Github",
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
              href={link.href}
              className={cn(
                buttonVariants({ variant: link.icon ? "secondary" : "ghost" }),
              )}
              target={link.icon ? "_blank" : "_self"}
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
