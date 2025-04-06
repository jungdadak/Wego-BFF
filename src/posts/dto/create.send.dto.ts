export class CreateSendDto {
  title: string;
  content: string;
  thumbnailUrl?: string;
  address: string;
  latitude: number;
  longitude: number;
  startAt: string; // YYYY-MM-DD
  endAt: string;
  closedAt: string; // ISO 8601
  maxParticipants: number;
  preferredGender: 'MALE' | 'FEMALE' | 'ANY';
  preferredAgeGroup:
    | 'ALL'
    | 'TEENS'
    | 'TWENTIES'
    | 'THIRTIES'
    | 'FORTIES'
    | 'FIFTIES'
    | 'SIXTIES'
    | 'SEVENTIES';
  category: 'PART' | 'TOUR' | 'SHARE' | 'SHOW' | 'RESTAURANT' | 'COUPLE';
  hashtags: string[];
}
