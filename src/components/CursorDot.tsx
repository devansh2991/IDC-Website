import { useEffect, useRef } from "react";
import gsap from "gsap";

const CursorDot = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const mouse = useRef({ x: pos.current.x, y: pos.current.y });

  useEffect(() => {
    if (!dotRef.current) return;
    if ("ontouchstart" in window) return;

    const speed = 0.18;

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * speed;
      pos.current.y += (mouse.current.y - pos.current.y) * speed;

      gsap.set(dotRef.current, {
        x: pos.current.x,
        y: pos.current.y,
      });

      requestAnimationFrame(animate);
    };

    animate();

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div className="cursor-dot" />
    </div>
  );
};

export default CursorDot;
