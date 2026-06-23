import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Section } from "./section"

const meta = {
  title: "Layout/Section",
  component: Section,
  tags: ["autodocs"],
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

const Band = ({ label }: { label: string }) => (
  <div className="bg-muted text-muted-foreground rounded-md border border-dashed px-4 text-sm">
    {label}
  </div>
)

export const Default: Story = {
  render: () => (
    <div className="divide-y">
      <Section>
        <Band label="Section · default spacing" />
      </Section>
      <Section spacing="sm">
        <Band label="Section · small spacing" />
      </Section>
    </div>
  ),
}
