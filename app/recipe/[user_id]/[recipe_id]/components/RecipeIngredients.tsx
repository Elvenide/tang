"use client";

import { motion, Variants } from 'motion/react';
import { useRef } from 'react';
import { Ingredient } from '@/lib/schema';
import Subheading from '@/components/Subheading';

export default function RecipeIngredients({ ingredients }: { ingredients: Ingredient[] }) {
  const colorSchemes = [
    { name: 'bg-blue-800', quantity: 'text-blue-300' },
    { name: 'bg-green-800', quantity: 'text-green-300' },
    { name: 'bg-purple-800', quantity: 'text-purple-300' },
    { name: 'bg-red-800', quantity: 'text-red-300' },
    { name: 'bg-orange-800', quantity: 'text-orange-300' },
    { name: 'bg-pink-800', quantity: 'text-pink-300' },
  ];

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  } satisfies Variants;

  const itemVariants: Variants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", bounce: 0.5, duration: 0.4 }
    },
  } satisfies Variants;

  return (
    <>
      <Subheading>Ingredients</Subheading>
      <motion.ul variants={listVariants} initial="hidden" whileInView="visible" className="space-y-2 select-none">
        {ingredients.map((ingredient, index) => {
          const inputRef = useRef<HTMLInputElement>(null);
          const scheme = colorSchemes[index % colorSchemes.length];
          return (
            <motion.li key={index} onClick={() => inputRef.current && (inputRef.current.checked = !inputRef.current.checked)} variants={itemVariants} className="flex items-center bg-gray-900/60 rounded-lg p-1 w-fit cursor-pointer opacity-60 has-checked:opacity-100 transition-opacity duration-200" whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.1 }}>
              <div className={`relative rounded text-sm text-white h-4 w-4 ml-1 mr-2 flex items-center justify-center`}>
                <input ref={inputRef} type="checkbox" className={`w-full h-full pointer-events-none`} />
              </div>
              <span className={`${scheme.name} px-3 py-1 rounded text-white h-8 flex items-center`}>{ingredient.name}</span>
              <span className={`${scheme.quantity} px-2 py-1 rounded h-8 flex items-center`}>{ingredient.quantity}</span>
            </motion.li>
          );
        })}
      </motion.ul>
    </>
  );
}
