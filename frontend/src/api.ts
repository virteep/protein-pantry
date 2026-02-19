import { Ingredient, Recipe } from './types';

const API_BASE = '/api';

export async function fetchIngredients(): Promise<Ingredient[]> {
  const response = await fetch(`${API_BASE}/ingredients`);
  if (!response.ok) {
    throw new Error('Failed to fetch ingredients');
  }
  return response.json();
}

export async function fetchRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE}/recipes`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
}
