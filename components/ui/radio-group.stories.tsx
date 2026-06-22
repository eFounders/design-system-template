import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { RadioGroup, RadioGroupItem } from "./radio-group"

const meta = { title: "Base/RadioGroup" } satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="1" className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="1" /> One</label>
      <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="2" /> Two</label>
      <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="3" /> Three</label>
    </RadioGroup>
  ),
}
