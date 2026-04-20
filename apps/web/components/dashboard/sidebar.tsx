"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GridViewIcon, Settings01Icon, Folder01Icon } from "@hugeicons/core-free-icons";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Icon } from "../shared/icon";
import { Logo } from "../shared/logo";

const NAV_ITEMS = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: GridViewIcon,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: Folder01Icon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings01Icon,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <ShadcnSidebar collapsible="offcanvas">
      <SidebarHeader className="h-16 md:h-20 flex items-start- justify-center border-b pt-4">
        <Logo mode="default" size="small" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const itemIcon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                      >
                        <Icon icon={itemIcon} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 flex items-center justify-center">
        <span className="text-xs text-muted-foreground truncate">Konfig v1.0</span>
      </SidebarFooter>
    </ShadcnSidebar >
  );
}
