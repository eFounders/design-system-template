import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Chat message — one conversation turn.
 * user: aligned right, on --accent. assistant: on --card with a hairline border,
 * holds rich content. Meta (name / timestamp) in --muted-foreground.
 */
function ChatMessage({
  role = "assistant",
  name,
  timestamp,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "role"> & {
  role?: "user" | "assistant"
  name?: string
  timestamp?: string
}) {
  const isUser = role === "user"
  return (
    <div
      data-slot="chat-message"
      data-role={role}
      className={cn(
        "flex w-full flex-col gap-1",
        isUser ? "items-end" : "items-start",
        className
      )}
      {...props}
    >
      {name || timestamp ? (
        <div className="text-muted-foreground flex items-center gap-2 px-1 text-xs">
          {name ? <span className="font-medium">{name}</span> : null}
          {timestamp ? <span>{timestamp}</span> : null}
        </div>
      ) : null}
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-accent text-accent-foreground"
            : "bg-card text-card-foreground border"
        )}
      >
        {children}
      </div>
    </div>
  )
}

export { ChatMessage }
