import { Component } from "@/lib/types";

type Props = {
  name: string;
  price: number;
  onClick?: () => void;
};

export function ComponentCard({ name, price, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left border border-border rounded-lg p-4 bg-background hover:border-foreground hover:bg-muted/40 transition-all duration-150 flex flex-col gap-3"
    >
      <div className="flex-1">
        <p className="font-syne font-bold text-sm leading-tight text-foreground line-clamp-2">
          {name}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-sm font-bold tabular-nums text-foreground">
          ${new Intl.NumberFormat("en-US").format(price)}
        </span>

        <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Add
        </span>
      </div>
    </button>
  );
}