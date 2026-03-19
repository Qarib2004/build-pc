import Link from "next/link";

export default function Home() {
  return (
    <div className="font-syne min-h-screen">



      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[520px] border-b border-border">

        <div className="flex flex-col justify-center px-8 md:px-10 py-14 border-b md:border-b-0 md:border-r border-border">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">
            — PC Configurator
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight mb-5">
            Build your<br />
            <em className="not-italic text-green-700">dream</em><br />
            machine
          </h1>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-sm mb-10">
            Pick components, check compatibility, and track your budget — all in real time.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/dashboard"
              className="bg-foreground text-background font-bold text-sm px-7 py-3 rounded hover:opacity-80 transition-opacity"
            >
              Start Building
            </Link>
            <button className="font-mono text-xs border border-border px-5 py-3 rounded text-muted-foreground hover:border-foreground hover:text-foreground transition-colors">
              Pre-built Configs
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center bg-muted/40 p-8">
          <div className="w-full max-w-[300px] border border-border rounded-lg overflow-hidden bg-background">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
              <span className="font-bold text-sm">Gaming Build</span>
              <span className="font-mono text-[10px] bg-green-100 text-green-800 px-2 py-1 rounded">POPULAR</span>
            </div>
            {[
              { icon: "🔲", label: "CPU", val: "Ryzen 7 7800X3D" },
              { icon: "🎮", label: "GPU", val: "RTX 4070 Ti" },
              { icon: "💾", label: "RAM", val: "32 GB DDR5" },
              { icon: "💿", label: "SSD", val: "2 TB NVMe" },
            ].map(({ icon, label, val }) => (
              <div key={label} className="flex items-center px-5 py-3 border-b border-border">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-sm mr-3 shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
                  <p className="font-bold text-[13px]">{val}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between px-5 py-3.5 bg-muted/40">
              <span className="font-mono text-[11px] text-muted-foreground">Total</span>
              <span className="font-extrabold text-lg">$1,240</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3">
        {[
          { n: "01", title: "Smart Matching", desc: "Socket, TDP, and slot compatibility checked automatically." },
          { n: "02", title: "Live Pricing",   desc: "Real-time data from stores — no outdated price lists." },
          { n: "03", title: "Export Build",   desc: "Save your config as PDF or share a link instantly." },
        ].map(({ n, title, desc }, i) => (
          <div
            key={n}
            className={`p-8 ${i < 2 ? "border-b md:border-b-0 md:border-r" : ""} border-border`}
          >
            <p className="font-mono text-[11px] text-muted-foreground tracking-widest mb-5">{n}</p>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

    </div>
  );
}