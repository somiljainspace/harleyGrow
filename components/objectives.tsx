"use client";

import React from 'react';
import { motion } from 'framer-motion';

const objectives = [
  {
    id: 1,
    title: 'Objective 01',
    description: 'Solve major agricultural issues like low crop yields, water wastage, labor inefficiency, and reliance on chemical pesticides and fertilizers.'
  },
  {
    id: 2,
    title: 'Objective 02',
    description: 'Pioneering Agri-tech startup integrating hydroponics with IoT for automation.'
  },
  {
    id: 3,
    title: 'Objective 03',
    description: 'Creating a fully automated, soil-less farming system for sustainable food production.'
  }
];

const Objectives = () => {
  return (
    <section className="objectives-section bg-gradient-to-b from-green-100 to-green-300 p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-green-800 text-center mb-6">Our Objectives</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {objectives.map((obj) => (
          <motion.div
            key={obj.id}
            className="objective-card bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: obj.id * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-green-700 mb-2">{obj.title}</h3>
            <p className="text-green-600 text-sm">{obj.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Objectives;
