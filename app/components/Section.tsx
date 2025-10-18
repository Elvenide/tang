"use client";

import React from 'react';
import { motion } from 'motion/react';

type SectionProps = {
  children?: React.ReactNode;
  className?: string;
  fadeIn?: boolean;
};

export default function Section({ children="", className = "", fadeIn = true }: SectionProps) {
  return (
    <section className={`relative z-20 py-6 lg:py-20 px-10 lg:px-24 w-full mx-auto ${className}`}>
      <motion.div initial={{ opacity: fadeIn ? 0 : 1 }} transition={{ duration: 1 }} whileInView={{ opacity: 1 }} className="w-full h-full">
        {children}
      </motion.div>
    </section>
  );
};
