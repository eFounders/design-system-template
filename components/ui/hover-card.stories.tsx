import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card"
import { Button } from "./button"

const meta = { title: "Base/HoverCard", component: HoverCard, tags: ["autodocs"] } satisfies Meta<typeof HoverCard>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@efounders</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 text-sm">
        A brand-agnostic design-system toolbox, distributed as a shadcn registry.
      </HoverCardContent>
    </HoverCard>
  ),
}
