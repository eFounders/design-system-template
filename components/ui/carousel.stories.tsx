import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./carousel"

const meta = { title: "Base/Carousel", component: Carousel, tags: ["autodocs"] } satisfies Meta<typeof Carousel>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Carousel className="w-64">
      <CarouselContent>
        {Array.from({ length: 5 }, (_, i) => (
          <CarouselItem key={i}>
            <div className="bg-muted flex aspect-square items-center justify-center rounded-lg text-3xl font-semibold">
              {i + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
