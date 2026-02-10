import { useState } from 'react';
import { Check } from 'lucide-react';

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}

export const MultiSelect = ({ label, options, selected, onChange, error }: MultiSelectProps) => {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => toggleOption(option)}
            className={`p-3 rounded-lg border-2 transition-all ${
              selected.includes(option)
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-300 hover:border-primary-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{option}</span>
              {selected.includes(option) && (
                <Check className="h-5 w-5 text-primary-600" />
              )}
            </div>
          </button>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
