
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import ProjectsSection from "@/components/ProjectsSection";
import InfoSection from "@/components/InfoSection";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <div className="space-y-0 md:space-y-2">
          <ProductsSection />
          <ProjectsSection />
          <InfoSection />
          <NewsSection />
          <ContactSection />
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
