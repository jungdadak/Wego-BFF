import { Injectable } from '@nestjs/common';
import { mockTrendingPosts } from '../trending/mock/trending.post';

@Injectable()
export class DetailService {
  getDetailPost(id: string) {
    if (process.env.IS_MOCKING == 'true') {
      const numericId = Number(id);

      // id가 1~5 사이일 경우 (캐러셀로 접근) -> 그대로 반환
      const found = mockTrendingPosts.find((post) => post.id === numericId);
      if (found) return found;
      // 트렌딩 포스트 5개 중 랜덤으로 하나 뱉어줌
      const idx = Math.floor(Math.random() * mockTrendingPosts.length);

      return mockTrendingPosts[idx];
    }
    //todo
    return { id };
  }
}
