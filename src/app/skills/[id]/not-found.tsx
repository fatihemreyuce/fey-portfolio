import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Header } from "@/components/Header";
import { Meteors } from "@/components/magicui/meteors";

export default function SkillNotFound() {
  return (
    <>
      <Header />
      <main className="relative flex flex-1 flex-col items-center justify-center min-h-screen overflow-hidden px-4">

        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-600/[0.05] blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/[0.04] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.024]"
            style={{
              backgroundImage: "radial-gradient(circle, #34d399 1px, transparent 1px)",
              backgroundSize:  "28px 28px",
            }}
          />
          <Meteors number={20} symmetric />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-lg">

          {/* Giant number */}
          <div className="relative select-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-24 bg-emerald-500/12 blur-3xl rounded-full animate-glow-pulse" />
            </div>
            <p
              className="relative text-[8rem] sm:text-[10rem] font-black leading-none tracking-tighter"
              style={{
                background:           "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor:  "transparent",
                backgroundClip:       "text",
              }}
            >
              404
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center shrink-0">
              <SearchX className="w-5 h-5 text-zinc-500" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Kategori Bulunamadı
            </h1>
            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
              Aradığınız beceri kategorisi mevcut değil.
              <br />
              Tüm kategorilere geri dönebilirsiniz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/#skills"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-white border-0 transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                boxShadow:  "0 0 20px #10b98130",
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Becerilere Dön
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              Ana Sayfa
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
