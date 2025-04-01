import { Controller, Get, Query } from '@nestjs/common';
import { createManyPosts } from '../mock/factory/post.factory';
import { flattenPost } from '../lib/flattenPost';

@Controller('home')
export class HomeController {
  @Get('posts')
  getMockPosts(@Query('page') page = 1, @Query('size') size = 12) {
    const count = Number(size);
    const posts = createManyPosts(count).map(flattenPost);
    const hasMore = page < 5; // 예시: 5페이지까지만 있다고 가정

    return {
      data: posts,
      pageInfo: {
        page: Number(page),
        size: count,
        hasMore,
      },
    };
  }
}
