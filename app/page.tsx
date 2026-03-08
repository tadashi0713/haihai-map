'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { spaces } from '@/data/spaces';
import { Space, SpaceCategory, SpaceFeature } from '@/types/space';
import SpaceCard from '@/components/SpaceCard';
import SpaceDetail from '@/components/SpaceDetail';
import FilterPanel from '@/components/FilterPanel';

// Dynamically import Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <p className="text-gray-600">地図を読み込み中...</p>
    </div>
  ),
});

export default function Home() {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
  const [detailSpaceId, setDetailSpaceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<SpaceCategory[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<SpaceFeature[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([35.6762, 139.6503]);
  const [mapZoom, setMapZoom] = useState(12);

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          space.name.toLowerCase().includes(query) ||
          space.description.toLowerCase().includes(query) ||
          space.address.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Category filter
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(space.category)) return false;
      }

      // Feature filter
      if (selectedFeatures.length > 0) {
        const hasAllFeatures = selectedFeatures.every((feature) =>
          space.features.includes(feature)
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedFeatures]);

  const handleSpaceClick = (space: Space) => {
    setSelectedSpaceId(space.id);
    setMapCenter([space.latitude, space.longitude]);
    setMapZoom(15);
  };

  const handleMarkerClick = (space: Space) => {
    setSelectedSpaceId(space.id);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedFeatures([]);
    setSearchQuery('');
  };

  const selectedSpace = selectedSpaceId
    ? spaces.find((s) => s.id === selectedSpaceId)
    : null;

  const detailSpace = detailSpaceId
    ? spaces.find((s) => s.id === detailSpaceId)
    : null;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">👶</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">ハイハイマップ</h1>
            <p className="text-sm text-gray-600">赤ちゃんが遊べる場所を探そう</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full lg:w-96 bg-white overflow-y-auto border-r border-gray-200">
          <div className="p-4 space-y-4">
            {/* Search Bar */}
            <div>
              <input
                type="text"
                placeholder="🔍 場所を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Filter Panel */}
            <FilterPanel
              selectedCategories={selectedCategories}
              selectedFeatures={selectedFeatures}
              onCategoryChange={setSelectedCategories}
              onFeatureChange={setSelectedFeatures}
              onReset={handleResetFilters}
            />

            {/* Results Count */}
            <div className="text-sm text-gray-600 px-2">
              {filteredSpaces.length}件の施設が見つかりました
            </div>

            {/* Space List */}
            <div className="space-y-3">
              {filteredSpaces.map((space) => (
                <div key={space.id}>
                  <SpaceCard
                    space={space}
                    onClick={() => handleSpaceClick(space)}
                    isSelected={selectedSpaceId === space.id}
                  />
                  {selectedSpaceId === space.id && (
                    <button
                      onClick={() => setDetailSpaceId(space.id)}
                      className="mt-2 w-full bg-teal-600 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                    >
                      詳細を見る
                    </button>
                  )}
                </div>
              ))}
              {filteredSpaces.length === 0 && (
                <div className="text-center py-8 bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-600 mb-4">条件に合う施設が見つかりませんでした</p>
                  <button
                    onClick={handleResetFilters}
                    className="text-teal-600 hover:text-teal-800 font-semibold"
                  >
                    フィルターをリセット
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 h-64 lg:h-auto">
          <Map
            spaces={filteredSpaces}
            center={mapCenter}
            zoom={mapZoom}
            onMarkerClick={handleMarkerClick}
            selectedSpaceId={selectedSpaceId}
          />
        </div>
      </div>

      {/* Detail Modal */}
      {detailSpace && (
        <SpaceDetail space={detailSpace} onClose={() => setDetailSpaceId(null)} />
      )}
    </div>
  );
}
