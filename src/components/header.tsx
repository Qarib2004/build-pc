import { auth } from "@/auth";
import Link from "next/link";
import { HeaderNav } from "./header-nav";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const session = await auth();
  const href = session?.user ? "/dashboard" : "/";

  return (
    <header className="flex items-center sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-8">

        <Link
          href={href}
          className="font-syne font-extrabold text-base tracking-tight hover:opacity-70 transition-opacity"
        >
          BUILD<span className="text-green-700">.</span>IT
        </Link>

        <nav className="hidden md:flex min-w-0 flex-1 justify-end">
          <HeaderNav session={session} />
        </nav>
        

        <div className="flex md:hidden">
          <MobileMenu session={session} />
        </div>

      </div>
      <div>
      <ThemeToggle/>

      </div>
    </header>
  );
}