import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { FilterBar } from "./filter-bar"

const meta = {
  title: "@efounders/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    filters: ["Status", "Owner", "Date"],
    activeFilters: [{ id: "1", label: "Status: Active" }],
    resultCount: 42,
  },
}
