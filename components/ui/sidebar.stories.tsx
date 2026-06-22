import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Home, Inbox, Settings } from "lucide-react"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "./sidebar"

const meta = { title: "Base/Sidebar", component: Sidebar, tags: ["autodocs"] } satisfies Meta<typeof Sidebar>
export default meta
type Story = StoryObj

const items = [
  { title: "Home", icon: Home },
  { title: "Inbox", icon: Inbox },
  { title: "Settings", icon: Settings },
]

export const Default: Story = {
  render: () => (
    <div className="h-[420px] w-full overflow-hidden rounded-lg border">
      <SidebarProvider className="min-h-full">
        <Sidebar collapsible="none">
          <SidebarHeader className="px-3 py-2 text-sm font-semibold">@efounders</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex items-center justify-center gap-2 p-6 text-sm">
          <SidebarTrigger />
          Main content
        </SidebarInset>
      </SidebarProvider>
    </div>
  ),
}
