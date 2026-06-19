import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"
import { Button } from "../../registry/new-york/ui/button"

const meta = { title: "Components/Sheet" } satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Open drawer</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Details</SheetTitle>
          <SheetDescription>A side panel for drill-in.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}
