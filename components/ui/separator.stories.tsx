import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Separator } from "./separator"

const meta = { title: "Base/Separator", component: Separator, tags: ["autodocs"] } satisfies Meta<typeof Separator>
export default meta
type Story = StoryObj

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-sm">Above the line</p>
      <Separator className="my-3" />
      <p className="text-sm">Below the line</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3 text-sm">
      Home
      <Separator orientation="vertical" />
      Docs
      <Separator orientation="vertical" />
      Settings
    </div>
  ),
}
