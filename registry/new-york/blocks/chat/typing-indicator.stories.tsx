import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { TypingIndicator } from "./typing-indicator"

const meta = {
  title: "@efounders/Chat/TypingIndicator",
  component: TypingIndicator,
} satisfies Meta<typeof TypingIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
