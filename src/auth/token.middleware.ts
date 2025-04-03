import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { RequestWithCookies } from '../types/req.types';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: RequestWithCookies, res: Response, next: NextFunction) {
    const accessToken =
      req.cookies['accessToken'] || req.cookies['access_token'];

    // 토큰이 있을 때만 헤더 설정
    if (accessToken) {
      req.headers['authorization'] = `Bearer ${accessToken}`;
    }

    next();
  }
}
