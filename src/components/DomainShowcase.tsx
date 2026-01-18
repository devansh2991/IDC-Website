import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import blockchainImg from "../Assets/Images/blockchain-technology-cartoon-illustration.jpg";
import hackathonImg from "../Assets/Images/colleagues-collaborating-cyberpunk-setting.jpg";
import aiImg from "../Assets/Images/cartoon-woman-wearing-vr-glasses.jpg";
import cyberImg from "../Assets/Images/cybersecurity-concept-collage-design.jpg";

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

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=900",
      pin: true,
      anticipatePin: 1,
    });

    return () => ScrollTrigger.killAll();
  }, []);

  const handleEnter = (index: number) => {
    cardsRef.current.forEach((card, i) => {
      gsap.to(card, {
        z: i === index ? 140 : -60,
        scale: i === index ? 1.07 : 0.95,
        duration: 0.35,
        ease: "power3.out",
        force3D: true,
      });
    });
  };

  const handleLeave = () => {
    cardsRef.current.forEach((card) => {
      gsap.to(card, {
        z: 0,
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
        force3D: true,
      });
    });
  };

  return (
    <section
      ref={sectionRef}
      className="h-screen bg-black flex items-center justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div className="stars absolute inset-0 z-0 pointer-events-none" />
      <div className="flex gap-10 px-10">
        {domains.map((domain, i) => (
          <div
            key={i}
            ref={(el) => el && (cardsRef.current[i] = el)}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={handleLeave}
            className="
              w-[280px] h-[420px]
              rounded-3xl
              bg-white/5
              backdrop-blur
              text-white
              shadow-2xl
              cursor-pointer
              transform-gpu
              will-change-transform
            "
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Image */}
            <div className="h-[55%] overflow-hidden rounded-t-3xl">
              <img
                src={domain.image}
                alt={domain.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">{domain.title}</h2>

              <p className="text-sm text-white/70">
                {domain.desc}
              </p>

              <button className="px-5 py-2 rounded-full bg-lime-400 text-black font-semibold text-sm">
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
