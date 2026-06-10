export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="text-2xl">⚽</div>
        <div>
          <h1 className="text-lg font-bold text-glow-blue text-neon-blue leading-tight">
            2026世界杯观赛指南
          </h1>
          <p className="text-xs text-foreground/50">打工人专属 · 美加墨 · 104场</p>
        </div>
      </div>
    </header>
  );
}
