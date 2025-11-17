'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import LandingSection from '@/components/LandingSection';
import RecipeCard from '@/components/RecipeCard';
import RecipeFilters from '@/components/RecipeFilters';
import Pagination from '@/components/Pagination';
import type { Recipe } from '@/lib/types';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategories, searchQuery, currentPage]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
      });

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      if (selectedCategories.length > 0) {
        params.append('categories', selectedCategories.join(','));
      }

      const response = await fetch(`/api/recipes?${params}`);
      const data = await response.json();

      setRecipes(data.recipes || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const recipesSection = document.getElementById('recipes-section');
    if (recipesSection) {
      recipesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      {/* Landing Section */}
      <LandingSection />

      {/* Recipes Section */}
      <section id="recipes-section" className="py-16 px-6 max-w-7xl mx-auto">
        {/* Header with Admin Link */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-2">
              The recipes
            </h2>
            <p className="text-gray-600">
              {total} {total === 1 ? 'recipe' : 'recipes'} so far
            </p>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-olive-500 hover:text-olive-600 transition-colors"
          >
            <Lock className="w-5 h-5" />
            <span className="font-medium">Admin</span>
          </Link>
        </div>

        {/* Filters */}
        <RecipeFilters
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-olive-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Recipes Grid */}
        {!loading && recipes.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {recipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && recipes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Nothing here yet!</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search.</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && recipes.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>

      {/* Footer */}
      <footer className="bg-forest-900 text-cream-100 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">
            Made by Lynda, Ayano & Anastasiia • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}
