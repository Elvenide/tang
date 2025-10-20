"use client";

import { Recipe } from '@/lib/schema';
import RecipeIngredients from './RecipeIngredients';
import RecipeSteps from './RecipeSteps';
import { motion } from 'motion/react';
import Heading from '@/components/Heading';
import Section from '@/components/Section';

export default function RecipeContainer({ recipe }: { recipe: Recipe }) {
  return (
    <>
      <Section className="h-[40vh] max-h-[200px] overflow-hidden lg:hidden" fadeIn={false}>
        <motion.img initial={{ filter: "blur(4px)" }} whileInView={{ filter: "blur(0px)" }} transition={{ duration: 1, delay: 0.1 }} className="min-w-full min-h-full aspect-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={`https://image.pollinations.ai/prompt/${encodeURIComponent(recipe.title + " ultra realistic 4k")}?referrer=sanjayb.dev&safe=true&private=true&nologo=true&seed=2753)`} alt={recipe.title} />
      </Section>
      <Section className="bg-amber-950 *:flex *:flex-row *:gap-10 *:items-center">
        <div className="grow">
          <Heading>{recipe.title}</Heading>
          <RecipeIngredients ingredients={recipe.ingredients} />
          <RecipeSteps steps={recipe.steps} />
        </div>
        <div className="w-1/2 hidden lg:block">
          <motion.img initial={{ filter: "blur(4px)" }} whileInView={{ filter: "blur(0px)" }} transition={{ duration: 1, delay: 0.1 }} className="object-contain" src={`https://image.pollinations.ai/prompt/${encodeURIComponent(recipe.title + " ultra realistic 4k")}?referrer=sanjayb.dev&safe=true&private=true&nologo=true&seed=2753)`} alt={recipe.title} />
        </div>
      </Section>
    </>
  );
}
