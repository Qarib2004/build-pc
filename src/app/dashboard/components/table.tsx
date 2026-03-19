'use client'

import {
  Dialog,
  DialogTrigger
} from '@/components/UI/dialog'
import { Component, ComponentCategory } from "@/lib/types";
import { Box, Cpu, Fan, HardDrive, MemoryStick, Monitor, Plus, Server, Trash2, Zap } from "lucide-react";
import { useState } from "react";
import { AddComponentDialogContent } from './add-component-dialog';

const iconMap: Record<ComponentCategory['icon'], React.ElementType> = {
  Cpu, Monitor, Server, MemoryStick, HardDrive, Zap, Box, Fan
}

type CategoryRow = {
  id: string;
  name: string;
  icon: string;
}

type Props = {
  components: CategoryRow[];
  selectedByCategory: Record<string, Component | null>;
  onSelectedComponent: (categoryId: string, component: Component | null) => void;
}

export function TableParts({ components, selectedByCategory, onSelectedComponent }: Props) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  const totalPrice = Object.values(selectedByCategory).reduce(
    (sum, c) => sum + (c?.price ?? 0), 0
  );

  const selectedCount = Object.values(selectedByCategory).filter(Boolean).length;

  return (
    <div className="w-full">

      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground w-12" />
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Type</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Model</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Price</th>
              <th className="text-right px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {components.map(category => {
              const Icon = iconMap[category.icon];
              const selected = selectedByCategory[category.id];

              return (
                <tr key={category.id} className="group hover:bg-muted/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-sm">{category.name}</span>
                  </td>
                  <td className="px-5 py-4">
                    {selected ? (
                      <span className="text-sm">{selected.name}</span>
                    ) : (
                      <span className="font-mono text-[11px] text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {selected ? (
                      <span className="font-mono font-bold text-sm tabular-nums">
                        ${new Intl.NumberFormat("en-US").format(selected.price)}
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {selected && (
                        <button
                          onClick={() => onSelectedComponent(category.id, null)}
                          className="w-7 h-7 flex items-center justify-center rounded border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <Dialog
                        open={openCategoryId === category.id}
                        onOpenChange={(open) => setOpenCategoryId(open ? category.id : null)}
                      >
                        <DialogTrigger asChild>
                          <button className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors">
                            <Plus className="h-3 w-3" />
                            {selected ? "Change" : "Add"}
                          </button>
                        </DialogTrigger>
                        <AddComponentDialogContent
                          categoryId={category.id}
                          categoryName={category.name}
                          onSelect={(c) => {
                            onSelectedComponent(category.id, c);
                            setOpenCategoryId(null);
                          }}
                        />
                      </Dialog>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr className="border-t-2 border-border">
              <td colSpan={3} className="px-5 py-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {selectedCount} of {components.length} parts selected
                </span>
              </td>
              <td colSpan={2} className="px-5 py-4 text-right">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Total</p>
                <p className="font-syne font-extrabold text-xl tabular-nums">
                  ${new Intl.NumberFormat("en-US").format(totalPrice)}
                </p>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="md:hidden divide-y divide-border">
        {components.map(category => {
          const Icon = iconMap[category.icon];
          const selected = selectedByCategory[category.id];

          return (
            <div key={category.id} className="px-4 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded border border-border flex items-center justify-center text-muted-foreground shrink-0">
                <Icon className="h-4 w-4" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{category.name}</p>
                {selected ? (
                  <>
                    <p className="text-xs text-muted-foreground truncate">{selected.name}</p>
                    <p className="font-mono text-xs font-bold tabular-nums">
                      ${new Intl.NumberFormat("en-US").format(selected.price)}
                    </p>
                  </>
                ) : (
                  <p className="font-mono text-[10px] text-muted-foreground">Not selected</p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {selected && (
                  <button
                    onClick={() => onSelectedComponent(category.id, null)}
                    className="w-7 h-7 flex items-center justify-center rounded border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
                <Dialog
                  open={openCategoryId === category.id}
                  onOpenChange={(open) => setOpenCategoryId(open ? category.id : null)}
                >
                  <DialogTrigger asChild>
                    <button className="w-7 h-7 flex items-center justify-center rounded border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </DialogTrigger>
                  <AddComponentDialogContent
                    categoryId={category.id}
                    categoryName={category.name}
                    onSelect={(c) => {
                      onSelectedComponent(category.id, c);
                      setOpenCategoryId(null);
                    }}
                  />
                </Dialog>
              </div>
            </div>
          );
        })}

        <div className="px-4 py-4 flex items-center justify-between bg-muted/40">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {selectedCount} / {components.length} parts
          </span>
          <div className="text-right">
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Total</p>
            <p className="font-syne font-extrabold text-lg tabular-nums">
              ${new Intl.NumberFormat("en-US").format(totalPrice)}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}