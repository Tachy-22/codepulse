import { motion } from 'framer-motion';
import React from 'react';

interface SlideInWrapperProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  delay?: number;
  className?: string;
  index?: number;
  staggerChildren?: number;
}

const slideVariants = {
  hidden: (direction: string) => ({
    x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
    y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
    opacity: 0,
  }),
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
  },
};

const SlideInWrapper = ({
  children,
  direction = 'left',
  duration = 0.5,
  delay = 0,
  className = '',
  index = 0,
  staggerChildren = 0.1,
}: SlideInWrapperProps) => {
  const finalDelay = delay + (index * staggerChildren);

  return (
    <motion.div
      className={className}
      variants={slideVariants}
      initial="hidden"
      animate="visible"
      custom={direction}
      transition={{
        duration,
        delay: finalDelay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default SlideInWrapper;
