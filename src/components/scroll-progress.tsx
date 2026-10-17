import { cn } from "@/lib/utils";
import { motion, useScroll, type MotionProps } from "framer-motion";

// Magic UI "scroll-progress" (magicui.design/r/scroll-progress), on framer-motion and the brand gradient
interface ScrollProgressProps extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  ref?: React.Ref<HTMLDivElement>;
}

export function ScrollProgress({ className, ref, ...props }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-[#00a0b0] via-[#2f6bff] to-[#97b5ff]",
        className,
      )}
      style={{ scaleX: scrollYProgress }}
      aria-hidden
      {...props}
    />
  );
}

export default ScrollProgress;
