import React, { useState } from 'react';
import { Scale } from 'lucide-react';

interface Material {
  name: string;
  density: number; // kg/m³
}

const materials: Material[] = [
  { name: 'Concrete', density: 2400 },
  { name: 'Steel', density: 7850 },
  { name: 'Brick', density: 1800 },
  { name: 'Wood', density: 700 },
  { name: 'Glass', density: 2500 },
  { name: 'Aluminum', density: 2700 },
  { name: 'Sand', density: 1600 },
  { name: 'Gravel', density: 1680 },
  { name: 'Cement', density: 1440 },
  { name: 'Marble', density: 2700 }
];

export default function MaterialWeightCalculator() {
  const [material, setMaterial] = useState<string>(materials[0].name);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{
    volume: number;
    weight: number;
  } | null>(null);

  const calculateWeight = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);

    if (l && w && h) {
      const volume = l * w * h;
      const selectedMaterial = materials.find(m => m.name === material);
      if (selectedMaterial) {
        const weight = volume * selectedMaterial.density;
        setResult({
          volume: volume,
          weight: weight
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Scale className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Material Weight Calculator</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Material Type
            </label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {materials.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name} ({m.density} kg/m³)
                </option>
              ))}
            </select>
          </div>

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
                step="0.01"
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
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (m)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter height"
                step="0.01"
              />
            </div>
          </div>

          <button
            onClick={calculateWeight}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate Weight
          </button>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Results:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Volume:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {result.volume.toFixed(2)} m³
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Weight:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {result.weight.toFixed(2)} kg
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}