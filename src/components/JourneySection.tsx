import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/src/Assets/Images/img-1.jpg",
  "/src/Assets/Images/img-2.jpg",
  "/src/Assets/Images/img-3.jpg",
  "/src/Assets/Images/img-4.jpg",
];

const JourneySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    imageRefs.current.forEach((img, i) =>
      gsap.set(img, { autoAlpha: i === 0 ? 1 : 0 })
    );

    gsap.set(dimRef.current, { autoAlpha: 0 });
    gsap.set(contentRef.current, { autoAlpha: 0, y: 120 });

    const steps = images.length;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${steps * 100}%`,
      pin: true,
      snap: 1 / (steps - 1),

      onUpdate: (self) => {
        const index = Math.round(self.progress * (steps - 1));

        imageRefs.current.forEach((img, i) => {
          gsap.set(img, { autoAlpha: i === index ? 1 : 0 });
        });

        if (index === steps - 1) {
          gsap.to(dimRef.current, {
            autoAlpha: 1,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(contentRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        } else {
          gsap.set(dimRef.current, { autoAlpha: 0 });
          gsap.set(contentRef.current, { autoAlpha: 0, y: 120 });
        }
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >

      {images.map((src, i) => (
        <img
          key={i}
          ref={(el) => el && (imageRefs.current[i] = el)}
          src={src}
          className="absolute inset-0 h-full w-full object-cover"
          alt=""
        />
      ))}

      <div
        ref={dimRef}
        className="absolute inset-0 bg-black/60 pointer-events-none"
      />

      <div
        ref={contentRef}
        className="absolute bottom-24 left-1/2 -translate-x-1/2
                   max-w-4xl text-center text-white"
      >
        <div
          className="absolute inset-0 -z-10 rounded-2xl
                     bg-gradient-to-t from-black/70 via-black/40 to-black/20
                     backdrop-blur-md shadow-2xl"
        />

        <div className="px-10 py-8">
          <h2 className="text-6xl font-bold mb-6">Our Journey</h2>

          <p className="text-xl leading-relaxed font-medium">
            The idea of forming this club came to our current President,
            <strong> Mr. Shivam Gupta</strong>, with a vision to create a platform
            driven by innovation, learning, and collaboration. With the guidance
            of <strong>Dr. Nidhi Dandotiya</strong>, the club took shape and
            continues to grow with purpose and passion.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
