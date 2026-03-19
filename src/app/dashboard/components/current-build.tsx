'use client'

import { Button } from "@/components/UI/button"
import type { Component } from "@/lib/types"
import { useCallback, useState } from "react"
import { TableParts } from "./table"
import { componentCategories } from "@/lib/constants"
import { SaveBuildDialog } from "./save-build-dialog"

export const CurrentBuild = () => {
  const [selectedByCategory, setSelectedByCategory] = useState<Record<string, Component | null>>({})
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)

  const onSelectComponent = useCallback((categoryId: string, component: Component | null) => {
    setSelectedByCategory(prev => ({ ...prev, [categoryId]: component }))
  }, [])

  const selectedCount = Object.values(selectedByCategory).filter(Boolean).length
  const totalPrice = Object.values(selectedByCategory).reduce(
    (sum, c) => sum + (c?.price ?? 0), 0
  )

  return (
    <>
      <div className="flex flex-col gap-6 mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            PC Configurator
          </p>
          <h1 className="font-syne font-extrabold text-3xl sm:text-4xl tracking-tight leading-none">
            Build your own<br className="hidden sm:block" /> machine
          </h1>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {selectedCount > 0 && (
            <div className="flex items-center gap-4 border border-border rounded-lg px-4 py-2.5">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  Parts
                </span>
                <span className="font-bold text-sm tabular-nums">
                  {selectedCount} / {componentCategories.length}
                </span>
              </div>
              <div className="w-px h-6 bg-border" />
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  Total
                </span>
                <span className="font-bold text-sm tabular-nums">
                  ${new Intl.NumberFormat("en-US").format(totalPrice)}
                </span>
              </div>
            </div>
          )}

          <Button
            onClick={() => setSaveDialogOpen(true)}
            disabled={selectedCount === 0}
            className="font-syne font-bold tracking-tight"
          >
            To Assemble
          </Button>
        </div>
      </div>

      <div className="min-w-0 overflow-x-auto rounded-lg border border-border">
        <TableParts
          components={componentCategories}
          onSelectedComponent={onSelectComponent}
          selectedByCategory={selectedByCategory}
        />
      </div>

      <SaveBuildDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        selectedByCategory={selectedByCategory}
      />
    </>
  )
}