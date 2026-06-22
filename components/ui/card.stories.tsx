import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card"
import { Button } from "./button"
import { Label } from "./label"
import { Input } from "./input"

const meta = { title: "Base/Card", component: Card, tags: ["autodocs"] } satisfies Meta<typeof Card>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Acme Inc." />
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
}
