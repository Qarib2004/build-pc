'use client'

import { DialogContent, DialogHeader, DialogTitle } from "@/components/UI/dialog";
import { Component } from "@/lib/types";
import { useEffect, useState } from "react";
import { ComponentCard } from "./component-card";
import { getComponentsByCategory } from "../action";

type Props = {
  categoryId: string;
  categoryName: string;
  onSelect: (component: Component) => void;
};

export function AddComponentDialogContent({
  categoryId,
  categoryName,
  onSelect,
}: Props) {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComponentsByCategory(categoryId).then((data) => {
      setComponents(data);
      setLoading(false);
    });
  }, [categoryId]);

  return (
    <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col gap-0 p-0">

      <DialogHeader className="px-6 py-5 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Add component
            </p>
            <DialogTitle className="font-syne font-extrabold text-xl tracking-tight leading-none">
              {categoryName}
            </DialogTitle>
          </div>
        </div>
      </DialogHeader>

      <div className="overflow-y-auto flex-1 px-6 py-5">

        {loading && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-lg border border-border bg-muted/40 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && components.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              No components found
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              There are no available components in this category yet.
            </p>
          </div>
        )}

        {!loading && components.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((c) => (
              <ComponentCard
                key={c.id}
                name={c.name}
                price={c.price}
                onClick={() => onSelect(c)}
              />
            ))}
          </div>
        )}

      </div>
    </DialogContent>
  );
}