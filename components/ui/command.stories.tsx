import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Calendar, Settings, User } from "lucide-react"

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./command"

const meta = { title: "Base/Command", component: Command, tags: ["autodocs"] } satisfies Meta<typeof Command>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Command className="w-72 rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="size-4" /> Calendar
          </CommandItem>
          <CommandItem>
            <User className="size-4" /> Profile
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <Settings className="size-4" /> Preferences
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
