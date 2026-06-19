import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Switch } from "./switch"

const meta = { title: "Components/Switch", component: Switch, tags: ["autodocs"] } satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { defaultChecked: true } }
export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm">
      <Switch defaultChecked /> Notifications
    </label>
  ),
}
