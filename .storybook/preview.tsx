import type { Preview } from "@storybook/nextjs-vite"
import "../app/globals.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: "todo" },
    options: {
      storySort: {
        order: ["Get started", "Foundations", "Base"],
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-background text-foreground p-6">
        <Story />
      </div>
    ),
  ],
}

export default preview
