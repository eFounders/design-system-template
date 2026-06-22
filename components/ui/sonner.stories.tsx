import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { toast } from "sonner"

import { Toaster } from "./sonner"
import { Button } from "./button"

const meta = { title: "Base/Sonner (Toast)", component: Toaster, tags: ["autodocs"] } satisfies Meta<typeof Toaster>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <>
      <Button
        variant="outline"
        onClick={() => toast("Changes saved", { description: "Your project is live." })}
      >
        Show toast
      </Button>
      <Toaster />
    </>
  ),
}
