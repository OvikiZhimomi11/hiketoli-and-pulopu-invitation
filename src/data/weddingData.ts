import { WeddingDetails, VideoScene, GuestBlessing } from '../types';

export const weddingData: WeddingDetails = {
  bride: 'Hikety',
  groom: 'Wilson',
  brideParents: {
    mother: 'Mrs. Kheshili T. Jimo',
    father: 'Late Er. K. Tosuho Sema',
  },
  groomParents: {
    mother: 'Late Mrs. Keluonguü Helena Khruomo',
    father: 'Late Mr. N. Kughavi Zhimomi',
  },
  verse: {
    text: 'May your constant love be with us, Lord, as we put our hope in you.',
    reference: 'Psalm 33:22',
  },
  event: {
    day: 'Tuesday',
    date: '20',
    month: 'October',
    year: '2026',
    fullDateString: 'Tuesday, October 20, 2026',
    time: '10:00 A.M',
    venue: 'Satakha Town Baptist Church',
    town: 'Satakha, Zunheboto',
    state: 'Nagaland',
  },
  defaultGuest: 'Dr. & Mrs. Angke Konyak',
};

export const videoScenes: VideoScene[] = [
  {
    id: 'intro',
    title: 'Hikety & Wilson',
    subtitle: 'Together with their families',
    quote: '"May your constant love be with us, Lord, as we put our hope in you." · Psalm 33:22',
    image: '/src/assets/images/wedding_video_scene_couple_1790873111560.jpg',
    duration: 4.5,
  },
  {
    id: 'rings',
    title: 'Holy Matrimony & Sacred Vows',
    subtitle: 'Tuesday, October 20, 2026',
    quote: 'Satakha Town Baptist Church · 10:00 A.M',
    image: '/src/assets/images/wedding_video_scene_rings_1790873125452.jpg',
    duration: 4.5,
  },
];


export const initialBlessings: GuestBlessing[] = [
  {
    id: '1',
    name: 'Dr. & Mrs. Angke Konyak',
    message: 'Warmest congratulations to dearest Hikety and Wilson! May Almighty God shower your marriage with everlasting joy, peace, and abundance.',
    attendance: 'attending',
    timestamp: 'Just now',
  },
  {
    id: '2',
    name: 'The Zhimomi Family',
    message: 'We are overjoyed to celebrate this blessed union. May your home be filled with God\'s infinite grace and love.',
    attendance: 'attending_with_family',
    timestamp: '2 hours ago',
  },
  {
    id: '3',
    name: 'Rev. & Mrs. Sema',
    message: 'Standing with you in prayers as you begin this holy journey. Blessed be your new beginning!',
    attendance: 'attending',
    timestamp: 'Yesterday',
  },
];
