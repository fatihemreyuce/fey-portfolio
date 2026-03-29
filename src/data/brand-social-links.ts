import { Github, Instagram, Linkedin, Twitter } from "@/components/icons/social";

export const brandSocialLinks = [
  {
    icon: Github,
    href: "https://github.com/fatihemreyuce",
    label: "GitHub",
    accentLight: "#24292f",
    accentDark: "#f0f6fc",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/fatih-emre-y%C3%BCce-3b0538355/",
    label: "LinkedIn",
    accentLight: "#0a66c2",
    accentDark: "#58a6ff",
  },
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter",
    accentLight: "#1d9bf0",
    accentDark: "#38bdf8",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/fatih.yc8/",
    label: "Instagram",
    accentLight: "#e4405f",
    accentDark: "#f77737",
  },
] as const;

export type BrandSocialLink = (typeof brandSocialLinks)[number];

const labelOrder = <const T extends readonly BrandSocialLink["label"][]>(order: T) =>
  order.map((label) => brandSocialLinks.find((l) => l.label === label)!);

/** Footer sırası */
export const brandSocialLinksFooter = labelOrder([
  "GitHub",
  "LinkedIn",
  "Twitter",
  "Instagram",
]);

/** Header (masaüstü + mobil menü) sırası */
export const brandSocialLinksHeader = labelOrder([
  "Instagram",
  "Twitter",
  "GitHub",
  "LinkedIn",
]);
