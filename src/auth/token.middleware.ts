import { NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestWithCookies } from '../types/req.types';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: RequestWithCookies, res: Response, next: NextFunction) {
    const allowedOrigins = [
      'https://www.wego-travel.click',
      'http://localhost:3000',
    ];
    const origin = (req.headers['origin'] ?? '') as string;

    if (origin && allowedOrigins.includes(origin)) {
      const accessToken = req.cookies['access_token'];
      if (accessToken) {
        req.headers['authorization'] = `Bearer ${accessToken}`;
      }
    }
    next();
  }
}
