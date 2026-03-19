"use client";

import { useState } from "react";
import Link from "next/link";
import type { Session } from "next-auth";
import { LayoutList, Plus, Users, LogIn } from "lucide-react"; 
import { signOut } from "next-auth/react";
import { Button } from "./UI/button";
import { ThemeToggle } from "./theme-toggle";

export function MobileMenu({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
        aria-label="Toggle menu"
      >
        <span className={`block h-px w-5 bg-foreground transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
        <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block h-px w-5 bg-foreground transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-14 left-0 w-full border-b border-border bg-background z-50">
          <nav className="container mx-auto flex flex-col px-4 py-4 gap-1">
            
            <Link href="/dashboard" onClick={() => setOpen(false)} className="flex gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground py-3 border-b border-border transition-colors">
              <Plus className="h-4 w-4"/> Dashboard
            </Link>

            <Link href="/builds" onClick={() => setOpen(false)} className="flex gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground py-3 border-b border-border transition-colors">
              <LayoutList className="h-4 w-4" /> My builds
            </Link>

            <Link href="/builds/explore" onClick={() => setOpen(false)} className="flex gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground py-3 border-b border-border transition-colors">
              <Users className="h-4 w-4" /> Public builds
            </Link>

            
            <div className="pt-2">
              {session ? (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 font-mono text-[11px] uppercase tracking-widest text-red-500 hover:text-red-600"
                  size="sm"
                  onClick={() => signOut({ redirectTo: '/' })}
                >
                  Exit
                </Button>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)} className="w-full">
                  <Button
                    variant="default" 
                    className="w-full justify-start gap-2 font-mono text-[11px] uppercase tracking-widest"
                    size="sm"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
            
          </nav>
        </div>
      )}
    </>
  );
}