import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Checkbox } from "./checkbox"

const meta = { title: "Base/Checkbox", component: Checkbox, tags: ["autodocs"] } satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { defaultChecked: true } }
export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox defaultChecked /> Email me updates
    </label>
  ),
}
