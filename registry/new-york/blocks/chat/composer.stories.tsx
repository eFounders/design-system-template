import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Composer } from "./composer"

const meta = {
  title: "@efounders/Chat/Composer",
  component: Composer,
} satisfies Meta<typeof Composer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { placeholder: "Message the assistant…" } }
export const Generating: Story = { args: { generating: true } }
export const Disabled: Story = { args: { disabled: true, placeholder: "Quota reached" } }
