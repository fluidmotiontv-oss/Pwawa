import { SurfCondition, VideoUpdate, Sponsor, ClubEvent } from '../types';

export const DEFAULT_SURF_CONDITIONS: SurfCondition[] = [
  {
    id: 'bar-main',
    spotName: 'Port Waikato Bar & Sunset Beach',
    swellHeight: '2.0 - 2.5 m',
    swellDirection: 'SW 215° (Clean Groundswell)',
    swellPeriod: '13.8 sec',
    windSpeed: '9 - 14 knots',
    windDirection: 'Offshore ESE',
    waterTemp: '15.8°C',
    tideCurrent: 'Rising Tide (2.8m at 11:15 AM)',
    tideNext: 'High Tide 11:15 AM | Low Tide 5:30 PM',
    barCondition: 'MODERATE',
    barDescription: 'Clean lines at Sunset Beach main peak. River mouth bar crossing requires extreme caution on outgoing tide. Offshore winds holding peaks up nicely.',
    overallRating: 4,
    avatarCommentary: "Kia ora line-up crew! Sunset Beach is pumping with a solid 2.2m SW groundswell. Wind is blowing ideal offshore ESE. If you're heading out over the Bar, remember to check with Sunset Beach Surf Life Saving or Coastguard VHF 64 first!",
    lastUpdated: 'Today at 07:30 AM NZST',
  },
  {
    id: 'sunset-inside',
    spotName: 'Sunset Beach Inside Corner',
    swellHeight: '1.2 - 1.6 m',
    swellDirection: 'SW 210°',
    swellPeriod: '13.8 sec',
    windSpeed: '8 knots',
    windDirection: 'Offshore ESE',
    waterTemp: '16.0°C',
    tideCurrent: 'Mid Tide',
    tideNext: 'High 11:15 AM',
    barCondition: 'OPTIMAL',
    barDescription: 'Protected inside section offering fun lefts and rights for intermediate and longboard riders.',
    overallRating: 5,
    avatarCommentary: "Perfect conditions for a fun morning session! Inside corner is shelter-sheltered from the bigger set sweeps. Ideal for club groms and longboarders.",
    lastUpdated: 'Today at 07:30 AM NZST',
  },
  {
    id: 'river-mouth',
    spotName: 'River Mouth Right Handers',
    swellHeight: '1.8 - 2.2 m',
    swellDirection: 'WSW 225°',
    swellPeriod: '12.5 sec',
    windSpeed: '12 knots',
    windDirection: 'Offshore E',
    waterTemp: '15.5°C',
    tideCurrent: 'Outgoing Slack',
    tideNext: 'Low 5:30 PM',
    barCondition: 'HAZARDOUS',
    barDescription: 'Strong current outflow from Waikato River meeting ocean swell. High risk of channel sweeps. Experienced boardriders only.',
    overallRating: 3,
    avatarCommentary: "River mouth is holding fast rights, but the ebb tide sweep is moving quickly. Keep eyes on your visual land markers and never surf alone out here team!",
    lastUpdated: 'Today at 07:30 AM NZST',
  }
];

export const MOCK_VIDEOS: VideoUpdate[] = [
  {
    id: 'vid-1',
    title: 'Port Waikato Winter Sessions: Sunset Bar Breakdown',
    duration: '4:12',
    category: 'Session Recap',
    thumbnailUrl: '/src/assets/images/channel_video_thumb_1785512974094.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // fallback embedded
    date: '3 Days Ago',
    views: 1840,
    featured: true,
    surfer: 'PWBC First Team & Local Groms',
    description: 'Watch local boardriders score heavy barrel sections at Sunset Beach during the recent SW groundswell event. Filmed by PWBC media squad.'
  },
  {
    id: 'vid-2',
    title: 'Waikato River Mouth Bar Navigation & Safety Guide',
    duration: '6:45',
    category: 'Bar Safety',
    thumbnailUrl: '/src/assets/images/port_waikato_hero_1785512962021.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    date: '1 Week Ago',
    views: 3290,
    featured: false,
    surfer: 'Sunset Beach Lifesaving & Coastguard PW',
    description: 'Crucial breakdown of sandbar channel movements, tide timing, and boat/board rescue procedures at Port Waikato.'
  },
  {
    id: 'vid-3',
    title: 'PWBC Grommet Winter Circuit - Round 2 Highlights',
    duration: '3:30',
    category: 'Grom Comp',
    thumbnailUrl: '/src/assets/images/channel_video_thumb_1785512974094.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    date: '2 Weeks Ago',
    views: 1420,
    featured: false,
    surfer: 'Under 16s & Under 12s Squad',
    description: 'High energy surfing from our local junior crew showing off big turns and smooth cutbacks in clean 1.5m waves.'
  }
];

export const MOCK_SPONSORS: Sponsor[] = [
  {
    id: 'spon-1',
    name: 'Waikato Surf & Board Co',
    logoText: 'WAIKATO SURF CO.',
    category: 'Surfboards & Wetsuits',
    tagline: 'Custom hand-shaped boards designed for heavy West Coast conditions.',
    description: 'Local shapers crafting high-performance step-ups and fish models tailored for Sunset Beach sandbars.',
    discountPerk: '15% Off Custom Orders for PWBC Financial Members',
    website: 'https://portwaikato.org.nz',
    tier: 'Principal',
    imageUrl: '/src/assets/images/channel_video_thumb_1785512974094.jpg',
  },
  {
    id: 'spon-2',
    name: 'Sunset Beach Store & Cafe',
    logoText: 'SUNSET CAFE',
    category: 'Hospitality & Provisions',
    tagline: 'Fresh coffee, hot pies, and post-surf feed right by the dunes.',
    description: 'The iconic community hub at Port Waikato for hearty feeds, ice-cold drinks, and local beach banter.',
    discountPerk: 'Free Regular Coffee with any Breakfast Pie for Members',
    website: 'https://portwaikato.org.nz',
    tier: 'Gold Community',
    imageUrl: '/src/assets/images/port_waikato_hero_1785512962021.jpg',
  },
  {
    id: 'spon-3',
    name: 'Port Waikato Marine & Outdoors',
    logoText: 'PW MARINE & TACKLE',
    category: 'Marine Safety & Hardware',
    tagline: 'Outboard servicing, safety gear, and surf wax for the West Coast.',
    description: 'Supplying emergency marine VHF gear, lifejackets, tie-downs, and heavy-duty surf accessories.',
    discountPerk: '10% Off All Marine Safety Gear',
    website: 'https://portwaikato.org.nz',
    tier: 'Gold Community',
    imageUrl: '/src/assets/images/channel_video_thumb_1785512974094.jpg',
  }
];

export const MOCK_EVENTS: ClubEvent[] = [
  {
    id: 'evt-1',
    title: 'PWBC Spring Opener Surf Comp',
    date: 'Saturday, Aug 15 • 7:00 AM',
    location: 'Sunset Beach Lifesaving Club Rooms',
    category: 'Competition',
    description: 'Open Men, Open Women, Juniors, and Masters divisions. Hot BBQ feed and prize-giving after the finals.',
    badge: 'Registration Open'
  },
  {
    id: 'evt-2',
    title: 'Dune Conservation & Beach Clean-Up',
    date: 'Sunday, Aug 23 • 9:30 AM',
    location: 'Port Waikato Carpark & River Mouth',
    category: 'Beach Clean',
    description: 'Joint initiative with PW Coast Care to plant marram grass and clear plastic debris from the river mouth dunes.',
    badge: 'Community Action'
  },
  {
    id: 'evt-3',
    title: 'Grommet Surf Safety & Bar Awareness Workshop',
    date: 'Saturday, Sep 05 • 10:00 AM',
    location: 'PW Lifesaving Deck',
    category: 'Youth Training',
    description: 'Free session led by senior lifeguards and PWBC mentors covering current reads, bar transit rules, and ocean awareness.',
    badge: 'Free Entry'
  }
];

export const AVATAR_PROFILES = {
  name: 'Mana',
  title: 'Port Waikato Surf Guide & Club Host',
  greeting: 'Kia ora! Here\'s what\'s happening at Port Waikato today.',
  role: 'Local Boardrider & Bar Safety Ambassador',
  avatarImage: '/src/assets/images/surf_avatar_host_1785512945530.jpg',
  heroImage: '/src/assets/images/port_waikato_hero_1785512962021.jpg',
};
