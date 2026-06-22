import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ChatMessage } from "./message"

const meta = {
  title: "@efounders/Chat/Message",
  component: ChatMessage,
} satisfies Meta<typeof ChatMessage>

export default meta
type Story = StoryObj<typeof meta>

export const User: Story = {
  args: { role: "user", name: "You", children: "Summarize the deck in 3 bullets." },
}
export const Assistant: Story = {
  args: {
    role: "assistant",
    name: "Assistant",
    timestamp: "now",
    children: "Here are the three key points from the deck, focused on traction, the roadmap, and the ask.",
  },
}
