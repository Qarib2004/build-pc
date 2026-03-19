'use client'

import { SaveBuildDialog } from "@/app/dashboard/components/save-build-dialog";
import { TableParts } from "@/app/dashboard/components/table";
import { componentCategories } from "@/lib/constants";
import { Component, dbTypeToCategoryId } from "@/lib/types";
import { useCallback, useMemo, useState } from "react";

type BuildComponentInput = {
  id: string;
  name: string;
  price: number;
  type: Component['type'];
  socket: string | null;
}

type Props = {
  buildName: string;
  buildComponents: BuildComponentInput[];
}

function buildInitialSelected(
  buildComponents: BuildComponentInput[],
): Record<string, Component | null> {
  const selected: Record<string, Component | null> = {};

  for (const c of buildComponents) {
    const categoryId = dbTypeToCategoryId[c.type];
    if (categoryId) {
      selected[categoryId] = {
        id: c.id,
        name: c.name,
        price: c.price,
        type: c.type,
        socket: c.socket,
      };
    }
  }

  return selected;
}

export function EditBuildForm({ buildName, buildComponents }: Props) {
  const initialSelected = useMemo(
    () => buildInitialSelected(buildComponents),
    [buildComponents]
  );

  const [selectedByCategory, setSelectedByCategory] =
    useState<Record<string, Component | null>>(initialSelected);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const onSelectedComponent = useCallback(
    (categoryId: string, component: Component | null) => {
      setSelectedByCategory((prev) => ({ ...prev, [categoryId]: component }));
    }, []
  );

  const selectedCount = Object.values(selectedByCategory).filter(Boolean).length;
  const totalPrice = Object.values(selectedByCategory).reduce(
    (sum, c) => sum + (c?.price ?? 0), 0
  );

  return (
    <>
      <div className="flex flex-col gap-6 mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Editing build
          </p>
          <h2 className="font-syne font-extrabold text-2xl md:text-3xl tracking-tight leading-none">
            {buildName}
          </h2>
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

          <button
            onClick={() => setSaveDialogOpen(true)}
            className="font-syne font-bold text-sm px-5 py-2.5 rounded bg-foreground text-background hover:opacity-80 transition-opacity"
          >
            Save Build
          </button>
        </div>
      </div>

      <div className="min-w-0 overflow-x-auto rounded-lg border border-border">
        <TableParts
          components={componentCategories}
          selectedByCategory={selectedByCategory}
          onSelectedComponent={onSelectedComponent}
        />
      </div>

      <SaveBuildDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        selectedByCategory={selectedByCategory}
        defaultName={buildName}
        redirectPath="/builds"
      />
    </>
  );
}