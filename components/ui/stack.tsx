import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Stack — the workhorse for laying out elements in a column or row with a
// consistent gap from the spacing scale. Use it instead of ad-hoc
// `flex flex-col gap-*` so spacing stays on-system across screens.
const stackVariants = cva("flex", {
  variants: {
    direction: {
      col: "flex-col",
      row: "flex-row",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    wrap: {
      true: "flex-wrap",
      false: "",
    },
  },
  defaultVariants: {
    direction: "col",
    gap: "md",
    align: "stretch",
    justify: "start",
    wrap: false,
  },
})

function Stack({
  className,
  direction,
  gap,
  align,
  justify,
  wrap,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof stackVariants>) {
  return (
    <div
      data-slot="stack"
      className={cn(
        stackVariants({ direction, gap, align, justify, wrap, className })
      )}
      {...props}
    />
  )
}

export { Stack, stackVariants }
