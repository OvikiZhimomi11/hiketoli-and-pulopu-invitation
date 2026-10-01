export interface WeddingDetails {
  bride: string;
  groom: string;
  brideParents: {
    mother: string;
    father: string;
  };
  groomParents: {
    mother: string;
    father: string;
  };
  verse: {
    text: string;
    reference: string;
  };
  event: {
    day: string;
    date: string;
    month: string;
    year: string;
    fullDateString: string;
    time: string;
    venue: string;
    town: string;
    state: string;
  };
  defaultGuest: string;
}

export interface VideoScene {
  id: string;
  title: string;
  subtitle: string;
  quote: string;
  image: string;
  duration: number; // in seconds
}

export interface GuestBlessing {
  id: string;
  name: string;
  message: string;
  attendance: 'attending' | 'praying_from_afar' | 'attending_with_family';
  timestamp: string;
}
