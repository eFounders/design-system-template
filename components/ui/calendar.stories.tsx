import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"

import { Calendar } from "./calendar"

const meta = { title: "Base/Calendar", component: Calendar, tags: ["autodocs"] } satisfies Meta<typeof Calendar>
export default meta
type Story = StoryObj

function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
}

export const Default: Story = { render: () => <CalendarDemo /> }
