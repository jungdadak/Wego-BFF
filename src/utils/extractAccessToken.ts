import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

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
