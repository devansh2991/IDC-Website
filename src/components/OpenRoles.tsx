import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  {
    title: "Frontend Developer",
    openings: 3,
    skills: "React, TypeScript, Tailwind",
    duration: "6 Months",
    mode: "Hybrid",
  },
  {
    title: "Backend Developer",
    openings: 2,
    skills: "Node.js, Express, MongoDB",
    duration: "6 Months",
    mode: "On-site",
  },
  {
    title: "UI / UX Designer",
    openings: 2,
    skills: "Figma, UX Research",
    duration: "4 Months",
    mode: "Remote",
  },
  {
    title: "AI / ML Lead",
    openings: 1,
    skills: "Python, ML Models, Data",
    duration: "8 Months",
    mode: "Hybrid",
  },
  {
    title: "Blockchain Researcher",
    openings: 1,
    skills: "Solidity, Web3, Smart Contracts",
    duration: "6 Months",
    mode: "Remote",
  },
];

const OpenRoles = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=120%",
      pin: true,
      anticipatePin: 1,
    });

    gsap.fromTo(
      titleRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.1,
        ease: "steps(10)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    gsap.fromTo(
      rowsRef.current,
      { y: 24, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-white text-black
                 flex flex-col justify-center px-10 md:px-24"
    >
      <h2
        ref={titleRef}
        className="text-6xl md:text-7xl font-bold tracking-widest
                   font-mono mb-4"
      >
        OPEN ROLES
      </h2>

      <p className="text-gray-500 mb-16 max-w-2xl">
        Join our club and work on real-world projects with hands-on learning,
        mentorship, and collaboration across technical domains.
      </p>

      <div className="grid grid-cols-7 gap-6 pb-4
                      border-b border-black/20
                      font-mono text-sm text-gray-500">
        <span className="col-span-2">ROLE</span>
        <span>SKILLS</span>
        <span>DURATION</span>
        <span>MODE</span>
        <span>OPENINGS</span>
        <span></span>
      </div>

      <div className="mt-6 space-y-6">
        {roles.map((role, i) => (
          <div
            key={i}
            ref={(el) => el && (rowsRef.current[i] = el)}
            className="grid grid-cols-7 gap-6 items-center
                       pb-4 border-b border-black/10
                       font-mono"
          >
            <span className="col-span-2 text-lg font-semibold">
              {role.title}
            </span>

            <span className="text-sm text-gray-600">
              {role.skills}
            </span>

            <span className="text-sm text-gray-600">
              {role.duration}
            </span>

            <span className="text-sm text-gray-600">
              {role.mode}
            </span>

            <span className="text-sm font-bold">
              {role.openings}
            </span>

            <button
              className="
                justify-self-end
                px-5 py-2
                rounded-full
                border border-black
                text-sm font-semibold
                transition
                hover:bg-black hover:text-white
                active:scale-95
              "
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OpenRoles;
