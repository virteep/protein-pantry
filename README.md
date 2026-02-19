# Protein Pantry

A simple local-only web application for tracking protein intake with vegetarian ingredients and pre-made recipes.

## Features

- 📊 **Protein Calculator**: Enter your daily protein goal and see how much of each ingredient you need
- 🥗 **Ingredient Database**: View protein content per 100g for various vegetarian ingredients
- 📖 **Recipes**: Pre-configured recipes with total protein calculations
- 💾 **Local Storage**: Your daily goal is saved in your browser
- 🚀 **Fully Local**: No cloud, no auth, no database required

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Python FastAPI
- **Data Storage**: JSON files (editable)

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn

## Installation

### 1. Clone or navigate to the project directory

```bash
cd ProteinApp
```

### 2. Set up the Backend

```bash
cd backend

# Create a virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Set up the Frontend

```bash
cd ../frontend

# Install dependencies
npm install
```

## Running the Application

You need to run both the backend and frontend servers.

### Terminal 1: Start the Backend

```bash
cd backend
source venv/bin/activate  # If you created a virtual environment
python main.py
```

The backend will start on `http://127.0.0.1:8000`

You can verify it's running by visiting `http://127.0.0.1:8000/api/health`

### Terminal 2: Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
ProteinApp/
├── backend/
│   ├── data/
│   │   ├── ingredients.json    # Ingredient database
│   │   └── recipes.json         # Recipe definitions
│   ├── main.py                  # FastAPI server
│   ├── models.py                # Pydantic models
│   └── requirements.txt         # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── ProteinGoalInput.tsx
│   │   │   ├── IngredientTable.tsx
│   │   │   └── RecipeList.tsx
│   │   ├── pages/               # Page components
│   │   │   ├── Home.tsx
│   │   │   └── Recipes.tsx
│   │   ├── types.ts             # TypeScript types
│   │   ├── api.ts               # API client
│   │   ├── App.tsx              # Main app component
│   │   ├── App.css              # Styles
│   │   └── main.tsx             # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## Editing Data

### Adding/Modifying Ingredients

Edit `backend/data/ingredients.json`:

```json
{
  "id": "ingredient-id",
  "name": "Display Name",
  "proteinPer100g": 10.5
}
```

### Adding/Modifying Recipes

Edit `backend/data/recipes.json`:

```json
{
  "id": "recipe-id",
  "name": "Recipe Name",
  "ingredients": [
    {
      "ingredientId": "paneer",
      "grams": 200
    }
  ]
}
```

After editing the JSON files, the changes will be reflected immediately when you refresh the page (no restart needed).

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/ingredients` - Get all ingredients with protein data
- `GET /api/recipes` - Get all recipes with computed protein totals

## Ingredients Included

The app comes pre-loaded with the following vegetarian ingredients:

- Paneer (21.0g/100g)
- Cooked Chickpeas (8.86g/100g)
- Cooked Rajma (8.67g/100g)
- Cooked Kala Chana (8.9g/100g)
- Cooked Moong (7.0g/100g)
- Cooked Moong Dal (7.0g/100g)
- Cooked Toor Dal (6.76g/100g)
- Cooked Masoor Dal (9.1g/100g)
- Firm Tofu (17.3g/100g)
- Silken Tofu (7.2g/100g)
- Cottage Cheese (10.6g/100g)
- Siggi's Vanilla Skyr (10.67g/100g)
- Fairlife Milk 2% (5.42g/100g)

## Sample Recipes

- Paneer Tikka
- Mixed Dal Bowl
- Chickpea Curry
- Tofu Scramble
- Protein Smoothie
- Rajma Masala Bowl

## Features in Detail

### Calculator Page

1. Set your daily protein goal (e.g., 100g)
2. View all ingredients sorted by protein content (default) or name
3. Search ingredients by name
4. See protein per 100g
5. Calculate how many grams of each ingredient you need to reach your goal

### Recipes Page

1. Browse pre-made recipes
2. See total protein per recipe
3. View ingredient breakdown with protein contribution
4. Easy-to-read card layout

## Building for Production

To build the frontend for production:

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`.

## Troubleshooting

### Backend not connecting

- Make sure the backend is running on port 8000
- Check for any Python errors in the terminal
- Verify the data files exist in `backend/data/`

### Frontend errors

- Make sure you ran `npm install`
- Clear browser cache and reload
- Check browser console for errors

### Port already in use

If port 8000 or 5173 is already in use, you can change them:

- Backend: Edit `main.py` and change the port in `uvicorn.run()`
- Frontend: Edit `vite.config.ts` and change the `server.port` value

## License

This project is open source and available for personal use.

## Contributing

Feel free to edit the data files or code to customize for your needs!
