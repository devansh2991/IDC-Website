import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import png from "../Assets/Images/png-2.png";

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const finalText =
      "Our mission is to provide the best learning experience possible by connecting students with industry professionals.";

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*";
    let interval: any;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=100%",
      pin: true,
      scrub: true,

      onEnter: () => {
        let iteration = 0;

        interval = setInterval(() => {
          if (!textRef.current) return;

          const typed = finalText
            .split("")
            .map((letter, index) => {
              if (index < iteration) return finalText[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

          textRef.current.innerHTML = typed;

          if (iteration >= finalText.length) {
            clearInterval(interval);
          }

          iteration += 0.5;
        }, 30);
      },
    });

    return () => {
      if (interval) clearInterval(interval);
      trigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background">
      <div className="flex min-h-screen items-center px-6 py-20 md:px-12 lg:px-20">

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

        <div className="absolute top-1/4 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-foreground/70" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-12 md:flex-row">

            <div className="flex max-w-xl flex-col">
              <div className="min-h-[150px] mb-40">
                <h2 className="text-4xl font-bold italic md:text-5xl lg:text-6xl">
                  Our Mission
                </h2>
                <p
                  ref={textRef}
                  className="mt-6 max-w-md overflow-hidden text-base leading-8 tracking-wide text-foreground/80 md:text-lg"
                ></p>
                
              </div>
            </div>

            <div className="w-[240px] md:w-[360px] lg:w-[420px]">
              <img
                src={png}
                alt="logo"
                className="w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;