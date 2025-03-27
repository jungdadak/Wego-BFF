import { Controller, Get } from '@nestjs/common';
import { TrendingService } from './trending.service';

@Controller('trending')
export class TrendingController {
  constructor(private readonly trendingService: TrendingService) {}

  @Get()
  getAllTrending() {
    return this.trendingService.getTrendingPosts();
  }
}
