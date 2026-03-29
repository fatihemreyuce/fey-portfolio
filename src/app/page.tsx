import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { HobbiesSection } from "@/components/HobbiesSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <HobbiesSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
