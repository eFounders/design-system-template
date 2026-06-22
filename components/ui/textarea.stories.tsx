import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Textarea } from "./textarea"

const meta = { title: "Base/Textarea", component: Textarea, tags: ["autodocs"] } satisfies Meta<typeof Textarea>
export default meta
type Story = StoryObj

export const Default: Story = { args: { placeholder: "Type your message…" } }
export const Disabled: Story = { args: { placeholder: "Disabled", disabled: true } }
