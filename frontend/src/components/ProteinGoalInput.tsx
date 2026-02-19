import { useState, useEffect } from 'react';

interface ProteinGoalInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function ProteinGoalInput({ value, onChange }: ProteinGoalInputProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const numValue = parseFloat(newValue);
    if (!isNaN(numValue) && numValue > 0) {
      onChange(numValue);
    }
  };

  return (
    <div className="input-group">
      <label htmlFor="protein-goal" className="input-label">
        Daily Protein Goal (grams)
      </label>
      <input
        id="protein-goal"
        type="number"
        min="1"
        step="1"
        value={inputValue}
        onChange={handleChange}
        className="input-field"
        placeholder="e.g., 100"
      />
    </div>
  );
}
