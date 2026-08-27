import { Code2, Cpu, Server, Wrench, type LucideIcon } from "lucide-react";

export interface Skill { name: string; level: number; color: string; years: number; description: string; }
export interface SkillCategory { id: string; title: string; shortDesc: string; longDesc: string; icon: LucideIcon; accent: { from: string; to: string }; skills: Skill[]; }

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend", title: "Frontend", icon: Code2, accent: { from: "#3b82f6", to: "#06b6d4" },
    shortDesc: "Modern, erişilebilir ve performanslı kullanıcı arayüzleri.",
    longDesc: "React ekosistemi üzerinde kullanıcı deneyimini önceliklendiren arayüzler geliştiriyorum. Next.js, TypeScript ve Tailwind CSS günlük araç setimin temelini oluşturuyor.",
    skills: [
      { name: "React", level: 90, color: "#61DAFB", years: 3, description: "Hooks, context, custom hook geliştirme ve performans optimizasyonu." },
      { name: "Next.js", level: 85, color: "#e4e4e7", years: 2, description: "App Router, SSR/SSG ve tip güvenli web uygulamaları." },
      { name: "TypeScript", level: 82, color: "#60a5fa", years: 2, description: "Strict mode, utility types, generics ve type narrowing." },
      { name: "Tailwind CSS", level: 92, color: "#38BDF8", years: 3, description: "Responsive tasarım, dark mode ve özel animasyonlar." },
      { name: "React Native", level: 70, color: "#61DAFB", years: 1, description: "Expo ile iOS ve Android için veri odaklı mobil uygulamalar." },
      { name: "HTML / CSS", level: 95, color: "#f97316", years: 4, description: "Semantik markup, CSS Grid/Flexbox ve erişilebilirlik." },
    ],
  },
  {
    id: "backend", title: "Backend", icon: Server, accent: { from: "#10b981", to: "#6366f1" },
    shortDesc: "Güvenli REST API’ler, veri modelleri ve iş akışları.",
    longDesc: "NestJS ve Express.js ile API’ler, Prisma ve PostgreSQL ile veri katmanları geliştiriyorum. Kimlik doğrulama, yetkilendirme, dokümantasyon ve container tabanlı geliştirme akışlarında pratik deneyime sahibim.",
    skills: [
      { name: "NestJS", level: 72, color: "#ef4444", years: 1, description: "Modüler REST API, DTO doğrulama, Swagger ve JWT akışları." },
      { name: "Express.js", level: 68, color: "#a3a3a3", years: 1, description: "Middleware, REST uçları ve hata yönetimi." },
      { name: "Prisma", level: 70, color: "#5eead4", years: 1, description: "Şema tasarımı, migration, ilişki modelleme ve sorgular." },
      { name: "PostgreSQL", level: 68, color: "#818cf8", years: 1, description: "İlişkisel veri modelleme, SQL ve erişim politikaları." },
      { name: "REST API", level: 75, color: "#34d399", years: 1, description: "Kaynak odaklı endpoint tasarımı ve OpenAPI dokümantasyonu." },
      { name: "JWT / Auth", level: 70, color: "#fbbf24", years: 1, description: "Access/refresh token, rol tabanlı erişim ve oturum akışları." },
    ],
  },
  {
    id: "mobile", title: "Mobil Geliştirme", icon: Cpu, accent: { from: "#a855f7", to: "#ec4899" },
    shortDesc: "Tek kod tabanıyla iOS ve Android için mobil deneyimler.",
    longDesc: "React Native / Expo ve Flutter / Dart ile; API entegrasyonu, kimlik doğrulama ve bildirim akışları içeren mobil uygulamalar geliştiriyorum.",
    skills: [
      { name: "React Native", level: 70, color: "#61DAFB", years: 1, description: "Expo, mobil navigasyon ve REST API entegrasyonu." },
      { name: "Expo", level: 68, color: "#a78bfa", years: 1, description: "Cihaz testi, geliştirme build’leri ve uygulama akışları." },
      { name: "Flutter", level: 65, color: "#38BDF8", years: 1, description: "Widget tabanlı arayüzler ve mobil uygulama mimarisi." },
      { name: "Dart", level: 65, color: "#60a5fa", years: 1, description: "Null safety, asenkron işlemler ve uygulama katmanları." },
      { name: "Push Notifications", level: 60, color: "#f87171", years: 1, description: "Cihaz kaydı ve bildirim tercihleriyle entegrasyon." },
    ],
  },
  {
    id: "araclar", title: "Araçlar & DevOps", icon: Wrench, accent: { from: "#f59e0b", to: "#ef4444" },
    shortDesc: "Geliştirme süreçlerini hızlandıran araç ve altyapı bilgisi.",
    longDesc: "Git ile sürüm kontrolü yapıyor; Docker ile yerel geliştirme ortamları kuruyor ve Postman ile API sözleşmelerini test ediyorum.",
    skills: [
      { name: "Git / GitHub", level: 88, color: "#f97316", years: 3, description: "Branch stratejisi, PR süreci, rebase ve conflict çözümü." },
      { name: "Docker", level: 70, color: "#60a5fa", years: 1, description: "Image oluşturma, Compose ve yerel servis yönetimi." },
      { name: "Postman", level: 85, color: "#f97316", years: 2, description: "API testleri, collection ve environment yönetimi." },
      { name: "Supabase", level: 68, color: "#34d399", years: 1, description: "Auth, PostgreSQL, RLS ve yerel geliştirme akışları." },
      { name: "Redis", level: 55, color: "#f87171", years: 1, description: "Önbellekleme ve arka plan işlerinde temel kullanım." },
      { name: "Linux / CLI", level: 70, color: "#e4e4e7", years: 2, description: "Shell komutları, dosya yönetimi ve süreç kontrolü." },
    ],
  },
];

export function getCategoryById(id: string): SkillCategory | undefined { return skillCategories.find((category) => category.id === id); }
export function getLevel(level: number): { label: string; color: string } {
  if (level >= 90) return { label: "Uzman", color: "#34d399" };
  if (level >= 75) return { label: "İleri", color: "#60a5fa" };
  if (level >= 55) return { label: "Orta", color: "#fbbf24" };
  return { label: "Başlangıç", color: "#f87171" };
}
