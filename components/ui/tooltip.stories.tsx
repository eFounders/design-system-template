import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { Button } from "./button"

const meta = { title: "Base/Tooltip" } satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>A brief hint</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
