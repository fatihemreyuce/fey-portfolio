import {
  Globe,
  Scissors,
  Code2,
  type LucideIcon,
} from "lucide-react";

export interface ProjectTech {
  name: string;
  color: string; // hex
}

export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  category: "Frontend" | "Backend" | "Fullstack";
  status: "live" | "development" | "completed";
  year: number;
  techs: ProjectTech[];
  features: string[];
  icon: LucideIcon;
  accent: { from: string; to: string };
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "blog-app",
    title: "BlogApp Platform",
    shortDesc:
      "Modern makale yazma ve yönetim platformu. SEO odaklı Next.js frontend ile güçlü Spring Boot backend.",
    longDesc:
      "BlogApp, yazarların kolayca içerik oluşturup yönetebileceği full-stack bir blog platformudur. Next.js ile server-side rendering, Spring Boot ile RESTful API, PostgreSQL ile veri saklama sağlanmaktadır. JWT tabanlı kimlik doğrulama, slug otomatik üretimi, kategori ve etiket yönetimi gibi özellikler içerir.",
    category: "Fullstack",
    status: "completed",
    year: 2024,
    icon: Globe,
    accent: { from: "#6366f1", to: "#8b5cf6" },
    techs: [
      { name: "Next.js",      color: "#e4e4e7" },
      { name: "TypeScript",   color: "#60a5fa" },
      { name: "Spring Boot",  color: "#86efac" },
      { name: "PostgreSQL",   color: "#818cf8" },
      { name: "Tailwind CSS", color: "#38BDF8" },
      { name: "JWT",          color: "#fbbf24" },
    ],
    features: [
      "JWT tabanlı kimlik doğrulama ve yetkilendirme",
      "Otomatik SEO-dostu slug üretimi",
      "Kategori ve etiket yönetimi",
      "Zengin metin editörü entegrasyonu",
      "Server-side rendering ile hızlı sayfa yükleme",
      "Responsive tasarım ve dark mode desteği",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "kuafor-yonetim",
    title: "Kuaför Yönetim Sistemi",
    shortDesc:
      "Kuaför salonları için müşteri takibi, randevu yönetimi ve gelir raporlama sistemi.",
    longDesc:
      "Kotlin ve Spring Boot ile geliştirilmiş bu backend, kuaför salonlarının günlük operasyonlarını dijitalleştirmek için tasarlanmıştır. Müşteri kaydı, randevu planlaması, personel yönetimi ve gelir raporlama gibi temel iş süreçlerini tek bir API altında toplar. React frontend ile entegre çalışır.",
    category: "Fullstack",
    status: "completed",
    year: 2024,
    icon: Scissors,
    accent: { from: "#f97316", to: "#f59e0b" },
    techs: [
      { name: "Kotlin",       color: "#fb923c" },
      { name: "Spring Boot",  color: "#86efac" },
      { name: "React",        color: "#61DAFB" },
      { name: "PostgreSQL",   color: "#818cf8" },
      { name: "JWT",          color: "#fbbf24" },
    ],
    features: [
      "Müşteri kayıt ve geçmiş takibi",
      "Randevu planlama ve çakışma kontrolü",
      "Personel ve servis yönetimi",
      "Gelir ve istatistik raporları",
      "Rol tabanlı erişim kontrolü (RBAC)",
      "RESTful API dokümantasyonu",
    ],
    githubUrl: "https://github.com",
  },
  {
    id: "portfolio",
    title: "Kişisel Portfolyo",
    shortDesc:
      "Next.js 16, Tailwind CSS v4 ve MagicUI bileşenleriyle inşa edilmiş bu portfolyo sitesi.",
    longDesc:
      "Kişisel markalama ve proje vitrinleme amacıyla sıfırdan tasarlanmış bu portfolyo, modern web teknolojilerinin sunduğu tüm olanaklardan faydalanmaktadır. 3D animasyonlar, intersection observer tabanlı scroll efektleri, MagicUI bileşenleri ve tam responsive tasarım ile dikkat çekici bir kullanıcı deneyimi sunar.",
    category: "Frontend",
    status: "live",
    year: 2025,
    icon: Code2,
    accent: { from: "#10b981", to: "#06b6d4" },
    techs: [
      { name: "Next.js 16",   color: "#e4e4e7" },
      { name: "TypeScript",   color: "#60a5fa" },
      { name: "Tailwind v4",  color: "#38BDF8" },
      { name: "Lucide Icons", color: "#a78bfa" },
    ],
    features: [
      "3D mouse tilt efektli profil kartı",
      "Intersection observer ile scroll animasyonları",
      "MagicUI meteor ve gradient text bileşenleri",
      "Dinamik proje detay sayfaları",
      "Tam responsive ve erişilebilir tasarım",
      "Sayaçlı istatistik animasyonları",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
