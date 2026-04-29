import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  subtitleClassName?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, subtitleClassName = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <h2 className="inline-block text-4xl text-blue-900 section-title">{title}</h2>
     {subtitle && (
  <p
    className={`section-subtitle ${subtitleClassName} leading-relaxed text-base text-gray-600 mt-4 whitespace-normal`}
    style={{
      lineHeight: '1.625',      // manually enforce line-height
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
      WebkitFontSmoothing: 'antialiased',
    }}
  >
    {subtitle}
  </p>
)}

    </motion.div>
  );
};

export default SectionHeading;
