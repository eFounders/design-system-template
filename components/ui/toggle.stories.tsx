import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Bold } from "lucide-react"

import { Toggle } from "./toggle"

const meta = { title: "Base/Toggle", component: Toggle, tags: ["autodocs"] } satisfies Meta<typeof Toggle>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="size-4" />
    </Toggle>
  ),
}

export const WithText: Story = { render: () => <Toggle>Italic</Toggle> }
export const Outline: Story = { render: () => <Toggle variant="outline">Outline</Toggle> }
