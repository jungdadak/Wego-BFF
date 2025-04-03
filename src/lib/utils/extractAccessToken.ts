import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

/**
 * 엑세스 토큰을 뽑는데 없으면 에러던짐
 * @param req
 */
export function extractAccessToken(req: Request): string {
  const token = req.cookies?.['accessToken'] || req.cookies?.['access_token'];
  if (!token) throw new UnauthorizedException('Access token is missing');
  return token;
}
