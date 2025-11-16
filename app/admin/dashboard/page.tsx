'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Edit, Trash2, LogOut, Home } from 'lucide-react';
import type { Recipe } from '@/lib/types';

export default function AdminDashboard() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      if (!data.authenticated) {
        router.push('/admin');
        return;
      }
      fetchRecipes();
    } catch (error) {
      console.error('Error checking auth:', error);
      router.push('/admin');
    } finally {
      setChecking(false);
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes?limit=100');
      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
      } else {
        alert('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-olive-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-forest-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="btn-secondary inline-flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <button onClick={handleLogout} className="btn-secondary inline-flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats & Add Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-forest-900 mb-2">Manage Recipes</h2>
            <p className="text-gray-600">
              {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} total
            </p>
          </div>
          <Link href="/admin/add" className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Recipe
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-olive-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Recipes Table */}
        {!loading && recipes.length > 0 && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sage-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-forest-900">
                      Recipe
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-forest-900">
                      Difficulty
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-forest-900">
                      Categories
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-forest-900">
                      Created
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-forest-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-200">
                  {recipes.map((recipe, index) => (
                    <motion.tr
                      key={recipe.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-sage-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={recipe.image_url}
                              alt={recipe.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-forest-900">{recipe.title}</p>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {recipe.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize text-sm text-gray-700">
                          {recipe.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {recipe.categories.slice(0, 2).map((cat) => (
                            <span
                              key={cat}
                              className="px-2 py-1 bg-sage-200 text-forest-800 rounded text-xs"
                            >
                              {cat}
                            </span>
                          ))}
                          {recipe.categories.length > 2 && (
                            <span className="px-2 py-1 text-xs text-gray-600">
                              +{recipe.categories.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(recipe.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/edit/${recipe.id}`}
                            className="p-2 text-olive-500 hover:bg-olive-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(recipe.id, recipe.title)}
                            className="p-2 text-accent-500 hover:bg-accent-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Recipes */}
        {!loading && recipes.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <p className="text-xl text-gray-600 mb-4">No recipes yet!</p>
            <Link href="/admin/add" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Your First Recipe
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
