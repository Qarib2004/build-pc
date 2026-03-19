"use client";

import { useState } from "react";
import Link from "next/link";
import type { Session } from "next-auth";

export function MobileMenu({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-px w-5 bg-foreground transition-all duration-300 origin-center ${
            open ? "rotate-45 translate-y-[6px]" : ""
          }`}
        />
        <span
          className={`block h-px w-5 bg-foreground transition-all duration-300 ${
            open ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block h-px w-5 bg-foreground transition-all duration-300 origin-center ${
            open ? "-rotate-45 -translate-y-[6px]" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-14 left-0 w-full border-b border-border bg-background z-50">
          <nav className="container mx-auto flex flex-col px-4 py-4 gap-1">

            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground py-3 border-b border-border transition-colors"
            >
              Dashboard
            </Link>

            <Link
              href="/catalog"
              onClick={() => setOpen(false)}
              className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground py-3 border-b border-border transition-colors"
            >
              Catalog
            </Link>

            {session?.user ? (
              <Link
                href="/api/auth/signout"
                onClick={() => setOpen(false)}
                className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground py-3 transition-colors"
              >
                Sign Out
              </Link>
            ) : (
              <Link
                href="/api/auth/signin"
                onClick={() => setOpen(false)}
                className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground py-3 transition-colors"
              >
                Sign In
              </Link>
            )}

          </nav>
        </div>
      )}
    </>
  );
}