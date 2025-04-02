import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createManyPosts } from '../mock/factory/post.factory';
import { flattenPost } from '../lib/flattenPost';
import { PostResponseDto } from '../mock/types/post.dto';
import { PostsQueryParamsDto } from '../mock/types/query-params.dto';

@ApiTags('posts')
@Controller('posts')
export class HomeController {
  @Get('/')
  @ApiOperation({
    summary: '게시글 목록 조회',
    description: '페이지네이션을 적용한 동행 모집 게시글 목록을 조회합니다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '게시글 목록 조회 성공',
    type: [PostResponseDto],
  })
  getMockPosts(@Query() query: PostsQueryParamsDto) {
    const page = query._page || 1;
    const limit = query._limit || 12;

    // 가상의 전체 페이지 수 (예: 총 5페이지만 있다고 가정)
    const totalPages = 5;

    // 마지막 페이지인 경우 빈 배열 반환 (데이터 없음)
    if (page > totalPages) {
      return [];
    }

    // 마지막 페이지인 경우 더 적은 수의 결과 반환 (페이지가 꽉 차지 않는 경우 시뮬레이션)
    if (page === totalPages) {
      const remainingItems = 7; // 마지막 페이지에는 7개의 항목만 있다고 가정
      return createManyPosts(remainingItems).map(flattenPost);
    }

    // 일반적인 경우 요청된 limit만큼 데이터 반환
    return createManyPosts(limit).map(flattenPost);
  }
}
