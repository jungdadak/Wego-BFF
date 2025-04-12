import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateReceivedDto } from './dto/create.received.dto';
import { mapToCreateSendDto } from './posts.mapper';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RequestWithCookies } from '../types/req.types';
import { extractTokens } from '../lib/utils/extractTokens';
import { SpringApiService } from '../lib/clients/spring.axios.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async createPost(
    @Body() dto: CreateReceivedDto,
    @Req() req: RequestWithCookies,
  ) {
    const payload = mapToCreateSendDto(dto);
    const { accessToken, refreshToken } = extractTokens(req);
    const spring = new SpringApiService(refreshToken);
    const client = spring.toSpring();
    const response = await client.post('/api/gatherings', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }

  @Patch(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() dto: CreateReceivedDto,
    @Req() req: RequestWithCookies,
  ) {
    const payload = mapToCreateSendDto(dto);
    const { accessToken, refreshToken } = extractTokens(req);
    const spring = new SpringApiService(refreshToken);
    const client = spring.toSpring();

    try {
      const response = await client.patch(`/api/gatherings/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      // 필요시 에러 핸들링 개선 가능
      console.error('Spring 서버 응답 오류:', error?.response?.data || error);
      throw new NotFoundException('수정할 게시물을 찾을 수 없습니다.');
    }
  }
}
