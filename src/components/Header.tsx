"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Code2 } from "lucide-react";
import { Instagram, Twitter, Github, Linkedin } from "@/components/icons/social";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

const navLinks = [
  { label: "Hakkımda",  href: "/about"    },
  { label: "Deneyim",   href: "/#experience" },
  { label: "Projeler",  href: "/projects" },
  { label: "Beceriler", href: "/skills"   },
  { label: "Hobiler",   href: "/hobbies"  },
  { label: "İletişim",  href: "/#contact" },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/fatih.yc8/", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Github, href: "https://github.com/fatihemreyuce", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/fatih-emre-y%C3%BCce-3b0538355/", label: "LinkedIn" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 transition-all duration-300 group-hover:border-blue-400/60 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_16px_rgba(59,130,246,0.3)]">
                <Code2 className="h-5 w-5 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex flex-col leading-none">
                <AnimatedGradientText className="text-base font-bold tracking-tight">
                  Fatih Emre Yüce
                </AnimatedGradientText>
                <span className="text-[10px] text-zinc-500 tracking-widest uppercase">
                  Frontend Developer
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const sectionId = link.href.replace("/#", "");
                const isActive = activeSection === sectionId;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md group",
                      isActive
                        ? "text-white"
                        : "text-zinc-400 hover:text-zinc-100",
                    )}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-600/20 to-emerald-600/20 border border-blue-500/20" />
                    )}
                    <span className="relative">{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400" />
                    )}
                    {!isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-300 group-hover:w-4" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              {/* Social Icons */}
              <div className="flex items-center gap-1 mr-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-all duration-200 hover:text-blue-400 hover:bg-blue-500/10"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              {/* CTA */}
              <Button
                asChild
                className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(59,130,246,0.45)] hover:scale-[1.02] border-0"
              >
                <a href="/#contact">İletişime Geç</a>
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-all duration-200 hover:border-blue-500/40 hover:text-blue-400"
              aria-label="Menüyü aç"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu — max-h-96 was clipping the CTA; use viewport cap + scroll */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            isMenuOpen
              ? "max-h-[min(calc(100dvh-4.5rem),32rem)] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none",
          )}
        >
          <div className="max-h-[min(calc(100dvh-4.5rem),32rem)] overflow-y-auto overscroll-contain border-t border-white/5 bg-black/90 backdrop-blur-xl px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-blue-500/10 hover:text-white"
              >
                <span className="h-1 w-1 rounded-full bg-blue-500" />
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-white/5 mt-3">
              <div className="flex items-center gap-2 mb-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-500 hover:border-blue-500/40 hover:text-blue-400 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <Button
                asChild
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-emerald-600 text-sm font-semibold text-white border-0 hover:opacity-90"
              >
                <a href="/#contact" onClick={() => setIsMenuOpen(false)}>
                  İletişime Geç
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer — header yüksekliği (h-16) */}
      <div className="h-16" />
    </>
  );
}
