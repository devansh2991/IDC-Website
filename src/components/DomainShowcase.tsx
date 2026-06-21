import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import blockchainImg from "../Assets/Images/block.jpg";
import hackathonImg from "../Assets/Images/hack.jpg";
import aiImg from "../Assets/Images/ai.jpg";
import cyberImg from "../Assets/Images/cyber.jpg";

gsap.registerPlugin(ScrollTrigger);

const domains = [
  {
    title: "Blockchain",
    desc: "Decentralized systems, smart contracts, and Web3 innovation.",
    image: blockchainImg,
  },
  {
    title: "Hackathons",
    desc: "Rapid problem solving through real-world challenges.",
    image: hackathonImg,
  },
  {
    title: "AI & ML",
    desc: "Intelligent systems powered by data and algorithms.",
    image: aiImg,
  },
  {
    title: "Cybersecurity",
    desc: "Protecting systems, networks, and digital assets.",
    image: cyberImg,
  },
];

const DomainShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=100%",
      pin: true,
    });

    return () => trigger.kill();
  }, []);

  const handleEnter = (index: number) => {
    cardsRef.current.forEach((card, i) => {
      gsap.to(card, {
        z: i === index ? 120 : -40,
        scale: i === index ? 1.05 : 0.95,
        duration: 0.3,
        ease: "power3.out",
      });
    });
  };

  const handleLeave = () => {
    cardsRef.current.forEach((card) => {
      gsap.to(card, {
        z: 0,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden "
      style={{ perspective: "1200px" }}
    >
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


      <div className="relative z-10 mb-6 max-w-3xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-lime-400 bg-lime-500/10 inline-block bold px-5 py-1 rounded-full outline outline-1 outline-lime-500/60">
          What We Build
        </p>
        <h1 className="text-4xl font-bold italic text-foreground md:text-5xl lg:text-6xl">
          Explore Our Domains
        </h1>
        <p className="mt-2 text-sm leading-6 text-foreground/70 md:text-base">
          From emerging technologies to hands-on competitions, each track is designed to sharpen real-world skills and create confident builders.
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-6 px-4 md:px-10">
        {domains.map((domain, i) => (
          <div
            key={i}
            ref={(el) => el && (cardsRef.current[i] = el)}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={handleLeave}
            className="
              w-full max-w-xs md:w-[280px]
              h-[360px] md:h-[400px]
              rounded-3xl
              border border-white/10
              bg-white/80
              backdrop-blur-xl
              text-foreground
              shadow-[0_24px_80px_rgba(0,0,0,0.18)]
              cursor-pointer
              transform-gpu
              transition duration-300 ease-out
              hover:-translate-y-2
            "
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="h-40 overflow-hidden rounded-t-3xl md:h-[45%]">
              <img
                src={domain.image}
                alt={domain.title}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

            <div className="space-y-4 p-6">
              <h2 className="text-2xl font-bold tracking-tight">{domain.title}</h2>

              <p className="text-sm leading-6 text-foreground/70">{domain.desc}</p>

              <button className="rounded-full border border-foreground/10 bg-foreground px-5 py-2 text-sm font-semibold text-background transition hover:bg-foreground/90">
                See More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DomainShowcase;