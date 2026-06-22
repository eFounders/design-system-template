import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Label } from "./label"
import { Input } from "./input"

const meta = { title: "Base/Label", component: Label, tags: ["autodocs"] } satisfies Meta<typeof Label>
export default meta
type Story = StoryObj

export const Default: Story = { args: { children: "Email" } }

export const WithInput: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="you@startup.com" />
    </div>
  ),
}
