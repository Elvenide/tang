"use client";

import Subheading from '@/components/Subheading';
import { motion, Variants } from 'motion/react';

export default function RecipeSteps({ steps }: { steps: string[] }) {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  } satisfies Variants;

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  } satisfies Variants;

  return (
    <>
      <Subheading>Steps</Subheading>
      <motion.ol variants={listVariants} initial="hidden" whileInView="visible" className="space-y-2 select-none">
        {steps.map((step, index) => (
          <motion.li key={index} variants={itemVariants}>
            <span className="text-blue-300 mr-2">{index + 1}.</span><span className="text-white">{step}</span>
          </motion.li>
        ))}
      </motion.ol>
    </>
  );
}
