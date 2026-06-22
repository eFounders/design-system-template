import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Stat } from "./stat"

const meta = {
  title: "@efounders/Stat",
  component: Stat,
  tags: ["autodocs"],
} satisfies Meta<typeof Stat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: "Active users", value: "2,481", delta: "+12%", trend: "up" },
}

export const Row: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-3">
      <Stat label="Active users" value="2,481" delta="+12%" trend="up" />
      <Stat label="Churn" value="1.8%" delta="-0.3%" trend="down" />
      <Stat label="MRR" value="$48.2k" delta="+4%" trend="up" />
    </div>
  ),
}
