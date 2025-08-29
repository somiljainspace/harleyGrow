import React from 'react';

const AIPredictions = () => {
  // Replace with actual AI prediction fetching logic
  const predictions = [
    'Increase water supply to maintain optimal growth.',
    'Adjust pH level to 6.0 for better nutrient absorption.',
    'Reduce humidity to prevent mold growth.',
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">AI Suggestions</h2>
      <ul className="mt-4">
        {predictions.map((prediction, index) => (
          <li key={index} className="mb-2">
            {prediction}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIPredictions;