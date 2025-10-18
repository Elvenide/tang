
import { Recipe } from '@/lib/schema';
import RecipeContainer from './components/RecipeContainer';
import Section from '@/components/Section';

export default async function Page({ params }: { params: Promise<{ user_id: string; recipe_id: string }> }) {
  const { user_id, recipe_id } = await params;

  const exampleRecipe: Recipe = {
    id: '1',
    user_id: user_id,
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

  return (
    <>
      <Section className="bg-amber-950">
        <RecipeContainer recipe={exampleRecipe} />
      </Section>
    </>
  );
}
