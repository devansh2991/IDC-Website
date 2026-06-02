import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image1 from "../Assets/Images/c1.jpg";
import Image2 from "../Assets/Images/c2.jpg";
import Image3 from "../Assets/Images/c3.jpg";
import Image4 from "../Assets/Images/c4.jpg";
import bg from "../Assets/Images/bg.jpg";
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

      const offset = (index - centerIndex) * 280;
      const rotation = (index - centerIndex) * 8;
      const verticalOffset = Math.abs(index - centerIndex) * 15;

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
      className="min-h-screen flex items-center justify-center"
    >
      <div className="relative w-full max-w-7xl h-[500px] flex items-center justify-center">
        {images.map((imageSrc, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="absolute"
            style={{ zIndex: index }}
          >
            <div
              className="w-[280px] h-[400px] rounded-2xl overflow-hidden shadow-2xl"
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
  );
};