import React from 'react';
import { useCalculatorStore } from '../store/calculatorStore';
import { useThemeStore } from '../store/themeStore';
import BasicCalculator from './BasicCalculator';
import AdvancedCalculator from './AdvancedCalculator';
import CalculationResults from './CalculationResults';
import ThreeDModel from './ThreeDModel';
import { motion, AnimatePresence } from 'framer-motion';

export default function Calculator() {
  const { mode, setMode } = useCalculatorStore();
  const { theme } = useThemeStore();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className={`min-h-screen py-8 backdrop-blur-sm ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50'
        : 'bg-gradient-to-br from-blue-50/50 via-white/50 to-indigo-50/50'
    }`}>
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex justify-center">
          <motion.div
            className={`${
              theme === 'dark' ? 'bg-gray-800/70' : 'bg-white/70'
            } backdrop-blur-md rounded-2xl shadow-lg p-2 inline-flex space-x-2`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                mode === 'basic'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : theme === 'dark'
                  ? 'bg-transparent text-gray-300 hover:bg-gray-700/50'
                  : 'bg-transparent text-gray-600 hover:bg-white/50'
              }`}
              onClick={() => setMode('basic')}
            >
              Basic Calculator
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                mode === 'advanced'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : theme === 'dark'
                  ? 'bg-transparent text-gray-300 hover:bg-gray-700/50'
                  : 'bg-transparent text-gray-600 hover:bg-white/50'
              }`}
              onClick={() => setMode('advanced')}
            >
              Advanced Calculator
            </motion.button>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-8"
          >
            {mode === 'advanced' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  className={`${
                    theme === 'dark' ? 'bg-gray-800/70' : 'bg-white/70'
                  } backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/20`}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <AdvancedCalculator />
                </motion.div>
                <motion.div
                  className={`${
                    theme === 'dark' ? 'bg-gray-800/70' : 'bg-white/70'
                  } backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/20 p-6`}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className={`text-2xl font-bold mb-6 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>3D House Preview</h3>
                  <ThreeDModel />
                </motion.div>
              </div>
            ) : (
              <motion.div
                className={`${
                  theme === 'dark' ? 'bg-gray-800/70' : 'bg-white/70'
                } backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/20`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <BasicCalculator />
              </motion.div>
            )}
            
            <motion.div
              className={`${
                theme === 'dark' ? 'bg-gray-800/70' : 'bg-white/70'
              } backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/20`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CalculationResults />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}