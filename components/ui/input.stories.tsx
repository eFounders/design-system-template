import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Input } from "./input"

const meta = {
  title: "Base/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { placeholder: "you@startup.com" } }
export const Disabled: Story = { args: { placeholder: "Disabled", disabled: true } }
export const Invalid: Story = { args: { placeholder: "Invalid", "aria-invalid": true } }
