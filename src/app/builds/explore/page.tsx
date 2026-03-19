import { auth } from "@/auth";
import { getPublicBuild } from "@/lib/builds";
import { notFound } from "next/navigation";
import { BuildCard } from "../components/builds-card";
import { ThumbsUp } from "lucide-react";
import { toggleLikeAction } from "../action";

export default async function ExplorePage() {
  const session = await auth();

  if (!session?.user.id) notFound();

  const builds = await getPublicBuild(session.user.id);

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">

      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
          Community
        </p>
        <h1 className="font-syne font-extrabold text-3xl md:text-4xl tracking-tight leading-none">
          Public Builds
        </h1>
      </div>

      {builds.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center border border-border rounded-lg">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            No public builds yet
          </p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Be the first to share your build with the community.
          </p>
        </div>
      )}

      {builds.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {builds.map((b) => {
            const isLiked = Array.isArray(b.likes) && b.likes.length > 0;

            return (
              <BuildCard key={b.id} build={b}>
                <form action={toggleLikeAction}>
                  <input type="hidden" name="buildId" value={b.id} />
                  <button
                    type="submit"
                    className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded border transition-colors ${
                      isLiked
                        ? "border-foreground text-foreground"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    <ThumbsUp
                      className={`h-3.5 w-3.5 ${isLiked ? "fill-current" : ""}`}
                    />
                    {b._count.likes}
                  </button>
                </form>
              </BuildCard>
            );
          })}
        </div>
      )}

    </div>
  );
}