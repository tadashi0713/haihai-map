'use client';

import { Space, categoryLabels, featureLabels } from '@/types/space';

interface SpaceDetailProps {
  space: Space;
  onClose: () => void;
}

export default function SpaceDetail({ space, onClose }: SpaceDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{space.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {categoryLabels[space.category]}
            </span>
            {space.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="font-semibold text-lg">{space.rating}</span>
              </div>
            )}
          </div>

          <p className="text-gray-700 mb-6">{space.description}</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">設備・特徴</h3>
              <div className="flex flex-wrap gap-2">
                {space.features.map((feature) => (
                  <span
                    key={feature}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {featureLabels[feature]}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">基本情報</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <span className="font-semibold w-24">住所:</span>
                  <span className="flex-1">{space.address}</span>
                </div>
                {space.openingHours && (
                  <div className="flex items-start">
                    <span className="font-semibold w-24">営業時間:</span>
                    <span className="flex-1">{space.openingHours}</span>
                  </div>
                )}
                {space.phone && (
                  <div className="flex items-start">
                    <span className="font-semibold w-24">電話:</span>
                    <span className="flex-1">
                      <a href={`tel:${space.phone}`} className="text-blue-600 hover:underline">
                        {space.phone}
                      </a>
                    </span>
                  </div>
                )}
                {space.website && (
                  <div className="flex items-start">
                    <span className="font-semibold w-24">ウェブサイト:</span>
                    <span className="flex-1">
                      <a
                        href={space.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {space.website}
                      </a>
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${space.latitude},${space.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Googleマップで道順を見る
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
