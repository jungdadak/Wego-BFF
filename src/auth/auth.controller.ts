import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { nanoid } from 'nanoid';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  async redirectToKakao(@Res() res: Response) {
    try {
      const state = nanoid();

      res.cookie('kakao_auth_state', state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 300,
      });

      const kakaoURL = this.authService.getKakaoRedirectURL(state);
      return res.redirect(kakaoURL);
    } catch (err) {
      console.error('카카오 인증 URL 생성 오류:', err);
      return res.status(500).json({
        message: '인증 처리 중 오류가 발생했습니다.',
      });
    }
  }
}
