import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CardStackProps {
  cards: string[];
}

export const CardStack = ({ cards }: CardStackProps) => {
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!stackRef.current) return;

    const cardElements = cardsRef.current.filter(Boolean);

    // Create timeline for card unwrapping with pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: "top top",
        end: "+=2000", // Scroll distance for animation
        scrub: 1,
        pin: true, // Pin the section while animating
        anticipatePin: 1,
      },
    });

    // Animate each card to fan out horizontally with more dramatic spread
    cardElements.forEach((card, index) => {
      const totalCards = cardElements.length;
      const centerIndex = (totalCards - 1) / 2;
      const offset = (index - centerIndex) * 280; // Much larger horizontal spacing for full unwrap
      const rotation = (index - centerIndex) * 8; // More dramatic rotation
      const verticalOffset = Math.abs(index - centerIndex) * 15; // More vertical offset

      tl.to(
        card,
        {
          x: offset,
          y: verticalOffset,
          rotate: rotation,
          ease: "power2.out",
        },
        0
      );
    });

    return () => {
      // Clean up only this timeline and its ScrollTrigger
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={stackRef}
      className="card-stack-container min-h-screen flex items-center justify-center"
    >
      <div className="card-stack relative w-full max-w-7xl h-[500px] flex items-center justify-center">
        {cards.map((imageSrc, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="card-container absolute"
            style={{
              zIndex: index,
            }}
          >
            <div
              className="card-3d w-[280px] h-[400px]"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              {/* Front Face */}
              <div
                className="card-face front absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
                }}
              >
                <img
                  src={imageSrc}
                  alt={`Card ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
              </div>
              
              {/* Back Face */}
              <div
                className="card-face back absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-primary via-accent to-primary"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-background">
                      {index + 1}
                    </div>
                    <div className="text-xl font-semibold text-background/90">
                      Card {index + 1}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


