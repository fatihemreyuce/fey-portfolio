import Link from "next/link";
import { ArrowLeft, Home, FolderSearch } from "lucide-react";
import { Header } from "@/components/Header";
import { Meteors } from "@/components/magicui/meteors";

export default function ProjectNotFound() {
  return (
    <>
      <Header />
      <main className="relative flex flex-1 flex-col items-center justify-center min-h-screen overflow-hidden px-4">

        {/* ── Background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          {/* Blobs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/[0.06] blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/[0.05] blur-3xl" />

          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "radial-gradient(circle, #60a5fa 1px, transparent 1px)",
              backgroundSize:  "28px 28px",
            }}
          />

          {/* Horizontal lines */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                "linear-gradient(transparent calc(100% - 1px), rgba(99,102,241,0.6) 100%)",
              backgroundSize: "100% 72px",
            }}
          />

          <Meteors number={22} symmetric />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-lg">

          {/* Giant 404 */}
          <div className="relative select-none">
            {/* Glow behind number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-24 bg-blue-500/15 blur-3xl rounded-full animate-glow-pulse" />
            </div>

            <p
              className="relative text-[8rem] sm:text-[10rem] font-black leading-none tracking-tighter"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1 0%, #60a5fa 40%, #34d399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </p>
          </div>

          {/* Divider with icon */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center shrink-0">
              <FolderSearch className="w-5 h-5 text-zinc-500" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>

          {/* Text */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Proje Bulunamadı
            </h1>
            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
              Aradığınız proje mevcut değil ya da taşınmış olabilir.
              <br />
              Aşağıdan tüm projelere geri dönebilirsiniz.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/#projects"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-white border-0 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #6366f1, #60a5fa)",
                boxShadow:  "0 0 20px #6366f135",
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Projelere Dön
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              Ana Sayfa
            </Link>
          </div>

          {/* Subtle hint */}
          <p className="text-[11px] text-zinc-600">
            Hata devam ediyorsa{" "}
            <Link
              href="/#contact"
              className="text-zinc-500 hover:text-zinc-300 underline underline-offset-4 decoration-white/20 hover:decoration-white/50 transition-all duration-200"
            >
              iletişime geçin
            </Link>
          </p>

        </div>
      </main>
    </>
  );
}
