"use client";
import { usePathname } from "next/navigation";

export default function ConditionalHeader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const excludedPaths = ["/login", "/signup"];

  if (excludedPaths.includes(pathname)) return null;

  return <>{children}</>; 
}