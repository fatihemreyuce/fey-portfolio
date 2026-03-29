"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const gradient =
  "animate-gradient bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-[length:200%_auto] bg-clip-text text-transparent";

type Props = {
  /** Rotating lines; longest string sets layout width so the block does not jump. */
  phrases: readonly string[];
  className?: string;
  active?: boolean;
  msPerChar?: number;
  msDeletePerChar?: number;
  /** Pause when a phrase is fully typed, before deleting. */
  pauseAfterTypeMs?: number;
  showCursor?: boolean;
};

export function TypewriterGradientText({
  phrases,
  className,
  active = true,
  msPerChar = 72,
  msDeletePerChar = 40,
  pauseAfterTypeMs = 2400,
  showCursor = true,
}: Props) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const current = phrases[phraseIndex] ?? "";
  const widthSample = useMemo(() => {
    if (phrases.length === 0) return "";
    return phrases.reduce((a, b) => (a.length >= b.length ? a : b));
  }, [phrases]);

  useEffect(() => {
    if (!active) {
      setPhraseIndex(0);
      setVisibleLength(0);
      setDeleting(false);
    }
  }, [active]);

  useEffect(() => {
    if (!active || phrases.length === 0) return;

    const phrase = phrases[phraseIndex] ?? "";
    let id: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (visibleLength < phrase.length) {
        id = setTimeout(() => setVisibleLength((n) => n + 1), msPerChar);
      } else {
        id = setTimeout(() => setDeleting(true), pauseAfterTypeMs);
      }
    } else if (visibleLength > 0) {
      id = setTimeout(() => setVisibleLength((n) => n - 1), msDeletePerChar);
    } else {
      id = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, 320);
    }

    return () => clearTimeout(id);
  }, [
    active,
    deleting,
    visibleLength,
    phraseIndex,
    phrases,
    msPerChar,
    msDeletePerChar,
    pauseAfterTypeMs,
  ]);

  const slice = current.slice(0, visibleLength);
  const typing = !deleting && visibleLength < current.length;
  const showCaret = showCursor && (typing || (deleting && visibleLength > 0));

  if (phrases.length === 0) return null;

  /* Invisible width sample wrapped on narrow screens and reserved 2–3 lines → huge gap under short typed text. */
  return (
    <span className="grid min-h-0 min-w-0 w-full [grid-template-areas:'stack'] align-middle leading-[inherit]">
      <span
        className="invisible [grid-area:stack] line-clamp-1 min-h-0 min-w-0 w-full select-none break-words font-[inherit] leading-[inherit] pointer-events-none"
        aria-hidden
      >
        {widthSample}
      </span>
      <span className="min-h-0 min-w-0 [grid-area:stack] w-full font-[inherit] leading-[inherit]">
        <span className={cn(gradient, className)}>{slice}</span>
        {showCaret && (
          <span
            className="ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.05em] animate-pulse bg-gradient-to-b from-cyan-400 to-emerald-400 align-middle"
            aria-hidden
          />
        )}
      </span>
    </span>
  );
}
