import { Injectable } from '@nestjs/common';
import { mockTrendingPosts } from '../trending/mock/trending.post';

@Injectable()
export class DetailService {
  getMockPost(id: string) {
    const numericId = Number(id);

    // id가 1~5 사이일 경우 (캐러셀로 접근) -> 그대로 반환
    const found = mockTrendingPosts.find((post) => post.id === numericId);
    if (found) return found;
    // 트렌딩 포스트 5개 중 랜덤으로 하나 뱉어줌
    if (process.env.IS_MOCKING == 'true') {
      const idx = Math.floor(Math.random() * mockTrendingPosts.length);

      return mockTrendingPosts[idx];
    }
  }

  getDetailPost(data: any) {
    return {
      id: data.id,
      title: data.title,
      filter: {
        startDate: data.startAt,
        endDate: data.endAt,
        deadlineDate: data.closedAt,
        groupTheme: data.category,
        groupSize: String(data.maxParticipants ?? 0),
        gender: data.preferredGender ?? 'ANY',
        age: [data.preferredAge ?? 'ALL'],
      },
      location: {
        placeName: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
      },
      content: data.content,
      thumbnailUrl: data.thumbnailUrl,
      tags: data.hashtags ?? [],

      currentMembers: 0, // 서버에 없으므로 기본값
      maxMembers: data.maxParticipants ?? 0,

      userId: '',
      userName: data.creator?.nickname ?? '',
      profileImage: data.creator?.thumbnailUrl ?? null,
      statusMessage: data.creator?.statusMessage ?? null,
      userAge: data.creator?.ageGroup,
      userGender: data.creator?.gender ?? null,
      userRating: 4.5, //todo: 평점 api와 연결?
    };
  }
}
