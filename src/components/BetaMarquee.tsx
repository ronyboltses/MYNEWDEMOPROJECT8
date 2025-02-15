import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function BetaMarquee() {
  return (
    <div className="fixed top-16 left-0 right-0 bg-yellow-400/80 backdrop-blur-sm overflow-hidden z-50 py-1">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex items-center whitespace-nowrap"
      >
        <div className="flex items-center space-x-4 px-4">
          <AlertTriangle className="w-4 h-4 text-yellow-900" />
          <span className="text-yellow-900 font-medium">
            Beta Version: We're actively improving our construction calculator. Your feedback helps us enhance the experience!
          </span>
          <AlertTriangle className="w-4 h-4 text-yellow-900" />
          <span className="text-yellow-900 font-medium">
            New features coming soon: Material cost tracking, Project timeline visualization, and more!
          </span>
          <AlertTriangle className="w-4 h-4 text-yellow-900" />
          <span className="text-yellow-900 font-medium">
            Join our beta testing program to help shape the future of construction estimation.
          </span>
        </div>
      </motion.div>
    </div>
  );
}