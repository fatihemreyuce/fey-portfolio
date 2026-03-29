import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Very light hex colors (e.g. zinc-200) on pale card bodies; return a dark neutral for legibility in light mode. */
export function readableOnLightSurface(hex: string): string {
  const normalized = hex.replace(/^#/, "").trim();
  if (normalized.length !== 6 || !/^[0-9a-fA-F]{6}$/i.test(normalized)) return hex;
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;
  const lin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  if (L > 0.72) return "#27272a";
  return hex;
}

/** True when hex is so light it needs forced dark text on pale surfaces (see globals `project-tech-pill--force-dark`). */
export function hexNeedsForcedDarkText(hex: string): boolean {
  return readableOnLightSurface(hex) !== hex;
}
