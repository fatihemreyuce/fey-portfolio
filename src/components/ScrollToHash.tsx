"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToIdFromHash(): number | undefined {
  const hash = window.location.hash;
  if (!hash) return;
  const id = decodeURIComponent(hash.slice(1));
  if (!id) return;
  const run = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  requestAnimationFrame(run);
  return window.setTimeout(run, 100);
}

export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    let timeoutId: number | undefined;
    const go = () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      timeoutId = scrollToIdFromHash();
    };
    go();
    window.addEventListener("hashchange", go);
    return () => {
      window.removeEventListener("hashchange", go);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
}
