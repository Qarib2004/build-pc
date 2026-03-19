"use client"

import Link from "next/link"
import { Pencil } from "lucide-react"

type Props = {
  buildId: string
  ownerId: string
  sessionUserId?: string
}

export function EditBuildButton({ buildId, ownerId, sessionUserId }: Props) {
  if (sessionUserId !== ownerId) return null

  return (
    <Link
      href={`/builds/${buildId}/edit`}
      className="shrink-0 w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
    >
      <Pencil className="h-3.5 w-3.5" />
    </Link>
  )
}