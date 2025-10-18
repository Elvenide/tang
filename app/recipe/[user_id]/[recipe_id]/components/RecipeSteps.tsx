"use client";

import Subheading from '@/components/Subheading';
import { motion, Variants } from 'motion/react';

export default function RecipeSteps({ steps }: { steps: string[] }) {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  } satisfies Variants;

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  } satisfies Variants;

  return (
    <div>
      <Subheading>Steps</Subheading>
      <motion.ol variants={listVariants} initial="hidden" animate="visible">
        {steps.map((step, index) => (
          <motion.li key={index} variants={itemVariants}>
            {step}
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
