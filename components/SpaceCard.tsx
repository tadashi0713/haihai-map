'use client';

import { Space, categoryLabels, featureLabels } from '@/types/space';

interface SpaceCardProps {
  space: Space;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function SpaceCard({ space, onClick, isSelected }: SpaceCardProps) {
  return (
    <div
      className={`bg-white rounded-lg p-4 cursor-pointer transition-all border ${
        isSelected
          ? 'border-teal-500 shadow-md'
          : 'border-gray-200 hover:border-teal-300 hover:shadow-sm'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-base flex-1 text-gray-800">{space.name}</h3>
        {space.rating && (
          <div className="flex items-center gap-1 text-sm ml-2">
            <span className="text-yellow-500">★</span>
            <span className="text-gray-700">{space.rating}</span>
          </div>
        )}
      </div>

      <p className="text-xs text-teal-700 bg-teal-50 inline-block px-2 py-1 rounded mb-2">
        {categoryLabels[space.category]}
      </p>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{space.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {space.features.slice(0, 4).map((feature) => (
          <span
            key={feature}
            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
          >
            {featureLabels[feature]}
          </span>
        ))}
        {space.features.length > 4 && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            +{space.features.length - 4}
          </span>
        )}
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p className="flex items-start gap-1">
          <span>📍</span>
          <span className="flex-1">{space.address}</span>
        </p>
        {space.openingHours && (
          <p className="flex items-center gap-1">
            <span>🕐</span>
            <span>{space.openingHours}</span>
          </p>
        )}
      </div>
    </div>
  );
}
