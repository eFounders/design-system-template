import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion"

const meta = { title: "Base/Accordion", component: Accordion, tags: ["autodocs"] } satisfies Meta<typeof Accordion>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It follows the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>Is it themed?</AccordionTrigger>
        <AccordionContent>Yes — entirely by the design tokens.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
