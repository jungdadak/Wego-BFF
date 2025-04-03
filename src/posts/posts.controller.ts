import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateReceivedDto } from './dto/create.received.dto';
import { mapToCreateSendDto } from './posts.mapper';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { extractTokens } from '../utils/extractAccessToken';
import { RequestWithCookies } from '../types/req.types';

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
    const springUrl = this.configService.get<string>('SPRING_URL');
    const payload = mapToCreateSendDto(dto);

    const { accessToken } = extractTokens(req);

    const response = await firstValueFrom(
      this.httpService.post(`${springUrl}/api/gatherings`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    return response.data;
  }
}
