import { Skeleton } from "@/components/ui/skeleton";

function SkeletonHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 mt-[2px] bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-9 h-9 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="w-32 h-3.5 rounded-full" />
              <Skeleton className="w-20 h-2.5 rounded-full" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {[72, 60, 68, 64, 56, 72].map((w, i) => (
              <Skeleton key={i} className="h-7 rounded-md" style={{ width: w }} />
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="w-8 h-8 rounded-md" />)}
            </div>
            <Skeleton className="w-28 h-9 rounded-lg" />
          </div>
          <Skeleton className="w-9 h-9 rounded-lg md:hidden" />
        </div>
      </div>
    </div>
  );
}

export default function SkillDetailLoading() {
  return (
    <>
      <SkeletonHeader />
      <div className="h-[66px]" />

      {/* ── Hero ── */}
      <section className="border-b border-white/5 pt-16 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-3 w-16 rounded-full" />
            <Skeleton className="h-3 w-2 rounded-full" />
            <Skeleton className="h-3 w-20 rounded-full" />
            <Skeleton className="h-3 w-2 rounded-full" />
            <Skeleton className="h-3 w-24 rounded-full" />
          </div>

          {/* Back button */}
          <Skeleton className="h-8 w-36 rounded-xl mb-8" />

          {/* Hero content */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <Skeleton className="w-16 h-16 rounded-2xl shrink-0" />
            <div className="space-y-4 flex-1">
              <Skeleton className="h-12 w-64 rounded-xl" />
              <div className="space-y-2 max-w-2xl">
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-5/6 rounded-full" />
                <Skeleton className="h-4 w-3/4 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left 2/3 — skill bars */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-1 h-5 rounded-full" />
                  <Skeleton className="h-5 w-40 rounded-full" />
                </div>
                <Skeleton className="h-3 w-64 rounded-full" />
              </div>

              {/* Skill bars */}
              <div className="space-y-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-7 h-7 rounded-lg" />
                        <Skeleton className="h-3.5 w-28 rounded-full" />
                      </div>
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <div className="h-2 rounded-full overflow-hidden">
                      <Skeleton className="h-2 rounded-full" style={{ width: `${55 + i * 5}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Level legend */}
              <div className="flex flex-wrap gap-3 pt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Skeleton className="w-2.5 h-2.5 rounded-full" />
                    <Skeleton className="h-3 w-20 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* Stats card */}
              <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded" />
                  <Skeleton className="h-3.5 w-24 rounded-full" />
                </div>
                <div className="p-4 space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <Skeleton className="h-3 w-20 rounded-full" />
                      <Skeleton className="h-3 w-28 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill chips card */}
              <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded" />
                  <Skeleton className="h-3.5 w-24 rounded-full" />
                </div>
                <div className="p-4 flex flex-wrap gap-2">
                  {[56, 72, 64, 80, 52, 68].map((w, i) => (
                    <Skeleton key={i} className="h-7 rounded-lg" style={{ width: w }} />
                  ))}
                </div>
              </div>

              {/* Other categories card */}
              <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded" />
                  <Skeleton className="h-3.5 w-32 rounded-full" />
                </div>
                <div className="p-3 space-y-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                      <Skeleton className="w-7 h-7 rounded-lg shrink-0" />
                      <Skeleton className="h-3 flex-1 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="space-y-2">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
