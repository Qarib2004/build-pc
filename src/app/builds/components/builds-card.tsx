"use client";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { EditBuildButton } from "./edit-build-button";

type BuildCard = {
  user: { email: string,id: string};
  id: string;
  name: string;
  totalPrice: number;
  createdAt: Date | null;
  components: Array<{
    id: string;
    component: { name: string };
  }>;
};

type Props = {
  build: BuildCard;
  children?: React.ReactNode;
  sessionUserId?: string;
};

export function BuildCard({ build, children,sessionUserId }: Props) {
  return (
    <div className="flex flex-col border border-border rounded-lg overflow-hidden hover:border-foreground/30 transition-colors">
      <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5 truncate">
            {build.user?.email?.trim()}
          </p>
          <h3 className="font-syne font-extrabold text-base tracking-tight leading-tight truncate">
            {build.name}
          </h3>
        </div>
        <EditBuildButton
  buildId={build.id}
  ownerId={build.user.id}
  sessionUserId={sessionUserId}
/>
      </div>

      {build.components.length > 0 && (
        <div className="px-5 py-4 flex-1 border-b border-border">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
            Components
          </p>
          <ul className="space-y-1.5">
            {build.components.map((bc) => (
              <li
                key={bc.id}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1 h-1 rounded-full bg-border shrink-0" />
                <span className="truncate">{bc.component.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="px-5 py-4 flex items-center justify-between gap-3 flex-wrap bg-muted/40">
        <div className="flex flex-col gap-0.5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Total
          </p>
          <p className="font-syne font-extrabold text-lg tabular-nums leading-none">
            ${new Intl.NumberFormat("en-US").format(build.totalPrice)}
          </p>
          {build.createdAt && (
            <p className="font-mono text-[10px] text-muted-foreground">
              {new Intl.DateTimeFormat("en-US").format(build.createdAt)}
            </p>
          )}
        </div>

        {children && (
          <div className="flex items-center gap-2 flex-wrap">{children}</div>
        )}
      </div>
    </div>
  );
}
