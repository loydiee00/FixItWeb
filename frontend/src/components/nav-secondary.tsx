import * as React from "react"
import { type LucideIcon } from "lucide-react"

import {
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items,
  onSectionChange,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
  onSectionChange?: (section: string) => void
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
       <SidebarGroupLabel>Help & Feedback</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <button
                  onClick={() => onSectionChange?.(item.url)}
                  className="flex items-center space-x-2 w-full text-left"
                >
                  <item.icon />
                  <span>{item.title}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
