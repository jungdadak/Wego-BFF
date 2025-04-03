import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

/**
 * 엑세스, 리프레시 둘다 추출하는데 하나라도 없으면 401 에러던짐
 * @param req
 */
export function extractTokens(req: Request): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken =
    req.cookies?.['accessToken'] || req.cookies?.['access_token'];
  const refreshToken =
    req.cookies?.['refreshToken'] || req.cookies?.['refresh_token'];

  if (!accessToken || !refreshToken) {
    throw new UnauthorizedException('Access or refresh token is missing');
  }

  return { accessToken, refreshToken };
}
