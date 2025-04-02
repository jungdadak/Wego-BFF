import { Controller, Get, Param } from '@nestjs/common';
import { DetailService } from './detail.service';

@Controller('detail')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}
  @Get(':id')
  getDetail(@Param('id') id: string) {
    return this.detailService.getDetailPost(id);
  }
}
