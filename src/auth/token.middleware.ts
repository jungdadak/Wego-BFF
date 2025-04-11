import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { RequestWithCookies } from '../types/req.types';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: RequestWithCookies, res: Response, next: NextFunction) {
    const accessToken =
      req.cookies['accessToken'] || req.cookies['access_token'];

    if (accessToken) {
      req.headers['authorization'] = `Bearer ${accessToken}`;
      console.log(
        '[Middleware] Authorization 헤더 세팅 완료:',
        req.headers['authorization'],
      );
    }

    next();
  }
}
