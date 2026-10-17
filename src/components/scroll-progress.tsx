import { motion, useScroll, useSpring } from "framer-motion";

// Hairline reading-progress bar pinned to the top of the viewport
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#00a0b0] to-[#97b5ff]"
      aria-hidden
    />
  );
};

export default ScrollProgress;
