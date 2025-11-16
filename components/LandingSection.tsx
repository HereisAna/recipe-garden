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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-cream-50 to-cream-100">
      {/* Decorative floating leaves */}
      <motion.div
        className="absolute top-20 left-10 opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Leaf className="w-24 h-24 text-olive-500" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-20 opacity-20"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Sprout className="w-32 h-32 text-sage-400" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4 opacity-10"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Leaf className="w-20 h-20 text-forest-800" />
      </motion.div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-forest-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to our apartment!
          </motion.h1>

          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-4 text-olive-500">
              <Leaf className="w-8 h-8" />
              <div className="h-1 w-16 bg-olive-500 rounded-full" />
              <Sprout className="w-8 h-8" />
            </div>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Lynda, Ayano, and Anastasiia live here — and this is our{' '}
            <span className="text-olive-600 font-semibold">shared recipe garden</span>,
            a growing collection of dishes we love, cook, and want to remember.
          </motion.p>

          <motion.p
            className="text-lg text-gray-600 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Scroll down to explore our favorite meals.
          </motion.p>

          <motion.button
            onClick={scrollToRecipes}
            className="btn-primary inline-flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Recipes
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-olive-500" />
      </motion.div>
    </section>
  );
}
