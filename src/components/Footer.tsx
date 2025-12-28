import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Github, Twitter, Youtube } from "lucide-react";

gsap.registerPlugin(Draggable);

const stickers = [
  { id: 1, src: "src\\Assets\\Images\\png-4.png", x: 1200, y: 100 },
  { id: 2, src: "src\\Assets\\Images\\png-2.png", x: 350, y: 100 },
  { id: 3, src: "src\\Assets\\Images\\png-3.png", x: 1000, y: 120 },
  { id: 4, src: "src\\Assets\\Images\\png-1.png", x: 120, y: 40 },
];

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickerRefs = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    stickerRefs.current.forEach((el, i) => {
      if (!el) return;

      gsap.to(el, {
        y: "+=20",
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(el, {
        rotation: Math.random() * 6 - 3,
        duration: 4 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      Draggable.create(el, {
        type: "x,y",
        bounds: containerRef.current,
        inertia: true,
        dragResistance: 0.15,
      });
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-black"
    >

      <div className="absolute top-0 left-0 w-full h-20 bg-black z-30
                      rounded-b-[100%]" />

      <div className="absolute inset-x-0 top-20 bottom-40 bg-[#e6e6e6]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {stickers.map((s, i) => (
          <img
            key={s.id}
            ref={(el) => el && (stickerRefs.current[i] = el)}
            src={s.src}
            alt=""
            className="absolute w-24 cursor-grab active:cursor-grabbing select-none"
            style={{ left: s.x, top: s.y }}
            draggable={false}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="
              px-12 py-4
              rounded-full
              bg-lime-400
              text-black
              font-bold
              text-xl
              shadow-xl
              hover:scale-105
              transition
            "
          >
            Join the Club!!
          </button>
        </div>
      </div>

      <div className="absolute bottom-40 left-0 w-full h-20 bg-black z-30
                      rounded-t-[100%]" />

      <div className="absolute bottom-0 left-0 w-full h-40 bg-black text-white">
        <p className="absolute top-6 right-10 max-w-md text-sm text-white/80">
          From shipping pixels with purpose to rewriting the rules with code —
          there&apos;s a bit of madness in our method.
        </p>

        <h1 className="absolute bottom-6 left-10 text-[96px] font-extrabold">
          IDC
        </h1>

        <div className="absolute bottom-8 right-10 flex gap-5 text-white/80">
          <Github className="hover:text-white cursor-pointer" />
          <Twitter className="hover:text-white cursor-pointer" />
          <Youtube className="hover:text-white cursor-pointer" />
        </div>
      </div>
    </section>
  );
};

export default Footer;
