import {
  Code2,
  Server,
  Wrench,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export interface Skill {
  name: string;
  level: number; // 0-100
  color: string; // hex
  years: number;
  description: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: LucideIcon;
  accent: { from: string; to: string };
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    shortDesc: "Modern, erişilebilir ve performanslı kullanıcı arayüzleri.",
    longDesc:
      "Kullanıcı deneyimini ön planda tutarak React ekosistemi üzerine geliştirme yapıyorum. Next.js ile SSR/SSG, TypeScript ile tip güvenliği ve Tailwind CSS ile hızlı, tutarlı stil yazımı temel araç setimi oluşturuyor.",
    icon: Code2,
    accent: { from: "#3b82f6", to: "#06b6d4" },
    skills: [
      { name: "React",        level: 90, color: "#61DAFB", years: 3, description: "Hooks, context, custom hook geliştirme ve performans optimizasyonu." },
      { name: "Next.js",      level: 85, color: "#e4e4e7", years: 2, description: "App Router, SSR/SSG, API routes ve edge runtime." },
      { name: "TypeScript",   level: 82, color: "#60a5fa", years: 2, description: "Strict mode, utility types, generics ve type narrowing." },
      { name: "Tailwind CSS", level: 92, color: "#38BDF8", years: 3, description: "Utility-first tasarım, dark mode ve özel animasyonlar." },
      { name: "HTML / CSS",   level: 95, color: "#f97316", years: 4, description: "Semantik markup, CSS Grid/Flexbox, animasyonlar ve erişilebilirlik." },
      { name: "Framer Motion", level: 70, color: "#a78bfa", years: 1, description: "Sayfa geçişleri, scroll animasyonları ve gesture etkileşimleri." },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    shortDesc: "REST ve veri katmanı konularında öğreniyorum; Kotlin ve Spring Boot ile adım adım ilerliyorum.",
    longDesc:
      "Backend tarafında henüz başlangıç seviyesindeyim. Kotlin ve Spring Boot ile küçük projeler ve REST uçları deniyorum; PostgreSQL, Node.js ve temel kimlik doğrulama konularında pratik yapmaya odaklanıyorum.",
    icon: Server,
    accent: { from: "#10b981", to: "#6366f1" },
    skills: [
      { name: "Kotlin",       level: 28, color: "#fb923c", years: 0, description: "Temel sözdizimi, sınıflar ve coroutines'e giriş." },
      { name: "Spring Boot",  level: 25, color: "#86efac", years: 0, description: "REST controller, proje yapısı ve dependency injection öğreniyorum." },
      { name: "Node.js",      level: 32, color: "#84cc16", years: 1, description: "Basit Express sunucuları ve async/await ile pratik." },
      { name: "PostgreSQL",   level: 30, color: "#818cf8", years: 0, description: "İlişkisel model ve temel SQL sorguları." },
      { name: "REST API",     level: 35, color: "#34d399", years: 1, description: "HTTP metodları ve JSON API temelleri." },
      { name: "JWT / Auth",   level: 22, color: "#fbbf24", years: 0, description: "Token kavramı ve basit doğrulama akışlarına giriş." },
    ],
  },
  {
    id: "araclar",
    title: "Araçlar & DevOps",
    shortDesc: "Geliştirme süreçlerini hızlandıran araç ve altyapı bilgisi.",
    longDesc:
      "Günlük geliştirme iş akışımı Git ile yönetiyor, Docker ile containerize ediyor, Postman ile test ediyorum. CI/CD süreçleri ve bulut platformları konusunda temel bilgiye sahibim.",
    icon: Wrench,
    accent: { from: "#f59e0b", to: "#ef4444" },
    skills: [
      { name: "Git / GitHub",  level: 88, color: "#f97316", years: 3, description: "Branch stratejisi, PR süreci, rebase ve conflict çözümü." },
      { name: "Docker",        level: 65, color: "#60a5fa", years: 1, description: "Image oluşturma, compose ve temel container yönetimi." },
      { name: "VS Code",       level: 95, color: "#4ade80", years: 4, description: "Extension geliştirme, snippet'lar ve workspace konfigürasyonu." },
      { name: "Postman",       level: 85, color: "#f97316", years: 2, description: "API test, collection oluşturma ve environment yönetimi." },
      { name: "Figma",         level: 60, color: "#a78bfa", years: 1, description: "Tasarım inceleme, prototip ve component inspect." },
      { name: "Linux / CLI",   level: 70, color: "#e4e4e7", years: 2, description: "Shell scripting, dosya yönetimi ve süreç kontrolü." },
    ],
  },
  {
    id: "diger",
    title: "Diğer",
    shortDesc: "Yazılımın ötesinde: analitik düşünce ve problem çözme.",
    longDesc:
      "Python ile veri işleme ve görüntü analizi üzerine çalışmalar yaptım. Agile metodolojisini proje süreçlerinde uyguluyor, İngilizce teknik dokümantasyonu rahatlıkla okuyup yazabiliyorum.",
    icon: Cpu,
    accent: { from: "#8b5cf6", to: "#ec4899" },
    skills: [
      { name: "Python",        level: 65, color: "#facc15", years: 1, description: "Veri işleme, script otomasyonu ve kütüphane entegrasyonu." },
      { name: "OpenCV",        level: 55, color: "#34d399", years: 1, description: "Görüntü işleme, bölge tespiti ve filtreleme operasyonları." },
      { name: "Agile / Scrum", level: 75, color: "#60a5fa", years: 2, description: "Sprint planlaması, daily standup ve retrospektif süreci." },
      { name: "İngilizce",     level: 80, color: "#f9a8d4", years: 5, description: "Teknik doküman okuma/yazma ve asenkron iletişim." },
      { name: "Algoritma",     level: 70, color: "#a78bfa", years: 2, description: "Veri yapıları, zaman karmaşıklığı analizi ve problem çözme." },
      { name: "UI / UX",       level: 68, color: "#38BDF8", years: 2, description: "Kullanıcı odaklı tasarım prensipleri ve erişilebilirlik standartları." },
    ],
  },
];

export function getCategoryById(id: string): SkillCategory | undefined {
  return skillCategories.find((c) => c.id === id);
}

export function getLevel(level: number): { label: string; color: string } {
  if (level >= 90) return { label: "Uzman",       color: "#34d399" };
  if (level >= 75) return { label: "İleri",        color: "#60a5fa" };
  if (level >= 55) return { label: "Orta",         color: "#fbbf24" };
  return            { label: "Başlangıç",           color: "#f87171" };
}
