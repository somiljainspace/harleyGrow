"use client";

import React, { useEffect, useState } from "react";

type SuggestionsResponse = {
  suggestions: string[];
  generatedAt?: string;
  source?: string;
};

const AIPredictions = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSuggestions = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/ai-suggestions");
        if (!res.ok) {
          throw new Error("Failed to load AI suggestions");
        }
        const data: SuggestionsResponse = await res.json();
        setSuggestions(data.suggestions || []);
      } catch {
        setError("Unable to load AI suggestions right now.");
      } finally {
        setLoading(false);
      }
    };

    loadSuggestions();
    const interval = setInterval(loadSuggestions, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-2">AI Crop Recommendations</h2>
      <p className="text-sm text-gray-500 mb-6">
        Generated from live sensor readings stored in your database.
      </p>

      {loading && <p className="text-gray-600">Analyzing sensor data...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <ul className="space-y-3">
          {suggestions.map((prediction, index) => (
            <li
              key={index}
              className="flex items-start p-4 bg-green-50 rounded-lg border border-green-100"
            >
              <span className="mr-3 text-green-600 font-bold">→</span>
              <span className="text-gray-800">{prediction}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AIPredictions;
