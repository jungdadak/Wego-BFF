import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { DetailService } from './detail.service';
import { SpringApiService } from '../lib/clients/spring.axios.service';

@Controller('detail')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get(':id')
  async getDetail(@Param('id') id: string) {
    const spring = new SpringApiService();
    const client = spring.toSpring();
    let data = undefined;

    try {
      const springRes = await client.get(`/api/gatherings/${id}`);
      data = springRes.data;
    } catch (e) {
      console.error('글 조회 실패:', e);
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    return this.detailService.getDetailPost(data);
  }
}
