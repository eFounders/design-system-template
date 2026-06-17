import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Stat / KPI — one key number + label + optional trend.
 * 3-4 max per row. Never a pie chart. Trend uses --success / --destructive.
 */
function Stat({
  label,
  value,
  delta,
  trend,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  label: string
  value: React.ReactNode
  /** e.g. "+12%" */
  delta?: string
  trend?: "up" | "down" | "neutral"
}) {
  const trendColor =
    trend === "up"
      ? "text-success"
      : trend === "down"
        ? "text-destructive"
        : "text-muted-foreground"

  return (
    <div
      data-slot="stat"
      className={cn(
        "flex flex-col gap-1 rounded-lg border bg-card p-4",
        className
      )}
      {...props}
    >
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <span className="text-foreground text-2xl font-semibold tracking-tight tabular-nums">
        {value}
      </span>
      {delta ? (
        <span className={cn("text-xs font-medium tabular-nums", trendColor)}>
          {delta}
        </span>
      ) : null}
    </div>
  )
}

export { Stat }
