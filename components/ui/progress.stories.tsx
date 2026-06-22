import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Progress } from "./progress"

const meta = { title: "Base/Progress", component: Progress, tags: ["autodocs"] } satisfies Meta<typeof Progress>
export default meta
type Story = StoryObj

export const Default: Story = { render: () => <Progress value={60} className="w-72" /> }
export const Complete: Story = { render: () => <Progress value={100} className="w-72" /> }
