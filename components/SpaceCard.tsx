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
      className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg flex-1">{space.name}</h3>
        {space.rating && (
          <div className="flex items-center gap-1 text-sm ml-2">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold">{space.rating}</span>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-2">{categoryLabels[space.category]}</p>

      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{space.description}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {space.features.slice(0, 4).map((feature) => (
          <span
            key={feature}
            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
          >
            {featureLabels[feature]}
          </span>
        ))}
        {space.features.length > 4 && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            +{space.features.length - 4}
          </span>
        )}
      </div>

      <div className="text-xs text-gray-500">
        <p className="mb-1">📍 {space.address}</p>
        {space.openingHours && <p>🕐 {space.openingHours}</p>}
      </div>
    </div>
  );
}
