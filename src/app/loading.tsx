import { Skeleton } from "@/components/ui/skeleton";

/* ─── Skeleton Header ────────────────────────────────── */
function SkeletonHeader() {
  return (
    <div className="fixed left-0 right-0 top-0 z-40 border-b border-zinc-200/90 bg-white/90 backdrop-blur-xl dark:border-white/5 dark:bg-black/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-9 h-9 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="w-32 h-3.5 rounded-full" />
              <Skeleton className="w-20 h-2.5 rounded-full" />
            </div>
          </div>
          {/* Nav */}
          <div className="hidden md:flex items-center gap-2">
            {[72, 60, 68, 64, 56, 72].map((w, i) => (
              <Skeleton key={i} className="h-7 rounded-md" style={{ width: w }} />
            ))}
          </div>
          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-8 h-8 rounded-md" />
              ))}
            </div>
            <Skeleton className="w-28 h-9 rounded-lg" />
          </div>
          {/* Mobile */}
          <Skeleton className="w-9 h-9 rounded-lg md:hidden" />
        </div>
      </div>
    </div>
  );
}

/* ─── Root loading ───────────────────────────────────── */
export default function RootLoading() {
  return (
    <>
      <SkeletonHeader />

      {/* Hero / About section skeleton */}
      <div className="h-16" />
      <section className="relative min-h-screen flex items-center py-24 border-b border-zinc-200 dark:border-white/5">
        <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Profile card skeleton */}
            <div className="flex justify-center">
              <div className="relative" style={{ width: 340, height: 480 }}>
                {/* Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-[330px] h-[330px] rounded-full border border-white/[0.05]" />
                  <div className="absolute w-[278px] h-[278px] rounded-full border border-white/[0.04]" />
                </div>
                {/* Card */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 rounded-3xl border border-white/[0.07] bg-zinc-900/60 overflow-hidden">
                  {/* Header */}
                  <Skeleton className="h-52 rounded-none" />
                  {/* Body */}
                  <div className="p-5 space-y-4">
                    <div className="space-y-2 text-center flex flex-col items-center">
                      <Skeleton className="h-4 w-36 rounded-full" />
                      <Skeleton className="h-3 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-7 w-32 rounded-full mx-auto" />
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-9 w-full rounded-xl" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content skeleton */}
            <div className="space-y-7">
              <Skeleton className="h-7 w-28 rounded-full" />
              <div className="space-y-3">
                <Skeleton className="h-11 w-48 rounded-xl" />
                <Skeleton className="h-11 w-56 rounded-xl" />
                <Skeleton className="h-11 w-36 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-5/6 rounded-full" />
                <Skeleton className="h-4 w-4/6 rounded-full" />
              </div>
              {/* Tech grid */}
              <div className="space-y-2">
                <Skeleton className="h-3 w-28 rounded-full" />
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Skeleton key={i} className="h-10 rounded-xl" />
                  ))}
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-20 rounded-2xl" />
                ))}
              </div>
              {/* Buttons */}
              <div className="flex gap-3">
                <Skeleton className="h-10 w-36 rounded-xl" />
                <Skeleton className="h-10 w-28 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects section skeleton */}
      <section className="py-24 border-b border-zinc-200 dark:border-white/5">
        <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-7 w-28 rounded-full" />
            <Skeleton className="h-10 w-64 rounded-xl" />
            <Skeleton className="h-4 w-80 rounded-full" />
          </div>
          <Skeleton className="h-10 w-64 rounded-xl mx-auto" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-white/[0.07] overflow-hidden">
                <Skeleton className="h-28 rounded-none" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-4 w-3/4 rounded-full" />
                  <Skeleton className="h-3 w-full rounded-full" />
                  <Skeleton className="h-3 w-5/6 rounded-full" />
                  <div className="flex gap-1.5 pt-1">
                    {[1, 2, 3].map((j) => (
                      <Skeleton key={j} className="h-5 w-14 rounded-md" />
                    ))}
                  </div>
                </div>
                <div className="px-5 pb-5 flex justify-between">
                  <div className="flex gap-2">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <Skeleton className="w-8 h-8 rounded-lg" />
                  </div>
                  <Skeleton className="w-24 h-8 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
