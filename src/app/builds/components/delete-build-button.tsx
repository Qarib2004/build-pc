'use client'

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  buildId: string;
  deleteAction: (formData: FormData) => void;
}

export function DeleteBuildButton({ buildId, deleteAction }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    toast("Are you sure you want to delete this build?", {
      action: {
        label: "Delete",
        onClick: () => {
          const fd = new FormData();
          fd.set("buildId", buildId);
          startTransition(() => deleteAction(fd));
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded border border-border text-muted-foreground hover:border-destructive hover:text-destructive disabled:opacity-40 disabled:pointer-events-none transition-colors"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}