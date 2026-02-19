export interface Ingredient {
  id: string;
  name: string;
  proteinPer100g: number;
}

export interface RecipeIngredient {
  ingredientId: string;
  grams: number;
}

export interface RecipeIngredientDetail {
  ingredientId: string;
  ingredientName: string;
  grams: number;
  proteinGrams: number;
}

export interface Recipe {
  id: string;
  name: string;
  url?: string;
  ingredients: RecipeIngredientDetail[];
  totalProteinGrams: number;
}
