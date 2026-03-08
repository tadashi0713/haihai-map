'use client';

import { Space, categoryLabels, featureLabels } from '@/types/space';

interface SpaceDetailProps {
  space: Space;
  onClose: () => void;
}

export default function SpaceDetail({ space, onClose }: SpaceDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-teal-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{space.name}</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-teal-700 rounded-full w-8 h-8 flex items-center justify-center text-2xl leading-none transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded text-sm font-semibold">
              {categoryLabels[space.category]}
            </span>
            {space.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold text-gray-700">{space.rating}</span>
              </div>
            )}
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">{space.description}</p>

          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-base mb-3 text-gray-800">設備・特徴</h3>
              <div className="flex flex-wrap gap-2">
                {space.features.map((feature) => (
                  <span
                    key={feature}
                    className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-sm"
                  >
                    {featureLabels[feature]}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-3 text-gray-800">基本情報</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-gray-700 w-20">📍 住所:</span>
                  <span className="flex-1 text-gray-600">{space.address}</span>
                </div>
                {space.openingHours && (
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-gray-700 w-20">🕐 営業時間:</span>
                    <span className="flex-1 text-gray-600">{space.openingHours}</span>
                  </div>
                )}
                {space.phone && (
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-gray-700 w-20">📞 電話:</span>
                    <span className="flex-1">
                      <a href={`tel:${space.phone}`} className="text-teal-600 hover:text-teal-800 hover:underline">
                        {space.phone}
                      </a>
                    </span>
                  </div>
                )}
                {space.website && (
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-gray-700 w-20">🌐 サイト:</span>
                    <span className="flex-1">
                      <a
                        href={space.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-800 hover:underline break-all"
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
                className="block w-full bg-teal-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
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
