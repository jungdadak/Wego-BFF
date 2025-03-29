import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { nanoid } from 'nanoid';
import { AuthService } from './auth.service';

/**
 * 리퀘스트에 쿠키 타입이 없어서 추가
 */
interface RequestWithCookies extends Request {
  cookies: { [key: string]: string };
}

@Controller('user/kakao')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 카카오로 유저를 리디렉션 하는 컨트롤러.
   * nanoid 로 state 생성 후 카카오 Oauth URL 로 리디렉션.
   * @param res
   */
  @Get('authorize')
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

      //todo: next.js 에서 message 필드에 따른 Toast
      return res.status(500).json({
        message: '인증 처리 중 오류가 발생했습니다.',
      });
    }
  }

  /**
   * Kakao 에서 유저 리디렉션시 작동하는 엔드포인트
   * 1. state 검증
   * 2. code spring 전송
   * 3. 유저 토큰장착, 정보는 서치파라미터에 달아서 FE 로 푸시
   * @param state
   * @param code
   * @param req
   * @param res
   */
  @Get('callback')
  async handleKakaoCallback(
    @Query('state') state: string,
    @Query('code') code: string,
    @Req() req: RequestWithCookies,
    @Res() res: Response,
  ) {
    const FE_URL = process.env.FE_URL ?? 'http://localhost:3000/';

    if (!code || !state) {
      return res.status(500).json({
        message: '서버 오류가 발생했습니다.',
      });
    }
    // cookies:cookie-parser 미들웨어가 제공하는 어트리뷰트
    const userState = req.cookies['kakao_auth_state'];

    // CSRF 기초 방어를 위한 state 검증 -> 서비스 호출
    if (!userState || userState !== state) {
      return res.status(400).json({
        message: '유효하지 않은 세션 입니다.',
      });
    }
    res.clearCookie('kakao_auth_state');

    /**
     * spring 요청부 -> await 으로 스레드 블로킹
     */
    try {
      const result = await this.authService.exchangeCodeAndGetUserInfo(code);

      // 토큰은 httponly 에 심고
      res.cookie('access_token', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15,
      });
      res.cookie('refresh_token', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600 * 24 * 7,
      });

      // 닉네임과 이메일은 쿼리파라미터로 전송하기
      return res.redirect(
        `${FE_URL}/?email=${encodeURIComponent(result.email)}&nickname=${encodeURIComponent(result.nickName)}`,
      );
    } catch (err) {
      // 실패시에도 홈으로 리디렉션
      console.error('Spring 연동 실패:', err);
      return res.redirect(`${FE_URL}/?error=login_failed`);
    }
  }
}
