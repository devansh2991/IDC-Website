import MentorsSection from "@/components/MentorsSection";
import { CardStack } from "@/components/CardStack";
import HomePage from "@/components/HomePage";
import Navbar from "@/components/Navbar";
import Mission from "@/components/Mission";
import { Domain } from "domain";
import DomainShowcase from "@/components/DomainShowcase";
import JourneySection from "@/components/JourneySection";
import OpenRoles from "@/components/OpenRoles";
import Footer from "@/components/Footer";

const Index = () => {
  const cards = [
    "https://ik.imagekit.io/sheryians/SRC%20Assets/images/cards/1_Dj259uRdn.webp",
    "https://ik.imagekit.io/sheryians/SRC%20Assets/images/cards/2_fR_vLe3jv.webp",
    "https://ik.imagekit.io/sheryians/SRC%20Assets/images/cards/3_pc_NIl41Y9.webp",
    "https://ik.imagekit.io/sheryians/SRC%20Assets/images/cards/4_Bwe4fMdSab.webp",
  ];

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <HomePage />
      <Mission />
      <JourneySection />
      <DomainShowcase />
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <CardStack cards={cards} />
        </div>
      </section>

      <MentorsSection />
      <OpenRoles />
      <Footer />
    </main>
    
  );
};

export default Index;
