from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path
from typing import List
from models import Ingredient, Recipe, RecipeWithDetails, RecipeIngredientDetail

app = FastAPI(title="Protein Pantry API")

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data file paths
DATA_DIR = Path(__file__).parent / "data"
INGREDIENTS_FILE = DATA_DIR / "ingredients.json"
RECIPES_FILE = DATA_DIR / "recipes.json"


def load_json_file(file_path: Path):
    """Load and parse a JSON file."""
    try:
        with open(file_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail=f"Data file not found: {file_path}")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail=f"Invalid JSON in file: {file_path}")


@app.get("/")
def root():
    return {"message": "Protein Pantry API", "status": "running"}


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/ingredients", response_model=List[Ingredient])
def get_ingredients():
    """Get all ingredients with protein per 100g."""
    data = load_json_file(INGREDIENTS_FILE)
    return [Ingredient(**item) for item in data]


@app.get("/api/recipes", response_model=List[RecipeWithDetails], response_model_exclude_none=False)
def get_recipes():
    """Get all recipes with computed protein totals."""
    # Load data
    ingredients_data = load_json_file(INGREDIENTS_FILE)
    recipes_data = load_json_file(RECIPES_FILE)
    
    # Create ingredient lookup
    ingredients_map = {item["id"]: Ingredient(**item) for item in ingredients_data}
    
    # Process recipes
    recipes_with_details = []
    for recipe_data in recipes_data:
        recipe = Recipe(**recipe_data)
        
        # Compute details for each ingredient
        ingredient_details = []
        total_protein = 0.0
        
        for recipe_ingredient in recipe.ingredients:
            ingredient = ingredients_map.get(recipe_ingredient.ingredientId)
            if not ingredient:
                raise HTTPException(
                    status_code=500,
                    detail=f"Ingredient {recipe_ingredient.ingredientId} not found in recipe {recipe.id}"
                )
            
            # Calculate protein: (grams / 100) * proteinPer100g
            protein_grams = (recipe_ingredient.grams / 100.0) * ingredient.proteinPer100g
            total_protein += protein_grams
            
            ingredient_details.append(
                RecipeIngredientDetail(
                    ingredientId=ingredient.id,
                    ingredientName=ingredient.name,
                    grams=recipe_ingredient.grams,
                    proteinGrams=round(protein_grams, 2)
                )
            )
        
        recipes_with_details.append(
            RecipeWithDetails(
                id=recipe.id,
                name=recipe.name,
                url=recipe.url,
                ingredients=ingredient_details,
                totalProteinGrams=round(total_protein, 2)
            )
        )
    
    return recipes_with_details


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
