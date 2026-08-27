import { Dumbbell, Flower2, Gamepad2, HeartPulse, Package, Smartphone, type LucideIcon } from "lucide-react";

export interface ProjectTech { name: string; color: string; }

export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  category: "Frontend" | "Backend" | "Fullstack";
  status: "live" | "development" | "completed";
  visibility: "public" | "private";
  featured?: boolean;
  year?: number;
  techs: ProjectTech[];
  features: string[];
  icon: LucideIcon;
  accent: { from: string; to: string };
  githubUrl?: string;
  liveUrl?: string;
  liveUrls?: string[];
}

export const projects: Project[] = [
  {
    id: "tahminmetre", title: "Öngörü", year: 2026, category: "Fullstack", status: "completed", visibility: "private", featured: true,
    shortDesc: "Güncel konulardaki tahminleri sosyal ve oyunlaştırılmış bir mobil deneyime dönüştüren uygulama.",
    longDesc: "Öngörü; kullanıcıların açık tahminlere katıldığı, sonuçları takip ettiği, doğru tahminlerle puan kazandığı ve liderlik tablosunda yer aldığı full-stack bir mobil uygulamadır. Yönetim tarafında tahminlerin yaşam döngüsü; taslak, yayınlama, kapatma, sonuçlandırma ve iptal akışlarıyla yönetilir.",
    icon: Smartphone, accent: { from: "#8b5cf6", to: "#ec4899" },
    techs: [{ name: "React Native", color: "#61DAFB" }, { name: "Expo", color: "#a78bfa" }, { name: "NestJS", color: "#ef4444" }, { name: "Prisma", color: "#5eead4" }, { name: "PostgreSQL", color: "#818cf8" }, { name: "Redis", color: "#f87171" }],
    features: ["Yenilenebilir JWT oturumu ve rol tabanlı yetkilendirme", "Kategori bazlı tahmin keşfi ve tahmin geçmişi", "Puan sistemi ve liderlik tablosu", "Push bildirim cihaz kaydı", "Yönetici için tahmin yaşam döngüsü yönetimi", "Swagger / OpenAPI ile API sözleşmesi"],
  },
  {
    id: "kelepir", title: "Kelepir", year: 2026, category: "Fullstack", status: "live", visibility: "public",
    shortDesc: "Dijital mağazalardaki oyun fiyatlarını karşılaştıran; favori ve fiyat alarmı özellikli web platformu.",
    longDesc: "Kelepir, IsThereAnyDeal API üzerinden oyun fiyatlarını farklı dijital mağazalarda karşılaştıran açık kaynaklı bir web uygulamasıdır. Kullanıcılar oyunları favorilerine ekleyebilir, hedef fiyat belirleyebilir ve koşul sağlandığında e-posta bildirimi alabilir.",
    icon: Gamepad2, accent: { from: "#22c55e", to: "#06b6d4" },
    techs: [{ name: "TypeScript", color: "#60a5fa" }, { name: "NestJS", color: "#ef4444" }, { name: "Prisma", color: "#5eead4" }, { name: "PostgreSQL", color: "#818cf8" }, { name: "JWT", color: "#fbbf24" }],
    features: ["Mağazalar arası anlık fiyat karşılaştırması", "Fiyat geçmişi ve en düşük fiyat takibi", "Favori oyun listesi ve hedef fiyat alarmı", "HTTP-only cookie tabanlı oturum yönetimi", "Zamanlanmış fiyat kontrolü ve e-posta bildirimi", "Canlı, responsive Türkçe arayüz"],
    githubUrl: "https://github.com/fatihemreyuce/kelepir", liveUrl: "https://kelepir.vercel.app",
  },
  {
    id: "bridge", title: "Bridge", year: 2026, category: "Fullstack", status: "development", visibility: "private",
    shortDesc: "Ailelerin bakım, ilaç, randevu, görev ve bildirim süreçlerini tek noktadan yönetmesini sağlayan mobil uygulama.",
    longDesc: "Bridge, aile üyelerinin günlük bakım koordinasyonunu kolaylaştırmak için tasarlanmış bir full-stack mobil uygulamadır. İlaç, randevu, görev, bildirim ve acil durum akışlarını; güvenli aile üyeliği yapısı altında bir araya getirir.",
    icon: HeartPulse, accent: { from: "#f43f5e", to: "#fb7185" },
    techs: [{ name: "Flutter", color: "#38BDF8" }, { name: "Dart", color: "#60a5fa" }, { name: "NestJS", color: "#ef4444" }, { name: "Prisma", color: "#5eead4" }, { name: "PostgreSQL", color: "#818cf8" }],
    features: ["Aile üyeliği ve davet akışları", "İlaç, randevu ve görev yönetimi", "Cihaz bildirimi ve aile bildirim tercihleri", "Acil durum ve bakım koordinasyonu", "JWT ile güvenli API erişimi", "Docker Compose ile yerel geliştirme ortamı"],
  },
  {
    id: "coltsoft-panel", title: "Coltsoft Panel", year: 2026, category: "Fullstack", status: "completed", visibility: "private",
    shortDesc: "Stok, cari, depo ve satın alma süreçleri için tasarlanmış multi-tenant yönetim paneli.",
    longDesc: "Coltsoft Panel; işletmelerin stok, cari hesap, depo, satın alma ve raporlama operasyonlarını merkezi olarak yönetmesi için geliştirilen kapsamlı bir yönetim panelidir. Çok kiracılı yapı ve rol tabanlı yetkilendirme, farklı ekiplerin güvenli biçimde çalışmasını destekler.",
    icon: Package, accent: { from: "#f59e0b", to: "#f97316" },
    techs: [{ name: "Next.js", color: "#e4e4e7" }, { name: "TypeScript", color: "#60a5fa" }, { name: "Supabase", color: "#34d399" }, { name: "PostgreSQL", color: "#818cf8" }, { name: "RBAC", color: "#fbbf24" }],
    features: ["Multi-tenant mimari ve rol tabanlı yetkilendirme", "Cari hesap ve müşteri yönetimi", "Stok, depo ve barkod işlemleri", "Satın alma ve fatura süreçleri", "Raporlama, filtreleme ve dışa aktarma", "Planlı ve dokümante edilmiş geliştirme akışları"],
  },
  {
    id: "fitness-app", title: "Fitness App", year: 2026, category: "Fullstack", status: "completed", visibility: "public",
    shortDesc: "Egzersiz kütüphanesi, set/tekrar/kilo kaydı ve antrenman geçmişi sunan mobil uygulama.",
    longDesc: "Fitness App, kullanıcıların antrenmanlarını düzenli kaydetmesine ve gelişimini takip etmesine yardımcı olan bir mobil uygulamadır. Supabase üzerinde kurulu veri modeli, RLS politikaları ve hazır egzersiz verileriyle geliştirilmiştir.",
    icon: Dumbbell, accent: { from: "#f97316", to: "#ef4444" },
    techs: [{ name: "React Native", color: "#61DAFB" }, { name: "Expo", color: "#a78bfa" }, { name: "Supabase", color: "#34d399" }, { name: "PostgreSQL", color: "#818cf8" }],
    features: ["Hazır egzersiz kütüphanesi", "Set, tekrar ve ağırlık kaydı", "Antrenman geçmişi takibi", "Supabase Auth ve Row Level Security", "Yerel Docker/Supabase geliştirme ortamı", "Expo ile iOS ve Android test akışı"],
    githubUrl: "https://github.com/fatihemreyuce/Fitness-App",
  },
  {
    id: "aycicegi-spirali", title: "Ayçiçeği Spirali", year: 2026, category: "Frontend", status: "completed", visibility: "public",
    shortDesc: "Fibonacci dizisi, altın oran ve graf teorisini etkileşimli biçimde görselleştiren masaüstü uygulaması.",
    longDesc: "Ayçiçeği Spirali; ayçiçeği tohumlarının dizilimini Vogel formülü, altın açı ve yönlü graflarla modelleyen bir dönem projesidir. Uygulama matematiksel kavramları görsel ve etkileşimli bir deneyime dönüştürür.",
    icon: Flower2, accent: { from: "#eab308", to: "#f97316" },
    techs: [{ name: "Python", color: "#facc15" }, { name: "PySide6", color: "#34d399" }, { name: "Graph Theory", color: "#a78bfa" }],
    features: ["Vogel formülü ile spiral üretimi", "Altın açı ve Fibonacci ilişkisini görselleştirme", "Yakınsama grafikleri ve komşuluk matrisi", "Graf modeli üzerinden yapısal inceleme"],
    githubUrl: "https://github.com/fatihemreyuce/aycicegi-spirali",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
