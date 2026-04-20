"use client";

import Link from "next/link";
import { UserNav } from "@/components/dashboard/user-nav";
import { CreateConfigDialog } from "@/components/dashboard/create-config-dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CreateConfigDialogTriggerButton } from "./create-config-dialog-trigger";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b border-secondary bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
      </div>

      <nav className="hidden mx-6 flex-col font-medium md:flex md:flex-row md:items-center   text-lg md:text-base gap-4 md:gap-5 lg:gap-8">
        <Link
          href="/dashboard"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Overview
        </Link>
        <Link
          href="/dashboard/projects"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Projects
        </Link>
        <Link
          href="/dashboard/settings"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Settings
        </Link>
      </nav>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          {/* We could place search here */}
        </div>
        <CreateConfigDialogTriggerButton />
        <UserNav />
      </div>
    </header>
  );
}
