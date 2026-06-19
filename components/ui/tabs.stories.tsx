import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta = { title: "Components/Tabs" } satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-muted-foreground pt-2 text-sm">Overview content.</TabsContent>
      <TabsContent value="activity" className="text-muted-foreground pt-2 text-sm">Activity content.</TabsContent>
      <TabsContent value="settings" className="text-muted-foreground pt-2 text-sm">Settings content.</TabsContent>
    </Tabs>
  ),
}
