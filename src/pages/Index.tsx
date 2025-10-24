import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ContentSections from "@/components/ContentSections";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroCarousel />
      <ContentSections />
    </div>
  );
};

export default Index;
