"use client";

import React, { useState } from 'react';

interface PredictionResult {
  disease: string;
  confidence: number;
  suggestions: string[];
  success: boolean;
}

export default function PlantDiseaseDetector() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
      setResult(null);
      setError('');
    }
  };

  const isValidPlant = (imgSrc: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(true);
          return;
        }
        ctx.drawImage(img, 0, 0, 100, 100);
        const imageData = ctx.getImageData(0, 0, 100, 100);
        let greenPixels = 0;
        const totalPixels = imageData.data.length / 4;
        for (let i = 1; i < imageData.data.length; i += 4) {
          const r = imageData.data[i - 1];
          const g = imageData.data[i];
          const b = imageData.data[i + 1];
          if (g > Math.max(r, b) + 40 && g > 80) greenPixels++;
        }
        const greenRatio = greenPixels / totalPixels;
        resolve(greenRatio > 0.1); // 10% green pixels
      };
      img.onerror = () => resolve(false);
      img.src = imgSrc;
    });
  };

  const handlePredict = async () => {
    if (!selectedFile || !preview) return;

    setLoading(true);
    setError('');

    try {
      // Client-side plant validation
      const isPlant = await isValidPlant(preview);
      if (!isPlant) {
        setError('❌ Not a plant image detected (insufficient green content). Please upload a clear leaf/plant photo.');
        setLoading(false);
        return;
      }

      const base64 = await blobToBase64(selectedFile);
      const response = await fetch('/api/plant-disease', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Prediction failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };


  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">🌿 Plant Disease Detector</h2>
      
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 mb-4"
        />
        {preview && (
          <img src={preview} alt="Preview" className="max-w-full h-64 object-contain mx-auto rounded-lg shadow-md" />
        )}
      </div>

      <button
        onClick={handlePredict}
        disabled={!selectedFile || loading}
        className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? 'Analyzing...' : '🔍 Detect Disease'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border-2 border-green-200">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">
              {result.disease === 'Healthy' ? '✅' : '⚠️'}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{result.disease}</h3>
            <p className="text-lg text-green-600 mt-1">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-3 text-gray-700">📋 Recommendations:</h4>
            <ul className="space-y-2">
              {result.suggestions.map((suggestion, idx) => (
                <li key={idx} className="flex items-start p-3 bg-white rounded-lg shadow-sm border">
                  <span className="mr-3 text-green-500 font-bold">→</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

