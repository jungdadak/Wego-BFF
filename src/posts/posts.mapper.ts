import { CreateReceivedDto } from './dto/create.received.dto';
import { CreateSendDto } from './dto/create.send.dto';

export function mapToCreateSendDto(input: CreateReceivedDto): CreateSendDto {
  const { filter, location, tags } = input;

  return {
    title: input.title,
    content: input.content,
    thumbnailUrl: input.thumbnailUrl ?? '',
    address: location.placeName,
    latitude: location.lat,
    longitude: location.lng,
    startAt: filter.startDate.slice(0, 10),
    endAt: filter.endDate.slice(0, 10),
    closedAt: `${filter.deadlineDate}T${filter.deadlineTime}`,
    maxParticipants: parseInt(filter.groupSize.replace(/\D/g, ''), 10),
    preferredGender: mapGender(filter.gender),
    preferredAgeGroup: mapAgeGroup(filter.age),
    category: mapTheme(filter.groupTheme),
    hashtags: (tags ?? []).map((tag) => tag.replace(/^#/, '')),
  };
}

function mapGender(gender?: string): CreateSendDto['preferredGender'] {
  if (!gender || gender === 'notCare') return 'ANY';
  return gender.toUpperCase() as CreateSendDto['preferredGender']; // 'male' → 'MALE'
}

function mapAgeGroup(age: string): CreateSendDto['preferredAgeGroup'] {
  if (!age || age === 'notCare') return 'ALL';

  switch (age) {
    case '10s':
      return 'TEENS';
    case '20s':
      return 'TWENTIES';
    case '30s':
      return 'THIRTIES';
    case '40s':
      return 'FORTIES';
    case '50s':
      return 'FIFTIES';
    case '60s':
      return 'SIXTIES';
    case '70s':
      return 'SEVENTIES';
    default:
      return 'ALL';
  }
}

function mapTheme(theme: string): CreateSendDto['category'] {
  switch (theme) {
    case 'friends':
      return 'PART';
    case 'tour':
      return 'TOUR';
    case 'booking':
      return 'SHARE';
    case 'event':
      return 'SHOW';
    case 'food':
      return 'RESTAURANT';
    case 'couple':
      return 'COUPLE'; // 묶어서 처리 가능
    default:
      return 'PART'; // fallback
  }
}
