import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Container — constrains page width and centers content, with consistent
// horizontal padding. It encodes the project's max-width + gutter decision
// once, so screens stay consistent instead of each picking its own.
const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-3xl", // reading / forms
      md: "max-w-5xl", // default content
      lg: "max-w-7xl", // wide app pages
      full: "max-w-none",
    },
    padded: {
      true: "px-4 sm:px-6 lg:px-8",
      false: "",
    },
  },
  defaultVariants: {
    size: "lg",
    padded: true,
  },
})

function Container({
  className,
  size,
  padded,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof containerVariants>) {
  return (
    <div
      data-slot="container"
      className={cn(containerVariants({ size, padded, className }))}
      {...props}
    />
  )
}

export { Container, containerVariants }
