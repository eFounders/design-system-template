import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Tag — decorative, NON-semantic label (category, team, project, custom status).
 * The hue identifies; it does not mean "error" or "success" (that's Badge).
 * One hue = one category, stable over time. Uses the --tag-* token palette.
 */
const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap",
  {
    variants: {
      hue: {
        gray: "bg-[var(--tag-gray-bg)] text-[var(--tag-gray-fg)]",
        red: "bg-[var(--tag-red-bg)] text-[var(--tag-red-fg)]",
        orange: "bg-[var(--tag-orange-bg)] text-[var(--tag-orange-fg)]",
        amber: "bg-[var(--tag-amber-bg)] text-[var(--tag-amber-fg)]",
        green: "bg-[var(--tag-green-bg)] text-[var(--tag-green-fg)]",
        teal: "bg-[var(--tag-teal-bg)] text-[var(--tag-teal-fg)]",
        blue: "bg-[var(--tag-blue-bg)] text-[var(--tag-blue-fg)]",
        violet: "bg-[var(--tag-violet-bg)] text-[var(--tag-violet-fg)]",
        pink: "bg-[var(--tag-pink-bg)] text-[var(--tag-pink-fg)]",
      },
    },
    defaultVariants: { hue: "gray" },
  }
)

function Tag({
  className,
  hue,
  dot = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof tagVariants> & {
    /** show a leading color dot */
    dot?: boolean
  }) {
  return (
    <span data-slot="tag" className={cn(tagVariants({ hue }), className)} {...props}>
      {dot ? (
        <span
          aria-hidden
          className="size-1.5 rounded-full bg-current opacity-70"
        />
      ) : null}
      {props.children}
    </span>
  )
}

export { Tag, tagVariants }
