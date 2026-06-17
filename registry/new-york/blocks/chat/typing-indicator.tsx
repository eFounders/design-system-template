import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Typing indicator — "the assistant is writing". Three pulsing dots.
 * Respects prefers-reduced-motion (animation disabled). Always interruptible
 * upstream (the composer shows Stop).
 */
function TypingIndicator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="typing-indicator"
      role="status"
      aria-label="Assistant is typing"
      className={cn(
        "bg-card text-muted-foreground inline-flex items-center gap-1 rounded-lg border px-3 py-2.5",
        className
      )}
      {...props}
    >
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="size-1.5 animate-bounce rounded-full bg-current opacity-60 motion-reduce:animate-none"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  )
}

export { TypingIndicator }
