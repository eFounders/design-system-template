import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Terminal } from "lucide-react"

import { Alert, AlertTitle, AlertDescription } from "./alert"

const meta = { title: "Base/Alert", component: Alert, tags: ["autodocs"] } satisfies Meta<typeof Alert>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Alert className="max-w-md">
      <Terminal className="size-4" />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-md">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
}
