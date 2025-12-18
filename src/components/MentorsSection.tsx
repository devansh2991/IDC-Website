import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MentorCard from "./MentorCard";
import MentorOverlay from "./MentorOverlay";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Mentor {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Aayush Chouhan",
    role: "Frontend Lead",
    description: "Frontend wizard with a flair for 3D — blends Three.js magic with creative coding. A true jack of all digital trades.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "UX Director",
    description: "Crafts intuitive experiences with a keen eye for detail. Transforms complex problems into elegant, user-centered solutions.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Tech Architect",
    description: "System designer who builds scalable foundations. Passionate about clean code and sustainable architecture patterns.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Sofia Laurent",
    role: "Creative Director",
    description: "Visual storyteller pushing boundaries of digital art. Merges traditional aesthetics with cutting-edge technology.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "James Okonkwo",
    role: "Backend Expert",
    description: "Database maestro and API architect. Specializes in high-performance systems that scale seamlessly.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Yuki Tanaka",
    role: "Motion Designer",
    description: "Animation virtuoso bringing interfaces to life. Creates fluid, purposeful motion that enhances user experience.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: 7,
    name: "Rahul Sharma",
    role: "AI Engineer",
    description: "Machine learning expert crafting intelligent solutions. Bridges the gap between data science and practical applications.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: 8,
    name: "Priya Patel",
    role: "Product Lead",
    description: "Strategic thinker driving product vision. Transforms user insights into features that delight and convert.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: 9,
    name: "David Kim",
    role: "DevOps Lead",
    description: "Infrastructure wizard ensuring seamless deployments. Automates everything for maximum efficiency and reliability.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&crop=face",
  },
];

const MentorsSection = () => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const cards = cardsRef.current;

    if (!trigger || !cards) return;

    // Compute start/end positions so the FIRST card is visually centered at start
    const compute = () => {
      const totalWidth = cards.scrollWidth;
      const containerEl = trigger.querySelector('.container') as HTMLElement | null;
      const containerWidth = containerEl ? containerEl.clientWidth : window.innerWidth;
      const maxScroll = Math.max(0, totalWidth - containerWidth + 200);

      const firstCard = cards.querySelector('.mentor-card') as HTMLElement | null;
      let startX = 0;
      if (firstCard) {
        const firstRect = firstCard.getBoundingClientRect();
        const containerRect = containerEl ? containerEl.getBoundingClientRect() : null;
        const containerLeft = containerRect ? containerRect.left : 0;
        const targetCenter = containerLeft + containerWidth / 2;
        const firstCenter = firstRect.left + firstRect.width / 2;
        startX = targetCenter - firstCenter;
      }

      const endX = -maxScroll;
      const distance = Math.max(0, Math.abs(endX - startX));
      return { startX, endX, distance, maxScroll };
    };

    // Set initial centered position (first card centered)
    const init = compute();
    gsap.set(cards, { x: init.startX });

    // Keep start position correct on refresh/resizes
    const onRefreshInit = () => {
      const m = compute();
      gsap.set(cards, { x: m.startX });
    };
    ScrollTrigger.addEventListener('refreshInit', onRefreshInit);

    const ctx = gsap.context(() => {
      // Horizontal scroll animation
      gsap.to(cards, {
        x: () => compute().endX,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${compute().distance}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax effect on individual cards
      const cardElements = cards.querySelectorAll('.mentor-card');
      cardElements.forEach((card, i) => {
        gsap.to(card, {
          y: (i % 2 === 0 ? -30 : 30),
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: () => `+=${compute().distance}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', onRefreshInit);
      ctx.revert();
    };
  }, []);

  const handleMentorClick = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setTimeout(() => setSelectedMentor(null), 400);
  };

  return (
    <>
      <section ref={sectionRef} className="relative bg-background">
        <div ref={triggerRef} className="min-h-screen flex flex-col justify-center overflow-hidden">
          {/* Background noise texture */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Dot indicator */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-foreground/70" />

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            {/* Header */}
            <div className="max-w-xl mb-16">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 leading-[1.1] italic">
                Mentors of the club.
              </h2>

              <p className="font-body text-base md:text-lg text-muted-foreground max-w-md leading-relaxed mb-8">
                we've curated the best mentors of the industry to bring the best experience out there.
              </p>

              {/* Meet them CTA */}
              <div className="flex items-center gap-3 cursor-pointer group">
                <ChevronDown className="w-4 h-4 text-foreground transition-transform group-hover:translate-y-1" />
                <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  meet them
                </span>
              </div>
            </div>

            {/* Horizontal Cards Container */}
            <div className="relative">
              <div 
                ref={cardsRef}
                className="flex gap-5 md:gap-6 will-change-transform"
              >
                {mentors.map((mentor, index) => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    index={index}
                    onClick={() => handleMentorClick(mentor)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Detail Overlay */}
      <MentorOverlay
        mentor={selectedMentor}
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
      />
    </>
  );
};

export default MentorsSection;
