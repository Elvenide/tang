
import { Recipe } from '@/lib/schema';
import RecipeContainer from './components/RecipeContainer';
import type { Metadata } from "next";

const exampleRecipe: Recipe = {
    id: '1',
    user_id: '1',
    public: true,
    title: 'Chocolate Chip Cookies',
    ingredients: [
      { name: 'Flour', quantity: '2 cups' },
      { name: 'Sugar', quantity: '1 cup' },
      { name: 'Butter', quantity: '1 cup' },
      { name: 'Chocolate Chips', quantity: '1 bag' },
    ],
    steps: [
      'Preheat oven to 350°F.',
      'Mix flour and sugar.',
      'Add melted butter.',
      'Fold in chocolate chips.',
      'Bake for 10-12 minutes.',
    ],
  };

export async function generateMetadata({ params }: { params: Promise<{ user_id: string; recipe_id: string }> }): Promise<Metadata> {
    const { user_id, recipe_id } = await params;
    const user_name = "Elvenide";
    return {
        title: `${exampleRecipe.title} by ${user_name} | Tang`,
        description: `${exampleRecipe.title} recipe added by ${user_name} to the Tang recipe collection.`,
    };
}

export default async function Page({ params }: { params: Promise<{ user_id: string; recipe_id: string }> }) {
  const { user_id, recipe_id } = await params;
  return (
    <RecipeContainer recipe={exampleRecipe} />
  );
}
