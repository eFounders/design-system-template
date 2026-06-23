import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Stack } from "./stack"

const meta = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-muted text-muted-foreground rounded-md border px-3 py-2 text-sm">
    {children}
  </div>
)

export const Column: Story = {
  render: () => (
    <Stack gap="md">
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
}

export const Row: Story = {
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
}

export const SpaceBetween: Story = {
  render: () => (
    <Stack direction="row" justify="between" align="center">
      <Box>Left</Box>
      <Box>Right</Box>
    </Stack>
  ),
}
