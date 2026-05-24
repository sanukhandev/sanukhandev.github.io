export default function LocaleSwitchSkeleton() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="container-narrow flex h-16 items-center justify-between">
          <div className="h-7 w-40 animate-pulse rounded-md bg-muted" />
          <div className="flex items-center gap-2">
            <div className="h-9 w-20 animate-pulse rounded-full bg-muted" />
            <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
      </div>

      <main className="container-narrow section-pad space-y-8">
        <div className="space-y-4">
          <div className="h-8 w-24 animate-pulse rounded bg-muted" />
          <div className="h-16 w-full animate-pulse rounded-xl bg-muted" />
          <div className="h-16 w-[92%] animate-pulse rounded-xl bg-muted" />
          <div className="h-16 w-[84%] animate-pulse rounded-xl bg-muted" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-44 animate-pulse rounded-2xl bg-muted" />
          <div className="h-44 animate-pulse rounded-2xl bg-muted" />
          <div className="h-44 animate-pulse rounded-2xl bg-muted" />
          <div className="h-44 animate-pulse rounded-2xl bg-muted" />
        </div>

        <div className="space-y-3">
          <div className="h-6 w-36 animate-pulse rounded bg-muted" />
          <div className="h-24 w-full animate-pulse rounded-2xl bg-muted" />
          <div className="h-24 w-full animate-pulse rounded-2xl bg-muted" />
          <div className="h-24 w-full animate-pulse rounded-2xl bg-muted" />
        </div>
      </main>

      <div className="container-narrow pb-10">
        <div className="h-20 w-full animate-pulse rounded-2xl bg-muted" />
      </div>
    </div>
  );
}
