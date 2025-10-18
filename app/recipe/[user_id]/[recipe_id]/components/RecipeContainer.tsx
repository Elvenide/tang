import { Recipe } from '@/lib/schema';
import RecipeIngredients from './RecipeIngredients';
import RecipeSteps from './RecipeSteps';
import Heading from '@/components/Heading';

export default function RecipeContainer({ recipe }: { recipe: Recipe }) {
  return (
    <>
      <Heading>{recipe.title}</Heading>
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      <RecipeIngredients ingredients={recipe.ingredients} />
      <RecipeSteps steps={recipe.steps} />
    </>
  );
}
