import useWindowDimensions from "@/lib/hooks/use-window-dimensions";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

export const HorizontalScrollSection = () => {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: horizontalSectionRef,
  });

  const { width: windowWidth } = useWindowDimensions();

  const sectionWidth = useMemo(() => {
    return horizontalSectionRef?.current?.getBoundingClientRect().width ?? null
  }, [horizontalSectionRef]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    // If you have 2 elements, translate the width so that the first element is entirely out of screen.
    // If you have 3 elements, translate the width so that the first 2 elements is out of screen.
    // So on and so forth.
    ["0%", `${100 - (((windowWidth ?? 0) / (sectionWidth ?? 1)) * 100) }%`],
  );
  return (
    <section
      ref={horizontalSectionRef}
      // The height value has to be a multiple of the screen height (more than 1)
      // The lower the multiple, the faster the scroll
      className="relative h-[300vh] bg-black"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          <div className="w-screen h-full bg-yellow-300 grid place-items-center text-8xl font-bold">
            HSection 1
          </div>
          <div className="w-screen h-full bg-green-300 grid place-items-center text-8xl font-bold">
            HSection 2
          </div>
        </motion.div>
      </div>
    </section>
  );
};
