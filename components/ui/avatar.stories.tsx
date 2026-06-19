import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Avatar, AvatarFallback } from "./avatar"

const meta = { title: "Components/Avatar" } satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar><AvatarFallback>NS</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>RX</AvatarFallback></Avatar>
    </div>
  ),
}
