import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Req,
} from '@nestjs/common';
import { FilterService } from './filter.service';
import { RequestWithCookies } from '../types/req.types';
import { plainToInstance } from 'class-transformer';
import { FilterDto } from './dto/filter.dto';
import { validate } from 'class-validator';

@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get('/')
  async getFilteredItems(
    @Req() req: RequestWithCookies,
    @Query('filters') filtersString: string,
  ) {
    try {
      const filterObj = JSON.parse(decodeURIComponent(filtersString));
      console.log('[Home] 필터 검색 요청:', filterObj);
      const filterDto = plainToInstance(FilterDto, filterObj);

      const errors = await validate(filterDto);

      if (errors.length > 0) {
        throw new BadRequestException('유효성 검증 실패', errors.toString());
      }

      console.log('[Home] 필터 검색 요청:', filterDto);
      return filterDto;
    } catch (error) {
      console.error('필터 처리 오류:', error);
      return { success: false, error: '필터 처리 중 오류가 발생했습니다.' };
    }
  }
}
