import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || !missionRef.current || !workRef.current)
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    gsap.set(workRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(cardsRef.current, { opacity: 0, scale: 0.85 });

    tl.to(missionRef.current, {
      scale: 1.1,
      ease: "none",
    }, 0);

    tl.to(missionRef.current, {
      opacity: 0,
      scale: 0.8,
      ease: "power2.inOut",
    }, 0.3);

    tl.to(workRef.current, {
      opacity: 1,
      scale: 1,
      ease: "power2.out",
    }, 0.55);

    tl.to(cardsRef.current, {
      opacity: 1,
      scale: 1,
      stagger: 0.15,
      ease: "power3.out",
    }, 0.7);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen bg-black text-white overflow-hidden"
    >
      <div className="stars absolute inset-0 z-0 pointer-events-none" />

      <div
        ref={missionRef}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="max-w-5xl px-6 text-center space-y-8">
          <h1 className="text-7xl md:text-6xl font-extrabold">
            Our Mission
          </h1>
          <p className="text-xl md:text-2l text-white/80 leading-relaxed">
            We create a culture where students learn by building, not just
            studying. Instead of memorizing concepts, they apply them through
            real-world projects that mirror industry challenges. Collaboration
            is at the core of our approach—students work in teams, share ideas,
            and grow together. This hands-on environment builds confidence,
            practical skills, and a strong problem-solving mindset.
          </p>
        </div>
      </div>

      <div
        ref={workRef}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="max-w-6xl px-6">
          <h2 className="text-6xl font-extrabold text-center mb-16">
            What We Do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Build",
                text:
                  "We focus on hands-on development through real-world projects. Members build applications, tools, and systems that turn ideas into working products.",
              },
              {
                title: "Learn",
                text:
                  "Learning happens through workshops, peer sessions, and practical exploration of modern technologies beyond classroom theory.",
              },
              {
                title: "Grow",
                text:
                  "We help members grow through collaboration, mentorship, and exposure to industry practices that build confidence and career readiness.",
              },
            ].map((item, i) => (
              <div
                key={i}
                ref={(el) => el && (cardsRef.current[i] = el)}
                className="p-8 rounded-3xl bg-white/5 backdrop-blur shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
