import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ChevronsUpDown } from "lucide-react"

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible"
import { Button } from "./button"

const meta = { title: "Base/Collapsible", component: Collapsible, tags: ["autodocs"] } satisfies Meta<typeof Collapsible>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Collapsible className="flex w-72 flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Recent activity</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <ChevronsUpDown className="size-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2 text-sm">
        <div className="rounded-md border px-3 py-2">Deployed to production</div>
        <div className="rounded-md border px-3 py-2">Merged PR #42</div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
