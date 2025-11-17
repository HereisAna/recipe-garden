'use client';

import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChefHat, Leaf, ShoppingBasket } from 'lucide-react';
import type { Recipe } from '@/lib/types';

const difficultyInfo = {
  easy: { color: 'bg-green-100 text-green-800', icon: '👌' },
  medium: { color: 'bg-yellow-100 text-yellow-800', icon: '👨‍🍳' },
  hard: { color: 'bg-red-100 text-accent-600', icon: '🔥' },
};

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`/api/recipes/${id}`);
      if (!response.ok) {
        setError(true);
        return;
      }
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-olive-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-forest-900 mb-4">Recipe Not Found</h1>
          <p className="text-gray-600 mb-8">The recipe you're looking for doesn't exist.</p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const diffInfo = difficultyInfo[recipe.difficulty];

  return (
    <main className="min-h-screen bg-cream-100">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] bg-forest-900">
        <Image
          src={recipe.image_url}
          alt={recipe.title}
          fill
          className="object-cover opacity-80"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/50 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {recipe.title}
            </motion.h1>
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${diffInfo.color}`}>
                {diffInfo.icon} {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
              </span>
              {recipe.categories.map((category) => (
                <span
                  key={category}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-sage-200 text-forest-900"
                >
                  {category}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Description */}
          <motion.div
            className="bg-white rounded-xl p-8 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <ChefHat className="w-6 h-6 text-olive-500" />
              <h2 className="text-2xl font-bold text-forest-900">About This Dish</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{recipe.description}</p>
          </motion.div>

          {/* Ingredients */}
          <motion.div
            className="bg-white rounded-xl p-8 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBasket className="w-6 h-6 text-olive-500" />
              <h2 className="text-2xl font-bold text-forest-900">Ingredients</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3 bg-sage-50 p-3 rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 bg-olive-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    ✓
                  </span>
                  <div className="flex-1">
                    <span className="font-medium text-forest-900">{ingredient.name}</span>
                    <span className="text-gray-600"> — {ingredient.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Steps */}
          <motion.div
            className="bg-white rounded-xl p-8 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-6 h-6 text-olive-500" />
              <h2 className="text-2xl font-bold text-forest-900">Instructions</h2>
            </div>
            <ol className="space-y-6">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-olive-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Notes */}
          {recipe.notes && (
            <motion.div
              className="bg-sage-50 border-2 border-sage-200 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <h3 className="font-semibold text-forest-900 mb-2">📝 Notes</h3>
              <p className="text-gray-700">{recipe.notes}</p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
