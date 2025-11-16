'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import type { Category } from '@/lib/types';

interface RecipeFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categories: { value: Category; label: string }[] = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'drinks', label: 'Drinks' },
  { value: 'snacks', label: 'Snacks' },
];

export default function RecipeFilters({
  selectedCategories,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: RecipeFiltersProps) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    onCategoryChange([]);
    onSearchChange('');
  };

  const hasFilters = selectedCategories.length > 0 || searchQuery.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-sage-200 rounded-lg focus:outline-none focus:border-olive-500 focus:ring-2 focus:ring-olive-500/20 transition-all"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-forest-900 uppercase tracking-wide">
            Filter by Category
          </h3>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-olive-500 hover:text-olive-600 font-medium transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.value);
            return (
              <motion.button
                key={category.value}
                onClick={() => toggleCategory(category.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  isSelected
                    ? 'bg-olive-500 text-white shadow-md'
                    : 'bg-sage-100 text-forest-800 hover:bg-sage-200'
                }`}
              >
                {category.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
