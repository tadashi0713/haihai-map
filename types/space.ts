export interface Space {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  category: SpaceCategory;
  features: SpaceFeature[];
  openingHours?: string;
  phone?: string;
  website?: string;
  rating?: number;
  imageUrl?: string;
}

export type SpaceCategory =
  | 'child_center'      // 子育て支援センター
  | 'community_center'  // 児童館・コミュニティセンター
  | 'park'              // 公園
  | 'shopping_mall'     // ショッピングモール
  | 'cafe'              // カフェ
  | 'library';          // 図書館

export type SpaceFeature =
  | 'crawling_space'    // ハイハイスペース
  | 'nursing_room'      // 授乳室
  | 'diaper_changing'   // おむつ替え台
  | 'parking'           // 駐車場
  | 'stroller_friendly' // ベビーカーOK
  | 'toys'              // おもちゃあり
  | 'indoor'            // 屋内
  | 'outdoor'           // 屋外
  | 'free'              // 無料
  | 'air_conditioned';  // 冷暖房完備

export const categoryLabels: Record<SpaceCategory, string> = {
  child_center: '子育て支援センター',
  community_center: '児童館・コミュニティセンター',
  park: '公園',
  shopping_mall: 'ショッピングモール',
  cafe: 'カフェ',
  library: '図書館',
};

export const featureLabels: Record<SpaceFeature, string> = {
  crawling_space: 'ハイハイスペース',
  nursing_room: '授乳室',
  diaper_changing: 'おむつ替え台',
  parking: '駐車場',
  stroller_friendly: 'ベビーカーOK',
  toys: 'おもちゃあり',
  indoor: '屋内',
  outdoor: '屋外',
  free: '無料',
  air_conditioned: '冷暖房完備',
};
