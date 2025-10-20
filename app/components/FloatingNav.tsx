"use client";
// Derived from https://ui.aceternity.com/components/floating-dock

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { IconLogin2, IconMenu2, IconUser } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
 
import { useEffect, useRef, useState } from "react";
import { useAppService } from "@/lib/app-service";

export default function FloatingNav({
  items
}: {
  items: { id: string, title: string; icon: React.ReactNode; href: string }[];
}) {
  const service = useAppService();
  const pages = [...items];
  if (service.loggedInAs)
    pages.push({
      id: "profile",
      title: service.loggedInAs.username,
      icon: <IconUser />,
      href: "/user/" + service.loggedInAs.id,
    });
  else
    pages.push({
      id: "login",
      title: "Login",
      icon: <IconLogin2 />,
      href: "/login",
    });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [open, setOpen] = useState(true);
  const { scrollYProgress } = useScroll();
 
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.95) {
      setOpen(true);
    }
    else {
      setOpen(false);
    }
  });

  return (
    <motion.div initial={{ y: 100, opacity: 1 }} animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="fixed bottom-4 right-4 lg:right-auto md:left-1/2 md:-translate-x-1/2 w-fit z-30 drop-shadow-md drop-shadow-black select-none">
      {isClient && <FloatingDock items={pages} />}
    </motion.div>
  );
}
 
export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { id: string, title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};
 
const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { id: string, title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const service = useAppService();
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900"
                >
                  <div className={`h-4 w-4 *:h-full *:w-full ${service.currentPage === item.id ? "text-blue-300" : ""}`}>{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900"
      >
        <IconMenu2 className="h-5 w-5 text-neutral-400" />
      </button>
    </div>
  );
};
 
const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { id: string, title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl px-4 pb-3 md:flex bg-neutral-900",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};
 
function IconContainer({
  mouseX,
  id,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);
  const service = useAppService();
 
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
 
    return val - bounds.x - bounds.width / 2;
  });
 
  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
 
  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );
 
  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
 
  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
 
  const [hovered, setHovered] = useState(false);
 
  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-neutral-800"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit font-bold text-sm rounded-md border px-2 py-0.5 whitespace-pre border-neutral-900 bg-neutral-800 text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={`flex items-center justify-center *:h-full *:w-full ${service.currentPage === id ? "text-blue-300" : ""}`}
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}