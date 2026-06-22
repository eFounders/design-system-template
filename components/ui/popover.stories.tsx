import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Popover, PopoverTrigger, PopoverContent } from "./popover"
import { Button } from "./button"
import { Label } from "./label"
import { Input } from "./input"

const meta = { title: "Base/Popover", component: Popover, tags: ["autodocs"] } satisfies Meta<typeof Popover>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-72 flex-col gap-3">
        <p className="text-sm font-medium">Dimensions</p>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="w">Width</Label>
          <Input id="w" defaultValue="100%" />
        </div>
      </PopoverContent>
    </Popover>
  ),
}
