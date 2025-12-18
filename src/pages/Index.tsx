import MentorsSection from "@/components/MentorsSection";
import { CardStack } from "@/components/CardStack";

const Index = () => {
  const cards = [
    "https://ik.imagekit.io/sheryians/SRC%20Assets/images/cards/1_Dj259uRdn.webp",
    "https://ik.imagekit.io/sheryians/SRC%20Assets/images/cards/2_fR_vLe3jv.webp",
    "https://ik.imagekit.io/sheryians/SRC%20Assets/images/cards/3_pc_NIl41Y9.webp",
    "https://ik.imagekit.io/sheryians/SRC%20Assets/images/cards/4_Bwe4fMdSab.webp",
  ];

  return (
    <main className="relative min-h-screen bg-background">
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Horizontal Card Unwrap
          </h2>

          <CardStack cards={cards} />
        </div>
      </section>

      <MentorsSection />
    </main>
  );
};

export default Index;
