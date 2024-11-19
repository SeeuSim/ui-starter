import { motion, useScroll, useTransform } from "framer-motion";
import { type FC, type PropsWithChildren, useRef } from "react";

import { cn } from "@repo/design-system/lib/utils";

type HorizontalScrollSectionProps = PropsWithChildren<{
  translateXFactor?: string;
  translateYFactor?: string;
  sectionHeight?: string;
}>;

/**
 * A Horizontal scroll section that interrupts the scroll flow
 * of the document for a Left to Right horizontal scroll section.
 * The scroll progress will proceed with vertical scroll input.
 *
 * @param props - The configuration for the component's width.
 *   We recommend the following defaults:
 *     - `translateXFactor`: 100% - screenWidth / sectionWidth * 100%. For a section width of (2 x screen width), this gives
 *       '-50%'.
 *     - `translateYFactor`: The ratio of vertical scroll. We recommend 150vh per 100vw of section width.
 *     - `sectionHeight`: The height of elements within the section wrapper. This defaults to '100vh'.
 *
 * @returns A horizontal scroll wrapper component.
 */
export const HorizontalScrollSection: FC<HorizontalScrollSectionProps> = ({
  children,
  sectionHeight = "h-screen",
  translateYFactor = "h-[300vh]",
  translateXFactor = "-50%",
}) => {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: horizontalSectionRef,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    // If you have 2 elements, translate the width so that the first element is entirely out of screen.
    // If you have 3 elements, translate the width so that the first 2 elements is out of screen.
    // So on and so forth.
    ["0%", translateXFactor],
  );

  return (
    <section
      ref={horizontalSectionRef}
      // The height value has to be a multiple of the screen height (more than 1)
      // The lower the multiple, the faster the scroll
      className={cn("relative bg-background", translateYFactor)}
    >
      <div
        className={cn(
          "sticky top-0 flex items-center overflow-hidden",
          sectionHeight,
        )}
      >
        <motion.div style={{ x }} className="flex h-full">
          {children}
        </motion.div>
      </div>
    </section>
  );
};
