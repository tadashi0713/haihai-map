'use client';

import { SpaceCategory, SpaceFeature, categoryLabels, featureLabels } from '@/types/space';

interface FilterPanelProps {
  selectedCategories: SpaceCategory[];
  selectedFeatures: SpaceFeature[];
  onCategoryChange: (categories: SpaceCategory[]) => void;
  onFeatureChange: (features: SpaceFeature[]) => void;
  onReset: () => void;
}

export default function FilterPanel({
  selectedCategories,
  selectedFeatures,
  onCategoryChange,
  onFeatureChange,
  onReset,
}: FilterPanelProps) {
  const handleCategoryToggle = (category: SpaceCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handleFeatureToggle = (feature: SpaceFeature) => {
    if (selectedFeatures.includes(feature)) {
      onFeatureChange(selectedFeatures.filter((f) => f !== feature));
    } else {
      onFeatureChange([...selectedFeatures, feature]);
    }
  };

  const hasFilters = selectedCategories.length > 0 || selectedFeatures.length > 0;

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-sm text-gray-800">フィルター</h3>
        {hasFilters && (
          <button
            onClick={onReset}
            className="text-xs text-teal-600 hover:text-teal-800 font-semibold"
          >
            リセット
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-xs mb-2 text-gray-600">カテゴリー</h4>
          <div className="flex flex-wrap gap-1.5">
            {(Object.entries(categoryLabels) as [SpaceCategory, string][]).map(
              ([category, label]) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                    selectedCategories.includes(category)
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-xs mb-2 text-gray-600">設備・特徴</h4>
          <div className="flex flex-wrap gap-1.5">
            {(Object.entries(featureLabels) as [SpaceFeature, string][]).map(
              ([feature, label]) => (
                <button
                  key={feature}
                  onClick={() => handleFeatureToggle(feature)}
                  className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                    selectedFeatures.includes(feature)
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
