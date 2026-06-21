import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const eyebrowRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !videoRef.current ||
      !eyebrowRef.current ||
      !titleRef.current ||
      !buttonRef.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(
      [eyebrowRef.current, titleRef.current],
      {
        y: "-10vh",
        opacity: 1,
        ease: "power2.out",
      },
      0
    )
      .to(
        videoRef.current,
        {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          ease: "none",
        },
        0
      )
      .fromTo(
        buttonRef.current,
        {
          y: 120,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
        },
        0.2
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-background">
      <div className="relative flex h-screen items-center justify-center overflow-hidden">

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

        <video
          ref={videoRef}
          className="absolute h-[60%] w-[61%] rounded-3xl object-cover shadow-[0_30px_120px_rgba(0,0,0,0.2)]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Hero (2).mp4" type="video/mp4" />
        </video>
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">

          <h1
            ref={eyebrowRef}
            className="text-xs font-semibold uppercase tracking-[0.4em] md:text-base bg-lime-400 text-black px-2 rounded"
          >
            ITM Developers Club
          </h1>

          <p
            ref={titleRef}
            className="pointer-events-none select-none text-[clamp(3rem,10vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-white mix-blend-difference"
          >
            ITM Developers Club
          </p>

          <p className="max-w-2xl text-sm leading-7 text-white bold md:text-base bg-lime-400/20 px-4 py-2 rounded">
            A space for builders, creators, and problem-solvers to collaborate on technology that actually gets shipped.
          </p>
        </div>

        <button
          ref={buttonRef}
          className="absolute bottom-10 z-30 rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_25px_rgba(163,230,53,0.9)] transition hover:scale-105 hover:bg-lime-300"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;