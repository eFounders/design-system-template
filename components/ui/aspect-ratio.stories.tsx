import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AspectRatio } from "./aspect-ratio"

const meta = { title: "Base/AspectRatio", component: AspectRatio, tags: ["autodocs"] } satisfies Meta<typeof AspectRatio>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <AspectRatio ratio={16 / 9} className="bg-muted flex items-center justify-center rounded-lg">
        <span className="text-muted-foreground text-sm">16 / 9</span>
      </AspectRatio>
    </div>
  ),
}
