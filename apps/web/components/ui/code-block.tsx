"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string,
  className?: string,
}

export function CodeBlock({ code, language = "typescript", title, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "relative rounded-xl border border-white/50 bg-[#0A0A0A] text-sm",
        "shadow-[0_0_40px_rgba(255,255,255,0.05)]",
        "text-left",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/30">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-red-500" />
          <span className="size-3 rounded-full bg-yellow-500" />
          <span className="size-3 rounded-full bg-green-500" />
        </div>

        {title && (
          <span className="text-xs text-muted-foreground">
            {title}
          </span>
        )}

        <Button
          onClick={handleCopy}
          size={"xs"}
          variant={"ghost"}
          className="cursor-pointer"
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-white">
          {code}
        </code>
      </pre>
    </div>
  )
}