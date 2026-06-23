import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "./button"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Container } from "./container"
import { PageHeader } from "./page-header"
import { Section } from "./section"
import { Stack } from "./stack"

const meta = {
  title: "Layout/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Settings",
    description: "Manage your workspace and preferences.",
  },
}

export const WithActions: Story = {
  args: {
    title: "Members",
    description: "People with access to this workspace.",
    actions: (
      <>
        <Button variant="outline">Export</Button>
        <Button>Invite</Button>
      </>
    ),
  },
}

// A full page archetype: Container + PageHeader + Section + Stack + Cards.
// This is what "use the composition layer" looks like in practice.
export const FullPage: Story = {
  args: { title: "Knowledge base" },
  render: () => (
    <Container size="md">
      <Section>
        <Stack gap="lg">
          <PageHeader
            title="Knowledge base"
            description="Guides and references for the team."
            actions={<Button>New article</Button>}
          />
          <Stack direction="row" gap="md" wrap>
            {["Getting started", "Guides", "API reference"].map((name) => (
              <Card key={name} className="w-64">
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Last updated today.
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Section>
    </Container>
  ),
}
