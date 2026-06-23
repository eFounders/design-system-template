import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Container } from "./container"

const meta = {
  title: "Layout/Container",
  component: Container,
  tags: ["autodocs"],
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

const Demo = () => (
  <div className="bg-muted text-muted-foreground rounded-md border border-dashed p-4 text-sm">
    Content constrained and centered by the container.
  </div>
)

export const Default: Story = { render: () => <Container><Demo /></Container> }
export const Small: Story = { render: () => <Container size="sm"><Demo /></Container> }
export const Medium: Story = { render: () => <Container size="md"><Demo /></Container> }
export const Large: Story = { render: () => <Container size="lg"><Demo /></Container> }
