'use client'

import { Component } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/UI/dialog";
import { Input } from "@/components/UI/input";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/UI/button";
import { toast } from "sonner";
import { saveBuildAction, SaveBuildFromState } from "../action";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedByCategory: Record<string, Component | null>;
  defaultName?: string;
  redirectPath?: string;
};

const initialState: SaveBuildFromState = { status: "idle" };

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className="font-syne font-bold tracking-tight w-full sm:w-auto"
    >
      {pending ? "Saving..." : "Save Build"}
    </Button>
  );
}

export function SaveBuildDialog({
  open,
  onOpenChange,
  selectedByCategory,
  defaultName,
  redirectPath,
}: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(saveBuildAction, initialState);

  const components = useMemo(
    () =>
      Object.values(selectedByCategory).filter(
        (c): c is Component => c !== null
      ),
    [selectedByCategory]
  );

  const componentIds = useMemo(
    () => components.map((c) => c.id),
    [components]
  );

  const totalPrice = useMemo(
    () => components.reduce((sum, c) => sum + c.price, 0),
    [components]
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Build saved successfully");
      formRef.current?.reset();
      onOpenChange(false);
      if (redirectPath) {
        router.push(redirectPath);
      } else {
        router.refresh();
      }
    }
  }, [onOpenChange, redirectPath, router, state.status]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) formRef.current?.reset();
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-0 p-0 overflow-hidden max-w-md">

        <DialogHeader className="px-6 py-5 border-b border-border">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
            Finalize
          </p>
          <DialogTitle className="font-syne font-extrabold text-xl tracking-tight leading-none">
            Save Build
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Give your build a name to save it.
          </DialogDescription>
        </DialogHeader>

        {components.length > 0 && (
          <div className="px-6 py-4 border-b border-border bg-muted/40 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Parts selected
              </span>
              <span className="font-bold text-sm tabular-nums">
                {components.length}
              </span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex flex-col">
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Total price
              </span>
              <span className="font-bold text-sm tabular-nums">
                ${new Intl.NumberFormat("en-US").format(totalPrice)}
              </span>
            </div>
          </div>
        )}

        <form ref={formRef} action={formAction}>
          <div className="px-6 py-5 space-y-2">
            <label
              htmlFor="build-name"
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            >
              Build name
            </label>
            <Input
              id="build-name"
              name="name"
              placeholder="e.g. Gaming Beast, Work Station..."
              defaultValue={defaultName}
              required
              className="font-syne font-bold"
            />
            {state.status === "error" && (
              <p className="text-xs text-destructive font-mono">
                {state.message ?? "Something went wrong. Please try again."}
              </p>
            )}
            <input
              type="hidden"
              name="componentIds"
              value={componentIds.join(",")}
            />
          </div>

          <DialogFooter className="px-6 py-4 border-t border-border flex flex-col-reverse sm:flex-row gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="w-full sm:w-auto font-mono text-xs"
              >
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton disabled={componentIds.length === 0} />
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  );
}