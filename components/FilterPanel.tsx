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
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">フィルター</h3>
        {hasFilters && (
          <button
            onClick={onReset}
            className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
          >
            リセット
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2 text-gray-700">カテゴリー</h4>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(categoryLabels) as [SpaceCategory, string][]).map(
              ([category, label]) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategories.includes(category)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-2 text-gray-700">設備・特徴</h4>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(featureLabels) as [SpaceFeature, string][]).map(
              ([feature, label]) => (
                <button
                  key={feature}
                  onClick={() => handleFeatureToggle(feature)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedFeatures.includes(feature)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
