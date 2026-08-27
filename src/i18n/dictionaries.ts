import type { Locale } from "@/i18n/config";

type Dictionary = {
  common: {
    language: string;
    tr: string;
    en: string;
  };
  header: {
    about: string;
    experience: string;
    projects: string;
    skills: string;
    hobbies: string;
    contact: string;
    contactCta: string;
    mobileMenuLabel: string;
  };
  about: {
    badge: string;
    titleTop: string;
    titleBottom: string;
    bio: string;
    stackTitle: string;
    frontend: string;
    backend: string;
    contactCta: string;
    moreCta: string;
    cvCta: string;
    phrases: readonly string[];
  };
  projects: {
    badge: string;
    titleTop: string;
    titleGradient: string;
    description: string;
    moreOnGithub: string;
  };
  skills: {
    badge: string;
    titleTop: string;
    titleGradient: string;
    description: string;
    cardFooter: string;
    discover: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  tr: {
    common: {
      language: "Dil",
      tr: "TR",
      en: "EN",
    },
    header: {
      about: "Hakkımda",
      experience: "Deneyim",
      projects: "Projeler",
      skills: "Beceriler",
      hobbies: "Hobiler",
      contact: "İletişim",
      contactCta: "İletişime Geç",
      mobileMenuLabel: "Menüyü aç",
    },
    about: {
      badge: "Frontend · Backend · Mobile Developer",
      titleTop: "Web ve mobilde,",
      titleBottom: "ürün geliştiriyorum.",
      bio: "Frontend arayüzleri, güvenli backend servisleri ve mobil uygulamalar geliştirerek ürün fikirlerini kullanılabilir deneyimlere dönüştürüyorum.",
      stackTitle: "Çekirdek teknoloji seti",
      frontend: "Frontend",
      backend: "Backend",
      contactCta: "İletişime Geç",
      moreCta: "Hakkımda Daha Fazla",
      cvCta: "CV İndir",
      phrases: [
        "Gerçek Ürünler",
        "Güçlü API’ler",
        "Mobil Deneyimler",
      ] as const,
    },
    projects: {
      badge: "Projeler",
      titleTop: "Üzerinde Çalıştığım",
      titleGradient: "Seçkin Projeler",
      description:
        "Frontend'den backend'e, full-stack uygulamalardan API servislerine uzanan geniş bir yelpazede geliştirdiğim projeler.",
      moreOnGithub: "Daha fazla proje GitHub'da",
    },
    skills: {
      badge: "Beceriler",
      titleTop: "Kullandığım",
      titleGradient: "Teknolojiler",
      description:
        "teknoloji ve araçta deneyim — frontend'den backend'e, geliştirme araçlarından metodolojilere kadar geniş bir yelpaze.",
      cardFooter: "Tüm becerileri gör",
      discover: "Karta tıklayarak detayları keşfedin",
    },
  },
  en: {
    common: {
      language: "Language",
      tr: "TR",
      en: "EN",
    },
    header: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      hobbies: "Hobbies",
      contact: "Contact",
      contactCta: "Contact Me",
      mobileMenuLabel: "Open menu",
    },
    about: {
      badge: "Frontend · Backend · Mobile Developer",
      titleTop: "For web and mobile,",
      titleBottom: "I build products.",
      bio: "I build frontend interfaces, secure backend services, and mobile applications that turn product ideas into usable experiences.",
      stackTitle: "Core stack",
      frontend: "Frontend",
      backend: "Backend",
      contactCta: "Contact Me",
      moreCta: "Learn More About Me",
      cvCta: "Download CV",
      phrases: [
        "Real Products",
        "Reliable APIs",
        "Mobile Experiences",
      ] as const,
    },
    projects: {
      badge: "Projects",
      titleTop: "What I Have Built",
      titleGradient: "Featured Projects",
      description:
        "Projects across frontend, backend, and full-stack development, ranging from product interfaces to API services.",
      moreOnGithub: "See more projects on GitHub",
    },
    skills: {
      badge: "Skills",
      titleTop: "Technologies",
      titleGradient: "I Use",
      description:
        "technologies and tools with hands-on experience — from frontend and backend stacks to workflows and methodologies.",
      cardFooter: "View all skills",
      discover: "Click a card to explore details",
    },
  },
};
