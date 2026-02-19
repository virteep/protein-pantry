import { useState, useEffect } from 'react';
import { IngredientTable } from '../components/IngredientTable';
import { fetchIngredients } from '../api';
import { Ingredient } from '../types';

export function Home() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchIngredients();
      setIngredients(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load ingredients'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Ingredients</h1>
      </div>

      {error && (
        <div className="error">
          <div className="error-title">Error</div>
          <div>{error}</div>
          <button
            onClick={loadIngredients}
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      )}

      {loading && <div className="loading">Loading ingredients...</div>}

      {!loading && !error && (
        <IngredientTable ingredients={ingredients} dailyGoal={0} />
      )}
    </div>
  );
}
