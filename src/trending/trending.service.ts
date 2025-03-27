import { Injectable } from '@nestjs/common';
import { mockTrendingPosts } from './mock/trending.post';

@Injectable()
export class TrendingService {
  getTrendingPosts() {
    return mockTrendingPosts;
  }
}
