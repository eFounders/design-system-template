import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./resizable"

const meta = {
  title: "Base/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ResizablePanelGroup>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="h-48 w-96 rounded-lg border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-sm">Sidebar</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-sm">Content</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
