import { CurrentBuild } from "./components/current-build";
import { PopularBuildCard } from "./components/popular-build-card";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

        <main className="min-w-0 flex-1">
          <CurrentBuild />
        </main>

        <aside className="shrink-0 lg:sticky lg:top-20 lg:w-72">
          <PopularBuildCard />
        </aside>

      </div>
    </div>
  );
}