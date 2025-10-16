
export interface User {
  username: string;
  password_hash: string;
  id: string;
  recipes_created_today: number;
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Recipe {
  id: string;
  user_id: string;
  public: boolean;
  title: string;
  image?: string;
  ingredients: Ingredient[];
  steps: string[];
}
