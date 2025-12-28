import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !videoRef.current ||
      !textRef.current ||
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

    tl
      .to(
        textRef.current,
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
    <div ref={sectionRef} className="min-h-screen bg-black text-white">
      <div className="h-screen flex items-center justify-center relative overflow-hidden">
              <div className="stars absolute inset-0 z-0 pointer-events-none" />
        <h1
          ref={textRef}
          className="
            absolute
            text-[11vw]
            font-extrabold
            mix-blend-difference
            pointer-events-none
            select-none
            ml-[5vw]
            z-10
          "
        >
          ITM Developers Club
        </h1>

        <video
          ref={videoRef}
          className="position-absolute w-[60%] h-[60%] rounded-2xl object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/src/Assets/Video/Hero (2).mp4" type="video/mp4" />
        </video>

        <button
          ref={buttonRef}
          className="
            absolute
            bottom-10
            px-5
            py-2
            bg-lime-400
            text-black
            font-bold
            rounded-full
            shadow-xl
            text-medium
            z-20
            hover:bg-white
          "
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;
