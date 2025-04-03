import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { RequestWithCookies } from '../types/req.types';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: RequestWithCookies, res: Response, next: NextFunction) {
    const allowedOrigins = [
      'https://www.wego-travel.click',
      'http://localhost:3000',
      'https://gateway.wego-travel.click',
    ];
    const origin = (req.headers['origin'] ?? '') as string;
    const host = (req.headers['host'] ?? '') as string;

    if (
      (origin && allowedOrigins.includes(origin)) ||
      (host && allowedOrigins.includes(`https://${host}`))
    ) {
      // 여러 쿠키 키 확인
      const accessToken =
        req.cookies['accessToken'] || req.cookies['access_token'];

      if (accessToken) {
        req.headers['authorization'] = `Bearer ${accessToken}`;
      }
    }
    next();
  }
}
