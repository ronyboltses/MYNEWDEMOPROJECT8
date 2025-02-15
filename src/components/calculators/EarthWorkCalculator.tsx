import React, { useState } from 'react';
import { Shovel } from 'lucide-react';

type SoilType = 'loose' | 'normal' | 'hard' | 'rock';

interface SoilFactor {
  name: string;
  swellFactor: number;
  shrinkageFactor: number;
  excavationRate: number; // cubic meters per day per worker
}

const soilFactors: Record<SoilType, SoilFactor> = {
  loose: {
    name: 'Loose Soil',
    swellFactor: 1.25,
    shrinkageFactor: 0.9,
    excavationRate: 5.0
  },
  normal: {
    name: 'Normal Soil',
    swellFactor: 1.3,
    shrinkageFactor: 0.85,
    excavationRate: 4.0
  },
  hard: {
    name: 'Hard Soil',
    swellFactor: 1.35,
    shrinkageFactor: 0.8,
    excavationRate: 3.0
  },
  rock: {
    name: 'Rocky Soil',
    swellFactor: 1.5,
    shrinkageFactor: 0.75,
    excavationRate: 1.5
  }
};

export default function EarthWorkCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [soilType, setSoilType] = useState<SoilType>('normal');
  const [result, setResult] = useState<{
    volume: number;
    looseMaterial: number;
    compactedVolume: number;
    laborDays: number;
    estimatedCost: number;
  } | null>(null);

  const calculateEarthwork = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);

    if (l && w && d) {
      const volume = l * w * d;
      const soil = soilFactors[soilType];
      
      const looseMaterial = volume * soil.swellFactor;
      const compactedVolume = volume * soil.shrinkageFactor;
      
      // Labor calculation
      const laborDays = Math.ceil(volume / soil.excavationRate);
      
      // Cost estimation (simplified)
      const laborCostPerDay = 1500; // PKR
      const equipmentCostPerCubicMeter = 200; // PKR
      const disposalCostPerCubicMeter = 150; // PKR
      
      const laborCost = laborDays * laborCostPerDay;
      const equipmentCost = volume * equipmentCostPerCubicMeter;
      const disposalCost = looseMaterial * disposalCostPerCubicMeter;
      
      const totalCost = laborCost + equipmentCost + disposalCost;

      setResult({
        volume,
        looseMaterial,
        compactedVolume,
        laborDays,
        estimatedCost: totalCost
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Shovel className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Earth Work Calculator</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Length (m)
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter length"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width (m)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter width"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Depth (m)
              </label>
              <input
                type="number"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter depth"
                step="0.1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Soil Type
            </label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value as SoilType)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(soilFactors).map(([key, soil]) => (
                <option key={key} value={key}>
                  {soil.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={calculateEarthwork}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate Earth Work
          </button>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Original Volume:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {result.volume.toFixed(2)} m³
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Loose Material Volume:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {result.looseMaterial.toFixed(2)} m³
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Compacted Volume:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {result.compactedVolume.toFixed(2)} m³
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Labor Days Required:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {result.laborDays} days
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Estimated Total Cost:</p>
                <p className="text-2xl font-bold text-gray-800">
                  PKR {result.estimatedCost.toLocaleString()}
                </p>
                <div className="mt-2 text-sm text-gray-600">
                  <p>Includes:</p>
                  <ul className="list-disc list-inside">
                    <li>Labor costs</li>
                    <li>Equipment rental</li>
                    <li>Material disposal</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Notes:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Consider weather conditions that may affect excavation time</li>
                  <li>• Ensure proper safety measures during excavation</li>
                  <li>• Verify local regulations for disposal of excavated material</li>
                  <li>• Additional costs may apply for special equipment or conditions</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}