import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image1 from "../Assets/Images/c1.jpg";
import Image2 from "../Assets/Images/c2.jpg";
import Image3 from "../Assets/Images/c3.jpg";
import Image4 from "../Assets/Images/c4.jpg";

gsap.registerPlugin(ScrollTrigger);

export const CardStack = () => {
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const images = [Image1, Image2, Image3, Image4];

  useEffect(() => {
    if (!stackRef.current) return;

    const cardElements = cardsRef.current.filter(Boolean);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    cardElements.forEach((card, index) => {
      const totalCards = cardElements.length;
      const centerIndex = (totalCards - 1) / 2;

      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width || 280;
      const cardHeight = cardRect.height || 400;

      const offset = (index - centerIndex) * (cardWidth + 20);
      const rotation = (index - centerIndex) * 6;
      const verticalOffset = Math.abs(index - centerIndex) * (cardHeight * 0.04);

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
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={stackRef}
      className="relative min-h-screen w-full flex items-center justify-center"
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: `
            radial-gradient(#d1d5db 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 flex w-full flex-col items-center justify-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-lime-400 bg-lime-500/10 inline-block bold px-5 py-1 rounded-full outline outline-1 outline-lime-500/60">
          Our Work
        </p>
        <h1 className="text-4xl font-bold italic text-foreground md:text-5xl lg:text-6xl">
          Events & Activities
        </h1>

        <div className="relative w-full max-w-7xl h-[360px] md:h-[500px] flex items-center justify-center">
          {images.map((imageSrc, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute"
              style={{ zIndex: index }}
            >
              <div
                className="w-[220px] sm:w-[240px] md:w-[280px] h-[320px] sm:h-[360px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <img
                  src={imageSrc}
                  alt={`Card ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};