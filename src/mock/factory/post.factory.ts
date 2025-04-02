import { faker } from '@faker-js/faker';
import { PostDto } from '../types/post.dto';
import { tiptapContentSamples } from '../contentTemplete';

function getRandomContent() {
  const randomIndex = Math.floor(Math.random() * tiptapContentSamples.length);
  return tiptapContentSamples[randomIndex];
}

let postIdCounter = 1;

function getKSTAroundNow(offsetDays: number = 3): Date {
  const now = new Date();
  const kstOffsetMs = 9 * 60 * 60 * 1000;
  const baseTime = now.getTime() + kstOffsetMs;

  // -offsetDays ~ +offsetDays 사이에서 랜덤하게 선택
  const randomOffsetMs =
    (Math.random() * 2 * offsetDays - offsetDays) * 24 * 60 * 60 * 1000;

  return new Date(baseTime + randomOffsetMs);
}

export const createMockPost = (overrides: Partial<PostDto> = {}): PostDto => ({
  postId: postIdCounter++,
  title: faker.lorem.words(5).slice(0, 32),
  filter: {
    startDate: getKSTAroundNow(3).toISOString(),
    endDate: getKSTAroundNow(3).toISOString(),
    deadlineDate: getKSTAroundNow(3).toISOString(),
    groupTheme: '여행 동행',
    groupSize: '4인',
    gender: '여자',
    age: ['20대'],
    ...(overrides.filter ?? {}),
  },
  location: {
    placeName: '서울 강남구',
    lat: faker.location.latitude(),
    lng: faker.location.longitude(),
    ...(overrides.location ?? {}),
  },
  content: getRandomContent(),
  thumbnailUrl: faker.image.urlPicsumPhotos(),
  tags: ['#여행', '#맛집'],
  user: {
    kakaoId: faker.string.uuid(),
    nickname: faker.internet.username(),
    age: faker.number.int({ min: 10, max: 60 }),
    gender: faker.helpers.arrayElement(['남자', '여자']),
    profileImage: faker.image.avatar(),
    ...(overrides.user ?? {}),
  },
  ...overrides,
});

export const createManyPosts = (count: number): PostDto[] => {
  return Array.from({ length: count }, () => createMockPost());
};
