import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "./button"

const meta = {
  title: "Base/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { children: "Primary" } }
export const Secondary: Story = { args: { variant: "secondary", children: "Secondary" } }
export const Outline: Story = { args: { variant: "outline", children: "Outline" } }
export const Ghost: Story = { args: { variant: "ghost", children: "Ghost" } }
export const Destructive: Story = { args: { variant: "destructive", children: "Destructive" } }

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
}
