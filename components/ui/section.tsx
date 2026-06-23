import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Section — a vertical band of a page. It encodes the rhythm (vertical
// spacing) between the major parts of a screen, so pages breathe
// consistently instead of each section guessing its own padding.
const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-8",
      md: "py-12",
      lg: "py-16",
      xl: "py-24",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
})

function Section({
  className,
  spacing,
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ spacing, className }))}
      {...props}
    />
  )
}

export { Section, sectionVariants }
