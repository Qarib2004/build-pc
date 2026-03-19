import { getPopularBuild } from "@/lib/builds";
import { Eye, ThumbsUp } from "lucide-react";
import Link from "next/link";

export async function PopularBuildCard() {
  const builds = await getPopularBuild(3);

  return (
    <div className="w-full lg:w-72 shrink-0 border border-border rounded-lg overflow-hidden">

      <div className="px-5 py-4 border-b border-border">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
          Community
        </p>
        <h3 className="font-syne font-extrabold text-base tracking-tight leading-none">
          Popular Builds
        </h3>
      </div>

      {builds.length === 0 && (
        <div className="px-5 py-10 flex flex-col items-center gap-2 text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            No builds yet
          </p>
          <p className="text-xs text-muted-foreground">
            Be the first to share a build.
          </p>
        </div>
      )}

      {builds.length > 0 && (
        <ul className="divide-y divide-border">
          {builds.map((build, i) => (
            <li key={build.id} className="group px-5 py-4 hover:bg-muted/40 transition-colors">
              <div className="flex items-start justify-between gap-3">

                <div className="flex items-start gap-3 min-w-0">
                  <span className="font-mono text-[10px] text-muted-foreground mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-sm leading-tight truncate">
                      {build.name}
                    </p>
                    <p className="font-mono text-xs tabular-nums text-muted-foreground mt-0.5">
                      ${new Intl.NumberFormat("en-US").format(build.totalPrice)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                    <ThumbsUp className="h-3 w-3" />
                    {build._count.likes}
                  </span>
                  <Link
                    href={`/builds/${build.id}/edit`}
                    className="flex items-center justify-center w-7 h-7 rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Link>
                </div>

              </div>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}