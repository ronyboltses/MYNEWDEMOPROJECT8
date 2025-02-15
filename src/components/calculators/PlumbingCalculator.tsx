import React, { useState } from 'react';
import { Droplets } from 'lucide-react';

interface PlumbingFixture {
  name: string;
  waterSupplyUnits: number;
  drainageFixtureUnits: number;
}

const fixtures: PlumbingFixture[] = [
  { name: 'Bathroom Group (Full)', waterSupplyUnits: 6.0, drainageFixtureUnits: 6.0 },
  { name: 'Bathtub', waterSupplyUnits: 4.0, drainageFixtureUnits: 2.0 },
  { name: 'Shower', waterSupplyUnits: 2.0, drainageFixtureUnits: 2.0 },
  { name: 'Kitchen Sink', waterSupplyUnits: 1.5, drainageFixtureUnits: 2.0 },
  { name: 'Lavatory (Bathroom Sink)', waterSupplyUnits: 1.0, drainageFixtureUnits: 1.0 },
  { name: 'Toilet (Flush Tank)', waterSupplyUnits: 2.5, drainageFixtureUnits: 3.0 },
  { name: 'Washing Machine', waterSupplyUnits: 4.0, drainageFixtureUnits: 2.0 },
  { name: 'Dishwasher', waterSupplyUnits: 1.5, drainageFixtureUnits: 2.0 }
];

interface SelectedFixture extends PlumbingFixture {
  quantity: number;
}

export default function PlumbingCalculator() {
  const [selectedFixtures, setSelectedFixtures] = useState<SelectedFixture[]>([]);
  const [result, setResult] = useState<{
    totalWaterSupplyUnits: number;
    totalDrainageUnits: number;
    recommendedPipeSize: string;
    estimatedCost: number;
  } | null>(null);

  const addFixture = (fixture: PlumbingFixture) => {
    setSelectedFixtures(prev => {
      const existing = prev.find(f => f.name === fixture.name);
      if (existing) {
        return prev.map(f => 
          f.name === fixture.name 
            ? { ...f, quantity: f.quantity + 1 }
            : f
        );
      }
      return [...prev, { ...fixture, quantity: 1 }];
    });
  };

  const updateQuantity = (name: string, quantity: number) => {
    if (quantity < 0) return;
    setSelectedFixtures(prev =>
      prev.map(f => 
        f.name === name 
          ? { ...f, quantity }
          : f
      ).filter(f => f.quantity > 0)
    );
  };

  const calculatePlumbing = () => {
    const totalWaterSupplyUnits = selectedFixtures.reduce(
      (sum, fixture) => sum + fixture.waterSupplyUnits * fixture.quantity,
      0
    );

    const totalDrainageUnits = selectedFixtures.reduce(
      (sum, fixture) => sum + fixture.drainageFixtureUnits * fixture.quantity,
      0
    );

    // Simplified pipe size recommendation
    let recommendedPipeSize = '1/2 inch';
    if (totalWaterSupplyUnits > 20) recommendedPipeSize = '3/4 inch';
    if (totalWaterSupplyUnits > 40) recommendedPipeSize = '1 inch';
    if (totalWaterSupplyUnits > 100) recommendedPipeSize = '1 1/4 inch';

    // Rough cost estimation (simplified)
    const baseCostPerUnit = 1000; // PKR
    const estimatedCost = totalWaterSupplyUnits * baseCostPerUnit;

    setResult({
      totalWaterSupplyUnits,
      totalDrainageUnits,
      recommendedPipeSize,
      estimatedCost
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Droplets className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Plumbing Calculator</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Add Fixtures</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {fixtures.map((fixture) => (
                <button
                  key={fixture.name}
                  onClick={() => addFixture(fixture)}
                  className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm text-center"
                >
                  {fixture.name}
                </button>
              ))}
            </div>
          </div>

          {selectedFixtures.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Selected Fixtures</h3>
              <div className="space-y-3">
                {selectedFixtures.map((fixture) => (
                  <div
                    key={fixture.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{fixture.name}</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(fixture.name, fixture.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{fixture.quantity}</span>
                      <button
                        onClick={() => updateQuantity(fixture.name, fixture.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={calculatePlumbing}
            disabled={selectedFixtures.length === 0}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            Calculate Requirements
          </button>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg text-gray-800">Results:</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Water Supply Units:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {result.totalWaterSupplyUnits.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Drainage Fixture Units:</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {result.totalDrainageUnits.toFixed(1)}
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Recommendations:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Main Water Supply Pipe Size: {result.recommendedPipeSize}</li>
                  <li>• Estimated Basic Plumbing Cost: PKR {result.estimatedCost.toLocaleString()}</li>
                  <li>• Recommended to include 10-15% buffer for fittings and accessories</li>
                  <li>• Consider adding water pressure booster if building height exceeds 2 floors</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}