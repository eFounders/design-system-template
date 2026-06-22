import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ScrollArea } from "./scroll-area"

const meta = { title: "Base/ScrollArea", component: ScrollArea, tags: ["autodocs"] } satisfies Meta<typeof ScrollArea>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-md border p-4">
      <div className="flex flex-col gap-2 text-sm">
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} className="border-b pb-2">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
