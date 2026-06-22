import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Tag } from "./tag"

const meta = {
  title: "@efounders/Tag",
  component: Tag,
  tags: ["autodocs"],
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { hue: "blue", dot: true, children: "Design" } }

export const AllHues: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["gray", "red", "orange", "amber", "green", "teal", "blue", "violet", "pink"] as const).map(
        (h) => (
          <Tag key={h} hue={h} dot>
            {h}
          </Tag>
        )
      )}
    </div>
  ),
}
