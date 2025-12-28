import { useEffect, useRef, useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const navItem =
  "relative text-sm font-semibold text-black cursor-pointer " +
  "transition-colors duration-300 " +
  "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 " +
  "after:bg-current after:rounded-full " +
  "after:transition-all after:duration-300 after:ease-out " +
  "hover:after:w-full";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current || !itemsRef.current) return;

    const items = itemsRef.current.children;

    if (open) {
      gsap.to(panelRef.current, {
        width: "auto",
        duration: 0.45,
        ease: "power3.out",
      });

      gsap.fromTo(
        items,
        { autoAlpha: 0, x: 20 },
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.06,
          duration: 0.3,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    } else {
      gsap.to(items, {
        autoAlpha: 0,
        x: 20,
        stagger: 0.04,
        duration: 0.2,
        ease: "power3.in",
      });

      gsap.to(panelRef.current, {
        width: 0,
        duration: 0.3,
        ease: "power3.inOut",
        delay: 0.1,
      });
    }
  }, [open]);

  return (
    <nav className="fixed top-6 w-full z-50 flex justify-center font-[Poppins]">
      <div className="max-w-8xl w-full flex justify-between px-6">

        <h1 className="text-white mix-blend-difference font-bold text-3xl">
          IDC
        </h1>

        <div className="h-12 flex items-center rounded-full shadow-lg bg-lime-400">

          <div
            ref={panelRef}
            className="h-full flex items-center"
            style={{ width: 0, overflow: "hidden" }}
          >
            <div
              ref={itemsRef}
              className="flex items-center gap-5 px-6 whitespace-nowrap"
            >

              <NavLink to="/" className={navItem}>
                HOME
              </NavLink>

              <NavLink to="/mission" className={navItem} activeClassName="after:w-full">
                MISSION
              </NavLink>

              <NavLink to="/carousel" className={navItem} activeClassName="after:w-full">
                CAROUSEL
              </NavLink>

              <NavLink to="/onboarding" className={navItem} activeClassName="after:w-full">
                ONBOARDING
              </NavLink>

              <NavLink to="/timelapse" className={navItem} activeClassName="after:w-full">
                TIMELAPSE
              </NavLink>

              <NavLink to="/mentors" className={navItem} activeClassName="after:w-full">
                MENTORS
              </NavLink>

              <NavLink to="/roles" className={navItem} activeClassName="after:w-full">
                OPEN ROLES
              </NavLink>
            </div>
          </div>

          <NavLink
            to="/join"
            className="px-5 text-sm font-semibold text-black whitespace-nowrap cursor-pointer"
          >
            JOIN CLUB
          </NavLink>

          <button
            onClick={() => setOpen(!open)}
            className="w-12 h-12 flex items-center justify-center border-l border-black/20 cursor-pointer"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
