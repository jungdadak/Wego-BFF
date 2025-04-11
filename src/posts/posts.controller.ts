import { Body, Controller, Post, Req } from '@nestjs/common';
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
}
