'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Recipe } from '@/lib/types';
import { Leaf } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

export default function RecipeCard({ recipe, index }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Link href={`/recipe/${recipe.id}`}>
        <div className="card group cursor-pointer relative">
          {/* Decorative leaf accent */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Leaf className="w-6 h-6 text-olive-500 rotate-12" />
          </div>

          {/* Image */}
          <div className="relative h-64 w-full overflow-hidden bg-sage-100">
            <Image
              src={recipe.image_url || '/placeholder-recipe.jpg'}
              alt={recipe.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-forest-900 group-hover:text-olive-500 transition-colors">
              {recipe.title}
            </h3>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {recipe.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {/* Difficulty tag */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  difficultyColors[recipe.difficulty]
                }`}
              >
                {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
              </span>

              {/* Category tags */}
              {recipe.categories.slice(0, 2).map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-sage-200 text-forest-800"
                >
                  {category}
                </span>
              ))}

              {recipe.categories.length > 2 && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-sage-100 text-forest-700">
                  +{recipe.categories.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
