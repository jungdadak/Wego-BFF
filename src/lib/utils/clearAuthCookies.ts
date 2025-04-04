import { Response } from 'express';

export function clearAuthCookies(res: Response) {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    path: '/',
    domain: '.wego-travel.click',
  };

  res.clearCookie('accessToken', options);
  res.clearCookie('refreshToken', options);
}
