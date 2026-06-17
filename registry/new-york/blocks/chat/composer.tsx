"use client"

import * as React from "react"
import { ArrowUp, Square } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * Composer — write and send a prompt.
 * Enter = send, Shift+Enter = newline. The Send button becomes Stop while
 * generating. Disabled state must explain why (e.g. quota reached).
 */
function Composer({
  placeholder = "Message the assistant…",
  generating = false,
  disabled = false,
  onSend,
  onStop,
  className,
}: {
  placeholder?: string
  generating?: boolean
  disabled?: boolean
  onSend?: (value: string) => void
  onStop?: () => void
  className?: string
}) {
  const [value, setValue] = React.useState("")

  function send() {
    const v = value.trim()
    if (!v || disabled) return
    onSend?.(v)
    setValue("")
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div
      data-slot="composer"
      className={cn(
        "bg-card focus-within:border-ring focus-within:ring-ring/50 flex items-end gap-2 rounded-lg border p-2 transition-[color,box-shadow] focus-within:ring-[3px]",
        disabled && "opacity-60",
        className
      )}
    >
      <textarea
        rows={1}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        className="placeholder:text-muted-foreground max-h-40 flex-1 resize-none bg-transparent px-1.5 py-1.5 text-sm outline-none disabled:cursor-not-allowed"
      />
      {generating ? (
        <Button size="icon" variant="secondary" onClick={onStop} aria-label="Stop">
          <Square className="size-3.5 fill-current" />
        </Button>
      ) : (
        <Button
          size="icon"
          onClick={send}
          disabled={disabled || !value.trim()}
          aria-label="Send"
        >
          <ArrowUp className="size-4" />
        </Button>
      )}
    </div>
  )
}

export { Composer }
