import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "../Assets/Images/i1.jpg";
import img2 from "../Assets/Images/i2.jpg";
import img3 from "../Assets/Images/i3.jpg";
import img4 from "../Assets/Images/i4.jpg";

gsap.registerPlugin(ScrollTrigger);

const images = [img1, img2, img3, img4, img1, img2, img3, img4];

const JourneySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(trackRef.current, {
      xPercent: -(images.length * 100 - 100),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${images.length * 60}%`,
        scrub: true,
        pin: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background overflow-hidden">
      <div className="flex h-screen flex-col justify-center px-6 md:px-12">
        <div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundColor: "#ffffff",
    backgroundImage: `
      radial-gradient(#d1d5db 1px, transparent 1px)
    `,
    backgroundSize: "20px 20px",
  }}
/>
        <div className="relative z-10 mb-6 max-w-8xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-lime-400 bg-lime-500/10 inline-block bold px-5 py-1 rounded-full outline outline-1 outline-lime-500/60">
           Our Story
          </p>
          <h2 className="text-center text-4xl font-bold italic md:mb-4 md:text-6xl">
            Our Journey
          </h2>

          <p className="md:mb-4 mx-auto max-w-2xl text-center text-sm leading-6 text-foreground/70 md:text-base">
            A visual timeline of the events, workshops, and moments that shaped the club into what it is today.
          </p>
        </div>

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-center gap-8 px-6 md:gap-20 md:px-20"
            style={{ width: `${images.length * 2}%` }}
          >
            {images.map((src, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 rounded-2xl border border-white/10 bg-white/90 p-3 "
                style={{
                  width: "300px",
                  height: "420px",
                }}
              >
                <div className="absolute -top-6 left-1/2 h-10 w-6 -translate-x-1/2 rounded-full border-2 border-gray-400" />
                <img
                  src={src}
                  className="h-full w-full rounded-lg object-cover"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;