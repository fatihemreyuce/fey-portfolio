"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import type { BrandSocialLink } from "@/data/brand-social-links";

type Variant = "footer" | "headerDesktop" | "headerMobile";

const shell: Record<
  Variant,
  string
> = {
  footer:
    "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm transition-colors duration-200 dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none",
  headerDesktop:
    "relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-zinc-200/70 bg-white/90 shadow-sm backdrop-blur-sm transition-colors duration-200 dark:border-white/10 dark:bg-white/[0.05] dark:shadow-none",
  headerMobile:
    "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-white/95 shadow-sm transition-colors duration-200 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none",
};

const iconSize: Record<Variant, string> = {
  footer: "h-4 w-4",
  headerDesktop: "h-3.5 w-3.5",
  headerMobile: "h-4 w-4",
};

export function BrandSocialIconLink({
  link,
  variant,
}: {
  link: BrandSocialLink;
  variant: Variant;
}) {
  const { icon: Icon, href, label, accentLight, accentDark } = link;
  const [hov, setHov] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const accent = mounted && resolvedTheme === "dark" ? accentDark : accentLight;

  const transform =
    variant === "footer"
      ? hov
        ? "perspective(500px) rotateY(15deg) rotateX(-8deg) translateZ(8px) scale(1.1)"
        : "perspective(500px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)"
      : hov
        ? "perspective(500px) translateZ(4px) scale(1.08)"
        : "perspective(500px) translateZ(0px) scale(1)";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={cn("group", shell[variant])}
      style={{
        transform,
        transition:
          "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease",
        boxShadow: hov ? `0 6px 22px ${accent}40` : "none",
        borderColor: hov ? `${accent}55` : undefined,
        backgroundColor: hov ? `${accent}18` : undefined,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: hov
            ? `radial-gradient(circle at 35% 30%, ${accent}28 0%, transparent 65%)`
            : "transparent",
          transition: "background 0.25s ease",
        }}
      />
      <Icon
        className={cn(
          "relative z-10 text-zinc-600 transition-colors duration-200 dark:text-zinc-400",
          iconSize[variant],
        )}
        style={{ color: hov ? accent : undefined }}
      />
    </a>
  );
}
