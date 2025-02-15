import React, { useState, useCallback } from 'react';
import { useAdminStore } from '../store/adminStore';
import { 
  Calculator, Settings, FileText, Plus, Trash2, Upload, 
  PaintBucket, Container, LayoutGrid, Thermometer, Ruler, Scale, 
  Wrench, Shovel, DollarSign, Sliders, PenTool, Palette
} from 'lucide-react';
import ResourceUpload from './ResourceUpload';
import { motion, AnimatePresence } from 'framer-motion';

const tabVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
};

const panelVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

export default function AdminPanel() {
  const { settings, updateSettings, addResource, removeResource } = useAdminStore();
  const [activeTab, setActiveTab] = useState('calculators');
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    category: '',
    type: 'pdf' as const,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = useCallback((file: File) => {
    setSelectedFile(file);
  }, []);

  const handleAddResource = () => {
    if (newResource.title && selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      addResource({
        ...newResource,
        url,
      });
      setNewResource({
        title: '',
        description: '',
        category: '',
        type: 'pdf',
      });
      setSelectedFile(null);
    }
  };

  const tabs = [
    { id: 'calculators', label: 'Calculators', icon: Calculator },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'factors', label: 'Factors', icon: Sliders },
    { id: 'resources', label: 'Resources', icon: FileText },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex space-x-6">
          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="space-y-2">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === id
                        ? 'bg-[#1B8B6A] text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-xl shadow-lg p-6"
              >
                {activeTab === 'calculators' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <Calculator className="w-6 h-6 text-[#1B8B6A]" />
                      Calculator Settings
                    </h2>

                    <div className="space-y-8">
                      {/* Basic Calculator Settings */}
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Calculator</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Default Plot Size (sq. yards)
                            </label>
                            <input
                              type="number"
                              value={settings.assumptions.defaultPlotSize || 120}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  defaultPlotSize: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Built-up Area Factor
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={settings.assumptions.builtUpAreaFactor}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  builtUpAreaFactor: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Large Plot Factor
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={settings.assumptions.largePlotFactor}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  largePlotFactor: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Advanced Calculator Settings */}
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced Calculator</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Material Cost Factor
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={settings.assumptions.materialCostFactor}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  materialCostFactor: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Labor Cost Factor
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={settings.assumptions.laborCostFactor}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  laborCostFactor: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Escape Premium
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={settings.assumptions.fullEscapePremium}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  fullEscapePremium: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Quality Factors */}
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quality Factors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {Object.entries(settings.assumptions.qualityFactors).map(([key, value]) => (
                            <div key={key}>
                              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                {key} Quality
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                value={value}
                                onChange={(e) => updateSettings({
                                  assumptions: {
                                    ...settings.assumptions,
                                    qualityFactors: {
                                      ...settings.assumptions.qualityFactors,
                                      [key]: Number(e.target.value)
                                    }
                                  }
                                })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'pricing' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-[#1B8B6A]" />
                      Pricing Settings
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Base Rates</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Price per Sq. Ft
                            </label>
                            <input
                              type="number"
                              value={settings.pricePerSqFt}
                              onChange={(e) => updateSettings({ pricePerSqFt: Number(e.target.value) })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Labor Cost per Day
                            </label>
                            <input
                              type="number"
                              value={settings.laborCostPerDay}
                              onChange={(e) => updateSettings({ laborCostPerDay: Number(e.target.value) })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Material Prices</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Brick Price (per piece)
                            </label>
                            <input
                              type="number"
                              value={settings.brickPrice}
                              onChange={(e) => updateSettings({ brickPrice: Number(e.target.value) })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Cement Price (per bag)
                            </label>
                            <input
                              type="number"
                              value={settings.cementPrice}
                              onChange={(e) => updateSettings({ cementPrice: Number(e.target.value) })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Steel Price (per ton)
                            </label>
                            <input
                              type="number"
                              value={settings.steelPrice}
                              onChange={(e) => updateSettings({ steelPrice: Number(e.target.value) })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Rates</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Plumbing Cost per Sq. Ft
                            </label>
                            <input
                              type="number"
                              value={settings.plumbingCostPerSqFt}
                              onChange={(e) => updateSettings({ plumbingCostPerSqFt: Number(e.target.value) })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Electrical Cost per Sq. Ft
                            </label>
                            <input
                              type="number"
                              value={settings.electricalCostPerSqFt}
                              onChange={(e) => updateSettings({ electricalCostPerSqFt: Number(e.target.value) })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Costs</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Window Cost (per unit)
                            </label>
                            <input
                              type="number"
                              value={settings.assumptions.windowCost}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  windowCost: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Door Cost (per unit)
                            </label>
                            <input
                              type="number"
                              value={settings.assumptions.doorCost}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  doorCost: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'factors' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <Sliders className="w-6 h-6 text-[#1B8B6A]" />
                      Construction Factors
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Material Factors</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Bricks per Sq. Ft
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={settings.assumptions.bricksPerSqFt}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  bricksPerSqFt: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Cement Bags per Sq. Ft
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={settings.assumptions.cementBagsPerSqFt}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  cementBagsPerSqFt: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Steel per Sq. Ft (tons)
                            </label>
                            <input
                              type="number"
                              step="0.001"
                              value={settings.assumptions.steelPerSqFt}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  steelPerSqFt: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Location Factors</h3>
                        <div className="space-y-4">
                          {Object.entries(settings.assumptions.locationFactors).map(([key, value]) => (
                            <div key={key}>
                              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                {key} Area Factor
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                value={value}
                                onChange={(e) => updateSettings({
                                  assumptions: {
                                    ...settings.assumptions,
                                    locationFactors: {
                                      ...settings.assumptions.locationFactors,
                                      [key]: Number(e.target.value)
                                    }
                                  }
                                })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Labor Factors</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Labor Productivity (sq. ft/day)
                            </label>
                            <input
                              type="number"
                              value={settings.assumptions.laborProductivityPerDay}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  laborProductivityPerDay: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Timeline Base Cost
                            </label>
                            <input
                              type="number"
                              value={settings.assumptions.timelineBaseCost}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  timelineBaseCost: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Timeline Factor per Month
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={settings.assumptions.timelineFactorPerMonth}
                              onChange={(e) => updateSettings({
                                assumptions: {
                                  ...settings.assumptions,
                                  timelineFactorPerMonth: Number(e.target.value)
                                }
                              })}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <FileText className="w-6 h-6 text-[#1B8B6A]" />
                      Resources Management
                    </h2>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Resource</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={newResource.title}
                            onChange={(e) =>
                              setNewResource({ ...newResource, title: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            placeholder="Enter resource title"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <input
                            type="text"
                            value={newResource.category}
                            onChange={(e) =>
                              setNewResource({ ...newResource, category: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            placeholder="e.g., Checklists, Formulas, Guidelines"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={newResource.description}
                            onChange={(e) =>
                              setNewResource({ ...newResource, description: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1B8B6A] transition-all duration-200"
                            placeholder="Enter resource description"
                          />
                        </div>
                      </div>

                      <ResourceUpload onUpload={handleFileUpload} />

                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={handleAddResource}
                          disabled={!newResource.title || !selectedFile}
                          className="flex items-center space-x-2 px-6 py-2 bg-[#1B8B6A] text-white rounded-lg hover:bg-[#147A59] disabled:bg-gray-400 transition-all duration-200"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Resource</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Current Resources</h3>
                      <div className="space-y-4">
                        <AnimatePresence>
                          {settings.resources.map((resource) => (
                            <motion.div
                              key={resource.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                            >
                              <div>
                                <h4 className="font-medium text-gray-800">{resource.title}</h4>
                                <p className="text-sm text-gray-600">{resource.description}</p>
                                <p className="text-xs text-gray-500">
                                  Category: {resource.category}
                                </p>
                              </div>
                              <button
                                onClick={() => removeResource(resource.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {settings.resources.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            No resources added yet
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}