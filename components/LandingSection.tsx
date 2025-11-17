'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Leaf, Sprout } from 'lucide-react';

export default function LandingSection() {
  const scrollToRecipes = () => {
    const recipesSection = document.getElementById('recipes-section');
    if (recipesSection) {
      recipesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cream-50">
      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-forest-900 mb-8 leading-tight">
          hey, come on in!
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
          This is where Lynda, Ayano, and Anastasiia keep our recipes. Nothing fancy, just stuff we actually make and want to remember how to cook.
        </p>

        <p className="text-lg text-gray-600 mb-12">
          (basically our kitchen notes in website form)
        </p>

        <button
          onClick={scrollToRecipes}
          className="bg-olive-500 hover:bg-olive-600 text-white font-medium px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          see what's cooking
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Simple scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-olive-500 opacity-50">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}
