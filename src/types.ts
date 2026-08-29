export interface SurfCondition {
  id: string;
  spotName: string;
  swellHeight: string; // e.g., "1.8 - 2.4 m"
  swellDirection: string; // e.g., "SW 210°"
  swellPeriod: string; // e.g., "14 sec"
  windSpeed: string; // e.g., "12 knots"
  windDirection: string; // e.g., "Offshore SE"
  waterTemp: string; // e.g., "16°C"
  tideCurrent: string; // e.g., "High 10:42 AM (3.2m)"
  tideNext: string; // e.g., "Low 4:55 PM (0.4m)"
  barCondition: 'OPTIMAL' | 'MODERATE' | 'HAZARDOUS' | 'EXTREME_CAUTION';
  barDescription: string;
  overallRating: number; // 1 to 5 stars
  avatarCommentary: string;
  lastUpdated: string;
}

export interface VideoUpdate {
  id: string;
  title: string;
  duration: string;
  category: 'Session Recap' | 'Bar Safety' | 'Grom Comp' | 'Local Legend';
  thumbnailUrl: string;
  videoUrl: string;
  date: string;
  views: number;
  featured: boolean;
  surfer: string;
  description: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logoText: string;
  category: string;
  tagline: string;
  description: string;
  discountPerk?: string;
  website: string;
  tier: 'Principal' | 'Gold Community' | 'Local Supporter';
  imageUrl: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  category: 'Competition' | 'Beach Clean' | 'Social' | 'Youth Training';
  description: string;
  badge?: string;
}

export interface PartnerInquiry {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  partnershipType: string;
  message: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'mana';
  text: string;
  timestamp: string;
  suggestedAction?: string;
}
