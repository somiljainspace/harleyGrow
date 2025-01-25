"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Solution = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="solution-container bg-white p-8 rounded-lg shadow-md">
      <motion.h2 
        className="solution-heading text-3xl font-bold text-center mb-8 text-gray-800"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        Goals Achieved
      </motion.h2>
      <motion.div 
        className="columns-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Column 1 */}
        <div className="column bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold text-green-600 mb-2">01</h3>
          <p className="column-title font-semibold text-lg text-gray-700 mb-1">Planted Different Crops</p>
          <p className="text-sm text-gray-600">Planted crops include lettuce, spinach, and radish.</p>
        </div>

        {/* Column 2 */}
        <div className="column bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold text-green-600 mb-2">02</h3>
          <p className="column-title font-semibold text-lg text-gray-700 mb-1">Light Automation</p>
          <p className="text-sm text-gray-600">Automated lighting system for optimal crop growth.</p>
        </div>

        {/* Column 3 */}
        <div className="column bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold text-green-600 mb-2">03</h3>
          <p className="column-title font-semibold text-lg text-gray-700 mb-1">Water Automation</p>
          <p className="text-sm text-gray-600">
            This automated system drastically reduces the need for labor. A single person can manage large-scale farms, reducing operational costs while maximizing efficiency.
          </p>
        </div>

        {/* Column 4 */}
        <div className="column bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold text-green-600 mb-2">04</h3>
          <p className="column-title font-semibold text-lg text-gray-700 mb-1">pH and Nutrients Tested</p>
          <p className="text-sm text-gray-600">
            pH sensors and EC sensors measure nutrient and pH levels. Temperature sensors maintain optimal growing conditions.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Solution;
