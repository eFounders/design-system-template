import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Slider } from "./slider"

const meta = { title: "Base/Slider", component: Slider, tags: ["autodocs"] } satisfies Meta<typeof Slider>
export default meta
type Story = StoryObj

export const Default: Story = { render: () => <Slider defaultValue={[50]} max={100} step={1} className="w-72" /> }
export const Range: Story = { render: () => <Slider defaultValue={[25, 75]} max={100} step={1} className="w-72" /> }
