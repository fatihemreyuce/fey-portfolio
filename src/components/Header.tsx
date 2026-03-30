"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Menu, X, Code2, ChevronRight } from "lucide-react";
import { BrandSocialIconLink } from "@/components/BrandSocialIconLink";
import { brandSocialLinksHeader } from "@/data/brand-social-links";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useI18n } from "@/components/I18nProvider";
import { withLocale } from "@/i18n/withLocale";

const navLinks = [
  { key: "about", href: "/#about" },
  { key: "experience", href: "/#experience" },
  { key: "projects", href: "/#projects" },
  { key: "skills", href: "/#skills" },
  { key: "hobbies", href: "/#hobbies" },
  { key: "contact", href: "/#contact" },
];

function getNavLabel(
  key: (typeof navLinks)[number]["key"],
  locale: "tr" | "en",
) {
  const labels: Record<
    (typeof navLinks)[number]["key"],
    { tr: string; en: string }
  > = {
    about: { tr: "Hakkımda", en: "About" },
    experience: { tr: "Deneyim", en: "Experience" },
    projects: { tr: "Projeler", en: "Projects" },
    skills: { tr: "Beceriler", en: "Skills" },
    hobbies: { tr: "Hobiler", en: "Hobbies" },
    contact: { tr: "İletişim", en: "Contact" },
  };
  return labels[key][locale];
}

function getCtaLabel(
  locale: "tr" | "en",
  dict: ReturnType<typeof useI18n>["dict"],
) {
  return (
    dict.header.contactCta?.trim() ||
    (locale === "en" ? "Contact Me" : "İletişime Geç")
  );
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale, setLocale, dict } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const switchLocale = (next: "tr" | "en") => {
    if (next === locale) return;
    setLocale(next);
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", next);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    router.refresh();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace("/#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-40 transition-all duration-300",
          isScrolled
            ? "border-b border-zinc-200/80 bg-white/88 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/80 dark:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 min-w-0 items-center justify-between gap-3">
            <Link
              href={withLocale("/", locale)}
              className="group flex min-w-0 shrink-0 items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-blue-600 shadow-sm transition-all duration-200 group-hover:border-blue-300 group-hover:bg-blue-50 dark:border-white/10 dark:bg-white/5 dark:text-blue-400 dark:group-hover:border-blue-500/40 dark:group-hover:bg-blue-500/10">
                <Code2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 leading-none">
                <AnimatedGradientText className="truncate text-sm font-bold tracking-tight">
                  Fatih Emre Yüce
                </AnimatedGradientText>
                <span className="hidden pt-0.5 text-[9px] uppercase tracking-[0.2em] text-zinc-500 xl:block">
                  Frontend Developer
                </span>
              </div>
            </Link>

            <nav className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
              <div className="flex items-center rounded-2xl border border-zinc-200/90 bg-white/95 p-1 shadow-sm dark:border-white/10 dark:bg-white/5">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace("/#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <Link
                      key={link.href}
                      href={withLocale(link.href, locale)}
                      className={cn(
                        "relative whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 xl:px-3.5",
                        isActive
                          ? "bg-linear-to-r from-zinc-700 to-zinc-800 !text-white shadow-[0_2px_8px_rgba(24,24,27,0.2)] dark:from-white dark:to-zinc-100 dark:!text-zinc-900"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100",
                      )}
                    >
                      {getNavLabel(link.key, locale)}
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <div className="hidden items-center gap-1 xl:flex">
                {brandSocialLinksHeader.map((link) => (
                  <BrandSocialIconLink
                    key={link.label}
                    link={link}
                    variant="headerDesktop"
                  />
                ))}
              </div>

              <div className="inline-flex h-8 items-center rounded-xl border border-zinc-200 bg-white p-0.5 shadow-sm dark:border-white/10 dark:bg-white/5">
                <button
                  type="button"
                  onClick={() => switchLocale("tr")}
                  className={cn(
                    "inline-flex h-6 min-w-8 items-center justify-center rounded-lg px-2 text-[11px] font-semibold leading-none transition-all",
                    locale === "tr"
                      ? "bg-zinc-800/90 !text-white dark:bg-white dark:!text-zinc-900"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
                  )}
                  aria-label={dict.common.language}
                >
                  {dict.common.tr}
                </button>
                <button
                  type="button"
                  onClick={() => switchLocale("en")}
                  className={cn(
                    "inline-flex h-6 min-w-8 items-center justify-center rounded-lg px-2 text-[11px] font-semibold leading-none transition-all",
                    locale === "en"
                      ? "bg-zinc-800/90 !text-white dark:bg-white dark:!text-zinc-900"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
                  )}
                  aria-label={dict.common.language}
                >
                  {dict.common.en}
                </button>
              </div>

              <ThemeToggle />

              <Button
                asChild
                className="hidden h-9 rounded-xl border-0 bg-linear-to-r from-blue-600 to-emerald-600 px-4 text-sm font-semibold text-white! shadow-[0_8px_20px_rgba(16,185,129,0.25)] transition-all duration-200 hover:scale-[1.01] hover:brightness-110 xl:inline-flex"
              >
                <a
                  href={withLocale("/#contact", locale)}
                  className="inline-flex items-center gap-1.5 text-white"
                >
                  {getCtaLabel(locale, dict)}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:text-zinc-900 lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:text-white"
              aria-label={dict.header.mobileMenuLabel}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            isMenuOpen
              ? "max-h-[min(calc(100dvh-4.5rem),34rem)] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none",
          )}
        >
          <div className="max-h-[min(calc(100dvh-4.5rem),34rem)] space-y-2 overflow-y-auto overscroll-contain border-t border-zinc-200 bg-white/95 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl dark:border-white/10 dark:bg-black/85">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={withLocale(link.href, locale)}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-zinc-700 transition-all duration-200 hover:border-zinc-200 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:border-white/10 dark:hover:bg-white/5"
              >
                <span>{getNavLabel(link.key, locale)}</span>
                <ChevronRight className="h-4 w-4 text-zinc-400" />
              </Link>
            ))}

            <div className="mt-3 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-3 dark:border-white/10 dark:bg-white/3">
              <div className="mb-3 flex items-center gap-2">
                <div className="inline-flex h-8 items-center rounded-xl border border-zinc-200 bg-white p-0.5 dark:border-white/10 dark:bg-white/5">
                  <button
                    type="button"
                    onClick={() => switchLocale("tr")}
                    className={cn(
                      "inline-flex h-6 min-w-8 items-center justify-center rounded-lg px-2 text-[11px] font-semibold leading-none transition-all",
                      locale === "tr"
                        ? "bg-zinc-800/90 !text-white dark:bg-white dark:!text-zinc-900"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
                    )}
                    aria-label={dict.common.language}
                  >
                    {dict.common.tr}
                  </button>
                  <button
                    type="button"
                    onClick={() => switchLocale("en")}
                    className={cn(
                      "inline-flex h-6 min-w-8 items-center justify-center rounded-lg px-2 text-[11px] font-semibold leading-none transition-all",
                      locale === "en"
                        ? "bg-zinc-800/90 !text-white dark:bg-white dark:!text-zinc-900"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
                    )}
                    aria-label={dict.common.language}
                  >
                    {dict.common.en}
                  </button>
                </div>
                {brandSocialLinksHeader.map((link) => (
                  <BrandSocialIconLink
                    key={link.label}
                    link={link}
                    variant="headerMobile"
                  />
                ))}
                <ThemeToggle className="ml-auto" />
              </div>
              <Button
                asChild
                className="h-10 w-full rounded-xl border-0 bg-linear-to-r from-blue-600 to-emerald-600 text-sm font-semibold text-white! hover:brightness-110"
              >
                <a
                  href={withLocale("/#contact", locale)}
                  className="text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {getCtaLabel(locale, dict)}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="h-16" />
    </>
  );
}
