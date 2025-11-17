'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, X, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { compressImage } from '@/lib/image-utils';
import type { RecipeInsert, Category, Difficulty } from '@/lib/types';
import Image from 'next/image';

const categories: Category[] = ['breakfast', 'lunch', 'dinner', 'drinks', 'snacks'];
const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

export default function AddRecipe() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    difficulty: 'easy' as Difficulty,
    categories: [] as string[],
    description: '',
    ingredients: [{ name: '', quantity: '' }],
    steps: [''],
    notes: '',
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      if (!data.authenticated) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      router.push('/admin');
    } finally {
      setChecking(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const toggleCategory = (category: string) => {
    if (formData.categories.includes(category)) {
      setFormData({
        ...formData,
        categories: formData.categories.filter((c) => c !== category),
      });
    } else {
      setFormData({
        ...formData,
        categories: [...formData.categories, category],
      });
    }
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, ''],
    });
  };

  const removeStep = (index: number) => {
    setFormData({
      ...formData,
      steps: formData.steps.filter((_, i) => i !== index),
    });
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData({
      ...formData,
      steps: newSteps,
    });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: '' }],
    });
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const updateIngredient = (index: number, field: 'name' | 'quantity', value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Please upload an image');
      return;
    }

    if (formData.categories.length === 0) {
      alert('Please select at least one category');
      return;
    }

    const validIngredients = formData.ingredients.filter(
      (ing) => ing.name.trim() !== '' && ing.quantity.trim() !== ''
    );
    if (validIngredients.length === 0) {
      alert('Please add at least one ingredient with name and quantity');
      return;
    }

    const validSteps = formData.steps.filter((step) => step.trim() !== '');
    if (validSteps.length === 0) {
      alert('Please add at least one step');
      return;
    }

    setLoading(true);

    try {
      // Upload image
      setUploadingImage(true);
      const compressed = await compressImage(imageFile);
      const imageFormData = new FormData();
      imageFormData.append('file', compressed);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: imageFormData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        console.error('Upload failed:', errorData);
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const { url } = await uploadResponse.json();
      setUploadingImage(false);

      // Create recipe
      const recipeData: RecipeInsert = {
        title: formData.title,
        difficulty: formData.difficulty,
        categories: formData.categories,
        description: formData.description,
        ingredients: validIngredients,
        steps: validSteps,
        notes: formData.notes || null,
        image_url: url,
      };

      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        alert('Failed to create recipe');
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('Failed to create recipe');
    } finally {
      setLoading(false);
      setUploadingImage(false);
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
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/admin/dashboard"
            className="p-2 hover:bg-sage-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-forest-900">Add New Recipe</h1>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-forest-900 mb-2">
              Recipe Name *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="e.g., Avocado Toast with Poached Egg"
              required
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-semibold text-forest-900 mb-2">
              Difficulty *
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({ ...formData, difficulty: e.target.value as Difficulty })
              }
              className="input-field"
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-semibold text-forest-900 mb-3">
              Categories * (Select at least one)
            </label>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const isSelected = formData.categories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                      isSelected
                        ? 'bg-olive-500 text-white'
                        : 'bg-sage-100 text-forest-800 hover:bg-sage-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-forest-900 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field min-h-[100px]"
              placeholder="A brief description of this dish..."
              required
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-semibold text-forest-900 mb-3">
              Ingredients * (Name and Quantity)
            </label>
            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                    className="input-field flex-1"
                    placeholder="Ingredient name (e.g., Flour)"
                  />
                  <input
                    type="text"
                    value={ingredient.quantity}
                    onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                    className="input-field flex-1"
                    placeholder="Quantity (e.g., 2 cups)"
                  />
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="flex-shrink-0 p-2 text-accent-500 hover:bg-accent-50 rounded-lg h-fit"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="inline-flex items-center gap-1 text-sm text-olive-500 hover:text-olive-600 font-medium mt-2"
              >
                <Plus className="w-4 h-4" />
                Add Ingredient
              </button>
            </div>
          </div>

          {/* Steps */}
          <div>
            <label className="block text-sm font-semibold text-forest-900 mb-3">
              Instructions * (Step by step)
            </label>
            <div className="space-y-3">
              {formData.steps.map((step, index) => (
                <div key={index} className="flex gap-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-olive-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    {index + 1}
                  </span>
                  <textarea
                    value={step}
                    onChange={(e) => updateStep(index, e.target.value)}
                    className="input-field flex-1 min-h-[80px]"
                    placeholder={`Step ${index + 1}...`}
                  />
                  {formData.steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="flex-shrink-0 p-2 text-accent-500 hover:bg-accent-50 rounded-lg h-fit mt-1"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addStep}
                className="inline-flex items-center gap-1 text-sm text-olive-500 hover:text-olive-600 font-medium mt-2"
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-forest-900 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="input-field min-h-[80px]"
              placeholder="Any tips, substitutions, or extra information..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-forest-900 mb-3">
              Recipe Image *
            </label>
            {!imagePreview ? (
              <label className="block border-2 border-dashed border-sage-300 rounded-xl p-12 text-center cursor-pointer hover:border-olive-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG, WebP up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative">
                <div className="relative w-full h-64 rounded-xl overflow-hidden">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-accent-500 text-white rounded-full hover:bg-accent-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-6 border-t border-sage-200">
            <Link href="/admin/dashboard" className="btn-secondary flex-1 text-center">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingImage ? 'Uploading image...' : loading ? 'Creating...' : 'Create Recipe'}
            </button>
          </div>
        </motion.form>
      </main>
    </div>
  );
}
