import { faker } from '@faker-js/faker';
import { PostDto } from '../types/post.dto';
import { tiptapContentSamples } from '../contentTemplete';

function getRandomContent() {
  const randomIndex = Math.floor(Math.random() * tiptapContentSamples.length);
  return tiptapContentSamples[randomIndex];
}

let postIdCounter = 1;

export const createMockPost = (overrides: Partial<PostDto> = {}): PostDto => ({
  postId: postIdCounter++,
  title: faker.lorem.words(5).slice(0, 32),
  filter: {
    startDate: faker.date.soon(),
    endDate: faker.date.soon(),
    deadlineDate: faker.date.future(),
    deadlineTime: '18:00',
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
