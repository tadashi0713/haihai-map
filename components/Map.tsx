'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Space } from '@/types/space';

// Fix Leaflet default marker icons - wrapped in useEffect to avoid SSR issues
let DefaultIcon: L.Icon | undefined;

if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });

  DefaultIcon = L.icon({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

interface MapProps {
  spaces: Space[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (space: Space) => void;
  onDetailClick?: (space: Space) => void;
  selectedSpaceId?: string | null;
}

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

export default function Map({
  spaces,
  center = [35.6762, 139.6503], // Tokyo default
  zoom = 12,
  onMarkerClick,
  onDetailClick,
  selectedSpaceId
}: MapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">地図を読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full z-0"
        zoomControl={true}
      >
        <MapUpdater center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {spaces.map((space) => {
          const isSelected = selectedSpaceId === space.id;

          // Create custom icon for selected marker
          let icon: L.Icon | undefined;
          if (typeof window !== 'undefined') {
            icon = isSelected
              ? L.icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
                })
              : DefaultIcon;
          }

          return (
            <Marker
              key={space.id}
              position={[space.latitude, space.longitude]}
              icon={icon}
              eventHandlers={{
                click: () => {
                  onMarkerClick?.(space);
                },
              }}
            >
              <Popup
                className="custom-popup"
              >
                <div className="min-w-[240px] p-1">
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{space.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{space.address}</p>
                  <div className="flex items-center justify-between">
                    {space.rating && (
                      <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full">
                        <span className="text-amber-500 text-lg">★</span>
                        <span className="font-semibold text-amber-700">{space.rating}</span>
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDetailClick?.(space);
                      }}
                      className="text-xs text-teal-600 hover:text-teal-700 font-semibold hover:underline"
                    >
                      詳細を見る →
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
